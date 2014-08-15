/**
 * 
 * @author HU RIXIN
 */
var current_popup_marker = null;

//new customized marker class 
customMarker = L.Marker.extend({
   options: { 
      id: 'Custom data!',
      name: 'stop_name',
      sequence: '',
      arrival_time: '',
      departure_time: '',
   }
});

//stop icon - White (before editing)
var StopIcon = L.icon({
    iconUrl: 'images/bus_1.png',
    shadowUrl: '',
    iconSize:     [32, 37], // size of the icon 
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [18, 37], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

//stop icon - Yellow (editing)
var StopIconYellow = L.icon({
    iconUrl: 'images/bus-ing.png',
    shadowUrl: '',
    iconSize:     [32, 37], // size of the icon (stop2)
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [18, 37], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

//stop icon - Green (after saving)
var StopIconGreen = L.icon({
    iconUrl: 'images/bus_0.png',
    shadowUrl: '',
    iconSize:     [32, 37], // size of the icon (stop2)
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [18, 37], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

$(document).ready(getMap());
/*
 * Initialize the Open Street Map
 */
function getMap() {
	//set pavia as the map center
	var map = L.map("map_stop_time").setView([city_center_lat, city_center_lon], 16);
	//set title layer
    L.tileLayer('http://otile2.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
    	attribution: 'IRMA-RT 2014 <a href="http://openstreetmap.org">OpenStreetMap</a>',
    	maxZoom: 18
    }).addTo(map);
    window.map = map;
    
    //when user clicks the stop icon and opens the popup, click the arrival_time field to active jquery clockpicker plugin
    map.on('popupopen', function() {
    	$(".validate_stop_sequence").keypress(validate_non_negative_integer);
    });
}

//construct content of popup
function getPopupContent(marker) {
	var sequence = stop_sequence;
	if(marker.options.sequence != '')
		sequence = marker.options.sequence;
	else
		marker.options.sequence = sequence;
	var popup_content = "<div><h3 align='center'>" + marker.options.id + "</h3>" +
	"<table class='reference'><tr><th>Field</th><th>Content</th></tr>" +
	"<tr><td>Name</td><td>" + marker.options.name + "</td></tr>" +
	"<tr><td>Sequence *</td><td><input id='map_stop_sequence' type='number' value='" + sequence + "'  style='width:90%' class='validate_stop_sequence' onchange='move_map_seq_to_edit()'></td></tr>" + 
	"<tr><td>Arrival time *</td><td><input id='map_arrival_time' type='time' value='" + marker.options.arrival_time + "' style='width:90%' onchange='move_map_at_to_edit()'></td>" +
	"<tr><td>Departure time *</td><td><input id='map_departure_time' type='time' value='" + marker.options.departure_time + "'  style='width:90%' onchange='move_map_dt_to_edit()'></td>" +
	"<tr><td>Action</td><td><a href='javascript:btn_save()'>Save</a> / <a href='javascript:change_to_tab_edit()'>Add more details</a></td>" +
	"</table></div>";
	return popup_content;
}

function onMarkerClick(e) {
	//build popup content
	e.target.options.popup_content = getPopupContent(e.target);
	
	//change marker color: currently clicked marker
	if(e.target.options.arrival_time == '' || e.target.options.departure_time == '') {
		e.target.setIcon(StopIconYellow);	//Yellow indicates editing
	}
	
	//change marker color: previous marker
	if(current_popup_marker != null && current_popup_marker.options.arrival_time == '') {
		current_popup_marker.setIcon(StopIcon);
	}
	//set stop_id info to 'edit' tab
	$('#edit_stop_id').val(e.target.options.id);
	$('#edit_stop_sequence').val(e.target.options.sequence);
	$('#edit_arrival_time').val(e.target.options.arrival_time);
	$('#edit_departure_time').val(e.target.options.departure_time);
	//get content from e.target, display it in popup
	popup = L.popup().setLatLng(e.latlng);
	popup.setContent(e.target.options.popup_content);
	current_popup_marker = e.target;
	current_popup_marker.unbindPopup();
	current_popup_marker.bindPopup(popup).openPopup();
}

//------------------------------------ Draw trip on map --------------------------------------------------------
/*
 * Get shape points list data from server
 */
var shapes = new Array();
var stopsArray = new Array();
var stopgroup = null;

function draw_shapes_of_trip() {
	//construct shape_id
	var selected_trip = $("#map_trip_id option:selected").text();	//text of currently selected item
	if(selected_trip == '') {
		if (linegroup != null)
		{
			window.map.removeLayer(linegroup);
			linegroup = null;
		}
		shapes = [];
		return;
	}
	var service_id = selected_trip.slice(selected_trip.indexOf('(') + 1, selected_trip.indexOf(')'));	//truncate service_id from selected_trip
	var shape_id = $('#edit_route_id').val() + "##" + service_id;
	//set the central point of map into pavia center
	window.map.setView([city_center_lat, city_center_lon], 16);

	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/list/shape_by_shape_id",
		type: "POST",
		data: shape_id,
		dataType: 'html',
		success: function (data) {
			var shape = stringToJson(data);
			$.each(shape.Shape, function(i, shape) {
				var point = new L.LatLng(shape.shape_pt_lat, shape.shape_pt_lon);
				shapes.push(point);
			});
			drawLine(shapes);
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Retrieve shape points error!");
	});
}

/*
 * Draw line with given positions (longitude and latitude)
 */
var linegroup = null;
var line = null;
var polylineArray =new Array();

function drawLine(positions) {
	
	if (linegroup != null)
	{
		window.map.removeLayer(linegroup);
		linegroup = null;
	}
	shapes = [];
		
	line = new L.Polyline(positions, {
    color: 'blue',
    weight: 5,
    smoothFactor: 1
   });

	//push the new line to polylineArray
	polylineArray.push(line);
	//add polylineArray to a layerGroup
	linegroup = L.layerGroup(polylineArray);
	//draw all lines in linegroup on the map
	linegroup.addTo(window.map);
	//clear polylineArray
	polylineArray = [];
}
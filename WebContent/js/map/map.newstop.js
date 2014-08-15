/**
 * 
 * @author HU RIXIN
 */
var current_popup_marker;
var current_marker_addr;
var existedStopGroup = null;
var newStopSeqNum = 0;
var existedStopArray = new Array();
var newStopArray = new Array();
var new_stop_from_map = false;	//本次添加车站是不是以地图上点击的方式添加的
var current_new_stop_seq = -1;

//new customized marker class 
customMarker = L.Marker.extend({
   options: { 
      id: 'Custom data!',
      addr: ''
      //code: 'stop_code',
      //name: 'stop_name'
   }
});

//stop icon - new
var StopIconNew = L.icon({
    iconUrl: 'images/bus_0.png',
    shadowUrl: '',

    //iconSize:     [60, 60], // size of the icon (stop)
    iconSize:     [32, 37], // size of the icon (stop2)
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [18, 37], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

//stop icon - existed
var StopIconExisted = L.icon({
    iconUrl: 'images/bus_1.png',
    shadowUrl: '',

    //iconSize:     [60, 60], // size of the icon (stop)
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
	//map
	var map = L.map('map_new_stop').setView([city_center_lat, city_center_lon], 16);
	window.map = map;
	
	//button to control show/hide of existed stops
	L.easyButton('fa-compass', show_hide_stops, 'Show/Hide existed stops', window.map);
	
	//geocoder
	var geocoder = L.Control.Geocoder.bing('AoArA0sD6eBGZyt5PluxhuN7N7X1vloSEIhzaKVkBBGL37akEVbrr0wn17hoYAMy');
	window.geocoder = geocoder;
	/*	control = L.Control.geocoder({
			geocoder: geocoder
		}).addTo(map),*/


	L.tileLayer('http://otile2.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
		attribution: 'IRMA-RT 2014 <a href="http://openstreetmap.org">OpenStreetMap</a>',
		maxZoom: 18
	}).addTo(window.map);

	window.map.on('click', function(e) {
    	var marker = new customMarker(e.latlng, {
    		id: newStopSeqNum++,
    	    icon: StopIconNew,
    	    draggable: true
    	}).addTo(window.map);
    	marker.on('click', onMarkerClick);
    	marker.on('dragend', onMarkerDragEnd);
    	newStopArray.push(marker);
    	
    	window.geocoder.reverse(e.latlng, window.map.options.crs.scale(window.map.getZoom()), function(results) {
			var r = results[0];
			if (r) {
				var lat = e.latlng.lat.toFixed(5);
				var lon = e.latlng.lng.toFixed(5);
				current_marker_addr = r.name;
				marker.options.addr = r.name;
				var content = "<div><h3 align='center'>New Stop</h3>" +
					"<table class='reference'><tr><th>Field</th><th>Content</th></tr>" + 
					"<tr><td>Location</td><td>(" + lat + ", " + lon + ")</td></tr>" + 
					"<tr><td>Description</td><td>" + r.name + "</td></tr>" + 
					"<tr><td>Action</td><td><a href='javascript:change_to_tab_new(" + lat + "," + lon + ")'>New Stop</a>&nbsp;/&nbsp;<a href='javascript:remove_marker(" + marker.options.id + ")'>Delete Stop</a></td></tr></table></div>";
				current_new_stop_seq = marker.options.id;
				popup = L.popup().setLatLng(e.latlng);
				popup.setContent(content);
				current_popup_marker = marker;
				//current_popup_marker.unbindPopup();
				current_popup_marker.bindPopup(popup).openPopup();
			}
		});
	});
}

function remove_marker(newStopSeqNo) {
	for(var i=0; i<newStopArray.length; i++) {
		if(newStopSeqNo == newStopArray[i].options.id) {
			window.map.removeLayer(newStopArray[i]);
		}
	}
}

function onMarkerClick(e) {
	current_new_stop_seq = e.target.options.id;
	current_marker_addr = e.target.options.addr;
}

function onMarkerDragEnd(e) {
	var lat = e.target._latlng.lat.toFixed(5);
	var lon = e.target._latlng.lng.toFixed(5);
	window.geocoder.reverse(e.target._latlng, window.map.options.crs.scale(window.map.getZoom()), function(results) {
		var r = results[0];
		if (r) {
			current_marker_addr = r.name;
			var content = "<div><h3 align='center'>New Stop</h3>" +
			"<table class='reference'><tr><th>Field</th><th>Content</th></tr>" + 
			"<tr><td>Location</td><td>(" + lat + ", " + lon + ")</td></tr>" + 
			"<tr><td>Description</td><td>" + r.name + "</td></tr>" + 
			"<tr><td>Action</td><td><a href='javascript:change_to_tab_new(" + lat + "," + lon + ")'>New Stop</a>&nbsp;/&nbsp;<a href='javascript:remove_marker(" + e.target.options.id + ")'>Delete Stop</a></td></tr></table></div>";
			popup = L.popup().setLatLng(e.target._latlng);
			popup.setContent(content);
			current_popup_marker = e.target;
			//current_popup_marker.unbindPopup();
			current_popup_marker.bindPopup(popup).openPopup();
		}
	});
}

var show_hide = 0;	//default: hide
function show_hide_stops() {
	if(existedStopArray.length == 0)
		alertify.alert("There is no stop yet. Please add some stops by click on the map.");
	if(show_hide == 0) {	//show all existed stops
		//put the array (with all markers) into a layerGroup, draw them one time
		existedStopGroup = L.layerGroup(existedStopArray).addTo(window.map);
		existedStopGroup.addTo(window.map);
		show_hide = 1;
	} else {	//hide all existed stops
		window.map.removeLayer(existedStopGroup);
		show_hide = 0;
	}
}
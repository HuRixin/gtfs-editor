/**
 * @author HU RIXIN
 */

//All stops retrieved from DB
var stopGroup = null;
var stopArray = new Array();
//Shape points array of current (route, servi)
var currentShapePtArray = new Array();
//总的 shape 点集, 包含该 route 的所有路段
var totalShapePtArray = new Array();
//在地图上标识的每段路线
var route_line = new Array();
//每次点击的 stop ID 数组
var stopArrayOfCurShape = new Array();
//routing result message, indicating the failed of routing, used in leaflet-routing-machine.min.js
var routing_error_msg = "<p align='center'>Oops, routing seems failed on this segment :( <br>Please create this shape manually or correct the stop position and try again.</p>";
	
//new customized marker class 
customMarker = L.Marker.extend({
   options: {
	   popup_content: 'This is a stop',
	   id: 'stop_id',
	   name: 'stop_name'
   }
});

//stop icon - 2
var StopIcon = L.icon({
    iconUrl: 'images/bus_0.png',
    shadowUrl: '',
    iconSize:     [32, 37], // size of the icon 
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [18, 37], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

//stop icon - existed
var StopIconExisted = L.icon({
    iconUrl: 'images/bus_1.png',
    shadowUrl: '',
    iconSize:     [32, 37], // size of the icon 
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [18, 37], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

$(document).ready(getAutoMap());
/*
 * Initialize the Open Street Map
 */
var routing;
function getAutoMap() {
	//1. load map
	var map_auto = L.map("map_new").setView([city_center_lat, city_center_lon], 16);
	
    L.tileLayer('http://otile2.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
    	attribution: 'IRMA-RT 2014 <a href="http://openstreetmap.org">OpenStreetMap</a>',
    	maxZoom: 18
    }).addTo(map_auto);
    window.map_auto = map_auto;
    
    //2. load existed stops to map
    load_stop();
	
	//4. routing control to generate shape points
    routing = L.Routing.control({
    	plan: L.Routing.plan(null, {
            waypointIcon: StopIcon
        })
    }).addTo(window.map_auto);
}

function load_stop() {
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/list/stop",
		type: "GET",
		dataType: 'html',
		success: function (data) {
			var list = stringToJson(data);
			$.each(list.Stop, function(i, stop) {
				//construct stop markers on the map
		    	var marker = new customMarker([stop.stop_lat, stop.stop_lon], {
		    		id: stop.stop_id,
		    		name: stop.stop_name,
		    	    icon: StopIconExisted,
		    	    popup_content: "<div><h3 align='center'>" + stop.stop_id + "</h3>" +
		    		"<table class='reference'><tr><th>Field</th><th>Content</th></tr>" +
		    		"<tr><td>Name</td><td>" + stop.stop_name + "</td></tr>" +
		    		"<tr><td>Location</td><td>(" + stop.stop_lat + ", " + stop.stop_lon + ")</td></tr>" +
		    		"<tr><td>Description</td><td>" + stop.stop_desc + "</td></tr></table></div>"
		    	}).on('click', markerOnClick).on('contextmenu', markerOnRightClick);
		    	stopArray.push(marker);
			});
			stopGroup = L.layerGroup(stopArray).addTo(window.map_auto);
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

var previous_stop = null;
function markerOnClick(e) {
	//if user have clicked the 'finish' button, this click on marker has no effect
	if(finished)
		return;
	//do not show the popup when user clicks the stop icon (default shows)
	e.target.unbindPopup();
	//routing between previous stop and current stop
	routing.setWaypoints([previous_stop, e.latlng]);
	previous_stop = e.latlng;
	//current stop which has been clicked
	stopArrayOfCurShape.push(e.target.options.id);
	if (typeof routing._routes === 'undefined') {
		
	} else {
		//draw previous line with color BLUE, which has been confirmed
		currentShapePtArray = routing._routes[0].coordinates;
		var line = new L.Polyline(currentShapePtArray, {
		    color: 'blue',
		    weight: 5,
		    smoothFactor: 1
	    }).addTo(window.map_auto);
		route_line.push(line);
		//add points of current segment to totalShapePtArray
		totalShapePtArray = totalShapePtArray.concat(currentShapePtArray);
	}
}

function markerOnRightClick(e) {
	popup = L.popup().setLatLng(e.latlng);
	popup.setContent(e.target.options.popup_content);
	e.target.bindPopup(popup).openPopup();
}

function clear() {
	//清除地图上的线
	for(var i=0; i<route_line.length; i++) {
		window.map_auto.removeLayer(route_line[i]);	
	}
	route_line = [];
	//清除点集
	currentShapePtArray = [];
	totalShapePtArray = [];
	//重置routing-machine plugin
	routing._routes = undefined;
	previous_stop = null;
	//重置地图中心
	window.map_auto.setView([city_center_lat, city_center_lon], 16);
}
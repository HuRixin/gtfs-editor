/**
 * 
 * @author HU RIXIN
 */
var current_popup_marker;

//stop icon
var StopIcon = L.icon({
    iconUrl: 'images/bus.png',
    shadowUrl: '',

    //iconSize:     [60, 60], // size of the icon (stop)
    iconSize:     [32, 37], // size of the icon (stop2)
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

$(document).ready(getMap());
/*
 * Initialize the Open Street Map
 */
function getMap() {
	//set pavia as the map center
	var map = L.map("stop_map").setView([45.18601, 9.15466], 16);
	//set title layer
    L.tileLayer('http://otile2.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
    	attribution: 'IRMA-RT 2014 <a href="http://openstreetmap.org">OpenStreetMap</a>',
    	maxZoom: 18
    }).addTo(map);
    
	var marker = L.marker([45.18601, 9.15466], {
	    icon: StopIcon,
	    draggable: true
	}).addTo(map).on('click', onMarkerClick);
	marker.on('dragend', onMarkerDragEnd);
}

function onMarkerClick(e) {
	var content = "<div><h3>Stop Location</h3><hr>Latitude: " + e.latlng.lat.toFixed(5) + "<br>Longitude: " + e.latlng.lng.toFixed(5) + "<hr/><a href='javascript:change_to_tab_new()'>Enter more to complete</a></div>";
	popup = L.popup().setLatLng(e.latlng);
	popup.setContent(content);
	current_popup_marker = e.target;
	current_popup_marker.unbindPopup();
	current_popup_marker.bindPopup(popup).openPopup();
}

function onMarkerDragEnd(e) {
	var lat = e.target._latlng.lat.toFixed(5);
	var lon = e.target._latlng.lng.toFixed(5);
	var content = "<div><h3>Stop Location</h3><hr>Latitude: " + lat + "<br>Longitude: " + lon + "<hr/><a href='javascript:change_to_tab_new(" + lat + "," + lon + ")'>Enter more to complete</a></div>";
	popup = L.popup().setLatLng(e.latlng);
	popup.setContent(content);
	current_popup_marker = e.target;
	current_popup_marker.unbindPopup();
	current_popup_marker.bindPopup(popup).openPopup();
}
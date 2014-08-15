/**
 * @author HU RIXIN
 */
//All stops retrieved from DB
var stopGroupMan = null;
var stopArrayMan = new Array();
//��ǰ���ڱ༭�� shape �㼯
var currentShapePtArrayMan = new Array();
//�ܵ� shape �㼯, ������ route ������·��
var totalShapePtArrayMan = new Array();
//�ֶ�ģʽ�µ� shape �߶� (editable-polyline ����õ�)
var polylineMan = null;
//ÿ�ε���� stop ID ����
var stopArrayOfCurShapeMan = new Array();

$(document).ready(getManMapMan());
/*
 * Initialize the Open Street Map
 */
function getManMapMan() {
	//1. load map
	var map_man = L.map("map_new_man").setView([city_center_lat, city_center_lon], 16);
	
    L.tileLayer('http://otile2.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
    	attribution: 'IRMA-RT 2014 <a href="http://openstreetmap.org">OpenStreetMap</a>',
    	maxZoom: 18
    }).addTo(map_man);
    window.map_man = map_man;
    
    //2. load existed stops to map
    load_stop_man();
	
}

function load_stop_man() {
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
		    	}).on('click', markerOnClickMan).on('contextmenu', markerOnRightClickMan);
		    	stopArrayMan.push(marker);
			});
			stopGroupMan = L.layerGroup(stopArrayMan).addTo(window.map_man);
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

function markerOnClickMan(e) {
	//if user have clicked the 'finish' button, this click on marker has no effect
	if(finishedMan)
		return;
	//����markerͼ��Ϊ��ɫ, ��ʾ�����
	e.target.setIcon(StopIcon);
	//�ѵ�ǰ����� stop_id �浽������, ���½�shape_stop
	stopArrayOfCurShapeMan.push(e.target.options.id);
	//�ȰѸոյ����õ���һ��·�ĵ㱣������: currentShapePtArrayMan
	if(polylineMan != null) {
		currentShapePtArrayMan = [];
		var points = polylineMan.getPoints();
		for(var i=0; i<points.length; i++) {
			currentShapePtArrayMan.push(points[i].getLatLng());
		}
	}
	//Ȼ����¼ӵĳ�վ������Ϊ�µĵ�push����
	currentShapePtArrayMan.push(e.latlng);
	//�Ƴ�ԭ������
	if(polylineMan != null) window.map_man.removeLayer(polylineMan);
	//ʹ��������µ�(���³�վ����)���������»���
	polylineMan = L.Polyline.PolylineEditor(currentShapePtArrayMan, {color:'orange',maxMarkers: 9999}).addTo(window.map_man);
	
	//�����ͼ������λ��, ʹ�䱣���� �ո��¼ӵ�(���³�վ����) �� ��һ�����յ�(����һ����վ����) ���м�λ��
	var new_points = polylineMan.getPoints();
	var length = new_points.length;
	if(length > 1) {
		var view_center = L.latLng(
				((new_points[length-1].getLatLng().lat + new_points[length-2].getLatLng().lat) / 2),
				((new_points[length-1].getLatLng().lng + new_points[length-2].getLatLng().lng) / 2));
		window.map_man.setView(view_center, 20);
	}
}

function markerOnRightClickMan(e) {
	popup = L.popup().setLatLng(e.latlng);
	popup.setContent(e.target.options.popup_content);
	e.target.bindPopup(popup).openPopup();
}

function clearMan() {
	//�����ͼ�ϵ���
	if(polylineMan != null) {
		window.map_man.removeLayer(polylineMan);
		polylineMan = null;
	}
	//����㼯
	currentShapePtArrayMan = [];
	totalShapePtArrayMan = [];
	//���õ�ͼ����
	window.map_man.setView([city_center_lat, city_center_lon], 16);
}
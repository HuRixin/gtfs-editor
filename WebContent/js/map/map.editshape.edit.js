/**
 * @author HU RIXIN
 */
//All stops retrieved from DB
var stopGroupEdit = null;
var stopArrayEdit = new Array();
//�ܵ� shape �㼯, ������ route ������·��
var totalShapePtArrayEdit = new Array();
//�༭ģʽ�µ� shape �߶� (editable-polyline ����õ�)
var polyline = null;
//ÿ�ε���� stop ID ����
var stopArrayOfCurShapeEdit = new Array();

$(document).ready(getManMapEdit());
/*
 * Initialize the Open Street Map
 */
function getManMapEdit() {
	//1. load map
	var map_edit = L.map("map_edit").setView([city_center_lat, city_center_lon], 16);
	
    L.tileLayer('http://otile2.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
    	attribution: 'IRMA-RT 2014 <a href="http://openstreetmap.org">OpenStreetMap</a>',
    	maxZoom: 18
    }).addTo(map_edit);
    window.map_edit = map_edit;
    
    //2. load existed stops to map
    load_stop_edit();
}

function load_stop_edit() {
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
		    	}).on('click', markerOnClickEdit).on('contextmenu', markerOnRightClickEdit);
		    	stopArrayEdit.push(marker);
			});
			stopGroupEdit = L.layerGroup(stopArrayEdit).addTo(window.map_edit);
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

function markerOnClickEdit(e) {
	//if user have clicked the 'finish' button, this click on marker has no effect
	if(finishedEdit)
		return;
	//����markerͼ����ɫ, ���ԭ��Ϊ��ɫ(��ʾδ���)�����Ϊ��ɫ(��ʾ�����),���ԭ��Ϊ��ɫ�����Ϊ��ɫ (toggle)
	if(e.target.options.icon == StopIcon) {//���Ϊ��ɫ
		e.target.setIcon(StopIconExisted);//��Ϊ��ɫ
		for(var i=0; i<stopArrayOfCurShapeEdit.length; i++) {
			if(stopArrayOfCurShapeEdit[i] == e.target.options.id)	//�ӳ�վ�������Ƴ�
				stopArrayOfCurShapeEdit.splice(i, 1);
		}
	} else {
		e.target.setIcon(StopIcon);
		stopArrayOfCurShapeEdit.push(e.target.options.id);
	}
}

function markerOnRightClickEdit(e) {
	popup = L.popup().setLatLng(e.latlng);
	popup.setContent(e.target.options.popup_content);
	e.target.bindPopup(popup).openPopup();
}

function clear_map() {
	//������ͼ�ϵ�·��
	if(polyline != null) {
		window.map_edit.removeLayer(polyline);
		polyline = null;
	}
	totalShapePtArrayEdit = [];
	//�ָ���վ��ɫ
	for(var i=0; i<stopArrayEdit.length; i++) {
		stopArrayEdit[i].setIcon(StopIconExisted);
	}
	stopArrayOfCurShapeEdit = [];
	//���õ�ͼ����
	window.map_edit.setView([city_center_lat, city_center_lon], 16);
}
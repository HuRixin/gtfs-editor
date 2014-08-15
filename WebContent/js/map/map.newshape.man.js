/**
 * @author HU RIXIN
 */
//All stops retrieved from DB
var stopGroupMan = null;
var stopArrayMan = new Array();
//当前正在编辑的 shape 点集
var currentShapePtArrayMan = new Array();
//总的 shape 点集, 包含该 route 的所有路段
var totalShapePtArrayMan = new Array();
//手动模式下的 shape 线段 (editable-polyline 插件用到)
var polylineMan = null;
//每次点击的 stop ID 数组
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
	//更改marker图标为绿色, 表示已添加
	e.target.setIcon(StopIcon);
	//把当前点击的 stop_id 存到数组里, 以新建shape_stop
	stopArrayOfCurShapeMan.push(e.target.options.id);
	//先把刚刚调整好的上一段路的点保存起来: currentShapePtArrayMan
	if(polylineMan != null) {
		currentShapePtArrayMan = [];
		var points = polylineMan.getPoints();
		for(var i=0; i<points.length; i++) {
			currentShapePtArrayMan.push(points[i].getLatLng());
		}
	}
	//然后把新加的车站坐标作为新的点push进来
	currentShapePtArrayMan.push(e.latlng);
	//移除原来的线
	if(polylineMan != null) window.map_man.removeLayer(polylineMan);
	//使用添加了新点(即新车站坐标)的数组重新画线
	polylineMan = L.Polyline.PolylineEditor(currentShapePtArrayMan, {color:'orange',maxMarkers: 9999}).addTo(window.map_man);
	
	//重设地图的中心位置, 使其保持在 刚刚新加点(即新车站坐标) 和 上一段最终点(即上一个车站坐标) 的中间位置
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
	//清除地图上的线
	if(polylineMan != null) {
		window.map_man.removeLayer(polylineMan);
		polylineMan = null;
	}
	//清除点集
	currentShapePtArrayMan = [];
	totalShapePtArrayMan = [];
	//重置地图中心
	window.map_man.setView([city_center_lat, city_center_lon], 16);
}
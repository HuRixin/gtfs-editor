/**
 * @author HU RIXIN
 * @time 2014-05-28
 */
//------------------------------------------ Global Variables ------------------------------------------

//set current_tab to "new" or "edit" or "list", distinguish which is the current tab opened
var current_tab = "#edit";
//state indicator
var finished = false;	//new
var finishedEdit = false;	//edit

//------------------------------------------ Json format conversion------------------------------------------
/*
 * Convert string to JSON
 */
function stringToJson(str) {
	var json = eval('(' + str + ')');
	return json;
}

function shapes_to_json() {
	var shapes_json = '[';
	if(current_tab == "#new") {
		for(var i=0; i<totalShapePtArray.length; i++) {
			for(var j=0; j<$("#new_service_id").val().length; j++) {
				shapes_json += '{"shape_id":"' + $("#new_route_id").val() + '##' + $("#new_service_id").val()[j] +
				'","agency_id":"' + agency_id +
				'","shape_pt_lat":"' + totalShapePtArray[i][0].toFixed(5) + 
				'","shape_pt_lon":"' + totalShapePtArray[i][1].toFixed(5) + 
				'","shape_pt_sequence":"' + i + '"},';
			}
		}
	} else if(current_tab == "#edit") {
		for(var i=0; i<totalShapePtArrayEdit.length; i++) {
			shapes_json += '{"shape_id":"' + $("#edit_route_id").val() + '##' + $("#edit_service_id").val() +
			'","agency_id":"' + agency_id +
			'","shape_pt_lat":"' + totalShapePtArrayEdit[i][0].toFixed(5) + 
			'","shape_pt_lon":"' + totalShapePtArrayEdit[i][1].toFixed(5) + 
			'","shape_pt_sequence":"' + i + '"},';
		}
	} else {
		alertify.log("Turn to 'New' or 'Edit' tab to save modifications :)");
		return;
	}
	shapes_json = shapes_json.substring(0, shapes_json.length - 1);	//remvoe last ','
	shapes_json += ']';
	return shapes_json;
}

function shape_stop_to_json() {
	var shape_stop_json = '[';
	if(current_tab == "#new") {
		for(var i=0; i<$("#new_service_id").val().length; i++) {	//how many shape_id
			for(var j=0; j<stopArrayOfCurShape.length; j++) {	//how many stops of this shape_id
				shape_stop_json += '{"shape_id":"' + $("#new_route_id").val() + '##' + $("#new_service_id").val()[i] +
				'","agency_id":"' + agency_id +
				'","stop_id":"' + stopArrayOfCurShape[j] + '"},';
			}
		}
	} else if(current_tab == "#edit") {
		for(var j=0; j<stopArrayOfCurShapeEdit.length; j++) {	//how many stops of this shape_id
			shape_stop_json += '{"shape_id":"' + $("#edit_route_id").val() + '##' + $("#edit_service_id").val() +
			'","agency_id":"' + agency_id +
			'","stop_id":"' + stopArrayOfCurShapeEdit[j] + '"},';
		}
	} else {
		alertify.log("Turn to 'New' or 'Edit' tab to save modifications :)");
		return;
	}
	shape_stop_json = shape_stop_json.substring(0, shape_stop_json.length - 1);	//remvoe last ','
	shape_stop_json += ']';
	return shape_stop_json;
}

//------------------------------------------ Button response function ------------------------------------------
function btn_save() {
	//1. 检测当前tab, 用相关tab对应的变量给临时变量赋值
	var t_route_id = null;
	var t_service_id = null;
	var t_finished = null;
	if(current_tab == "#new") {
		t_route_id = "#new_route_id";
		t_service_id = "#new_service_id";
		t_finished = finished;
	} else if(current_tab == "#edit") {
		t_route_id = "#edit_route_id";
		t_service_id = "#edit_service_id";
		t_finished = finishedEdit;
	} else {
		alertify.log("Turn to 'New' or 'Edit' tab to save modifications :)");
		return;
	}
	//2. 检测route_id和service_id是否有有效值
	if($(t_route_id).val() == "") {
		alertify.log("Please choose a route first");
		$(t_route_id).trigger('chosen:activate');	//focus on route chosen
		return;
	} else if($(t_service_id).val() == null || $(t_service_id).val() == "") {
		alertify.log("Please choose a calendar first");
		$(t_service_id).trigger('chosen:activate');	//focus on calendar chosen
		return;
	}
	//3. 如果完成标记已被置为true, 执行更新
	if(t_finished) {
		new_shapes();
		new_shape_stop();
	}
	else {
		alertify.log("Click finish to confirm the modifications first");
	}
}

function btn_back() {
	window.location.href = "EditIntroduction.jsp";
}

function btn_finish() {
	if(current_tab == "#new") {
		if(finished)	//already finished before, do nothing
			return;
		//1. clear waypoints
		routing.setWaypoints([]);
		//2. draw last route segment
		if (typeof routing._routes === 'undefined') {
		    // variable is undefined
			alertify.log("Please click the stops of the selected route by sequence");
		} else {
			currentShapePtArray = routing._routes[0].coordinates;
			var line = new L.Polyline(currentShapePtArray, {
			    color: 'blue',
			    weight: 5,
			    smoothFactor: 1
		    }).addTo(window.map_auto);
			route_line.push(line);
			//3. add last segment points into totalShapePtArray
			totalShapePtArray = totalShapePtArray.concat(currentShapePtArray);
			finished = true;
		}
	} else if(current_tab == "#edit") {
		if(finishedEdit)	//already finished before, do nothing
			return;
		if(polyline == null)
			return;
		totalShapePtArrayEdit = [];
		var points = polyline.getPoints();
		for(var i = 0; i < points.length; i++) {
			totalShapePtArrayEdit.push([points[i].getLatLng().lat, points[i].getLatLng().lng]);
		}
		//移除原来的线
		if(polyline != null) window.map_edit.removeLayer(polyline);
		//使用蓝色重新画线
		polyline = L.Polyline.PolylineEditor(totalShapePtArrayEdit, {color:'blue',maxMarkers: 0}).addTo(window.map_edit);
		finishedEdit = true;
	} else {
		alertify.log("Turn to 'New' or 'Edit' tab to save modifications :)");
	}
}

function btn_query() {
	if($('#list_route_id').val() == "") {
		alertify.error("Please choose a route first");
		return;
	} else if($('#list_service_id').val() == "") {
		alertify.error("Please choose a calendar first");
		return;
	}
	list_shapes();
}

function btn_delete() {
	if($('#list_route_id').val() == "") {
		alertify.error("Please choose a route first");
		return;
	} else if($('#list_service_id').val() == "") {
		alertify.error("Please choose a calendar first");
		return;
	}
	// confirm dialog
	alertify.confirm("Are you sure you want to delete this group of shape points ?", function (e) {
	    if (e) {
	    	delete_shapes();
	    	delete_shape_stop();
	    }
	});
}

//------------------------------------------ Web service call ------------------------------------------
function load_routes() {
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/list/route",
		type: "GET",
		dataType: 'html',
		success: function (data) {
			var list = stringToJson(data);
			$.each(list.Route, function(i, route) {
				$('#new_route_id').append("<option value='" + route.route_id + "'>" + route.route_id + " (" + route.route_short_name + ")</option>");
				$('#edit_route_id').append("<option value='" + route.route_id + "'>" + route.route_id + " (" + route.route_short_name + ")</option>");
				$('#list_route_id').append("<option value='" + route.route_id + "'>" + route.route_id + " (" + route.route_short_name + ")</option>");
			});
			$('#new_route_id').trigger("chosen:updated");
			$('#edit_route_id').trigger("chosen:updated");
			$('#list_route_id').trigger("chosen:updated");
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

function load_calendar() {
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/list/calendar",
		type: "GET",
		dataType: 'html',
		success: function (data) {
			var list = stringToJson(data);
			$.each(list.Calendar, function(i, calendar) {
				$('#new_service_id').append("<option value='" + calendar.service_id + "'>" + calendar.service_id + "</option>");
				$('#edit_service_id').append("<option value='" + calendar.service_id + "'>" + calendar.service_id + "</option>");
				$('#list_service_id').append("<option value='" + calendar.service_id + "'>" + calendar.service_id + "</option>");
			});
			$('#new_service_id').trigger("chosen:updated");
			$('#edit_service_id').trigger("chosen:updated");
			$('#list_service_id').trigger("chosen:updated");
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

//在用户选择route和calendar后,自动检测是否已经存在和这个组合对应的shape,存在则显示之,不存在则准备新建
function load_shape(shape_id) {
	if(shape_id == "") return;
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/list/shape_by_shape_id",
		type: "POST",
		data: shape_id,
		dataType: 'html',
		success: function (data) {
			var shape_points = stringToJson(data);
			if(shape_points.Shape.length > 0)	{//this shape existed
				$.each(shape_points.Shape, function(i, shape) {
					var point = new L.LatLng(shape.shape_pt_lat, shape.shape_pt_lon);
					totalShapePtArrayEdit.push(point);
				});
				polyline = L.Polyline.PolylineEditor(totalShapePtArrayEdit, {color:'orange',maxMarkers: 9999}).addTo(window.map_edit);
			} else {
				alertify.log("There is no such shape, please turn to 'New' tab to create :)");
			}
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

//从服务器获取所有与这条shape有关的stop
function load_stop_of_shape(shape_id) {
	if(shape_id == "") return;
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/list/stop_of_shape",
		type: "POST",
		data: shape_id,
		dataType: 'html',
		success: function (data) {
			var list = stringToJson(data);
			$.each(list.Stop, function(i, stop) {
				//把这条路上的stop_id存起来,以后可能添加/删除 stop
				stopArrayOfCurShapeEdit.push(stop.stop_id);
				//循环遍历已经显示在地图上的 stopArray, 如果发现其中有属于用于选择的 shape 对应的车站, 更改其图标
				for(var i=0; i<stopArray.length; i++) {
					if(stopArrayEdit[i].options.id == stop.stop_id) {
						stopArrayEdit[i].setIcon(StopIcon);
					}
				}
			});
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

//在用户选择route和calendar后,自动检测是否已经存在和这个组合对应的shape
function check_shape_existence(shape_id) {
	if(shape_id == "") return;
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/existed/shape",
		type: "POST",
		data: shape_id,
		dataType: 'html',
		success: function (data) {
			if(data == "true")	//the shape_id combined from the current selection of route_id + serivce_id has already existed in DB
				alertify.alert("The shape_id (" + shape_id + ") combined from the current selection of route_id + serivce_id has already existed! Please choose another one.",
						function(e) {
						$('#new_service_id').val('').trigger('chosen:updated');
				});
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

function new_shapes() {
	//pack each field to a json format
	var shapes_json = shapes_to_json();
	//web service call, insert new shapes (array)
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/new/shapes",
		type: "POST",
		data: shapes_json,
		dataType: 'html',
		success: function (data) {
			if(data == "true") {
				alertify.success("Modifications have been saved :)");
				if(current_tab == "#new") {
					//reset route-chosen and calendar chosen
					$('#new_route_id').val('').trigger('chosen:updated');
					$('#new_service_id').val('').trigger('chosen:updated');
					//reset "finished" switch
					finished = false;
					//reset/clear relative vars
					clear();
				} else if(current_tab == "#edit") {
					//reset route-chosen and calendar chosen
					$('#edit_route_id').val('').trigger('chosen:updated');
					$('#edit_service_id').val('').trigger('chosen:updated');
					//reset "finished" switch
					finishedEdit = false;
					clear_map();
				}
			} else {
				alertify.error("Save modifications failed :(");
			}
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

//创建shape_stop对应关系表,表明一条shape所经过的stops
function new_shape_stop() {
	//pack each field to a json format
	var shape_stop_json = shape_stop_to_json();
	//web service call, insert new shape_stops (array)
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/new/shape_stop",
		type: "POST",
		data: shape_stop_json,
		dataType: 'html',
		success: function (data) {
			if(data == "true") {
				if(current_tab == "#new") {
					//清除车站数据
					stopArrayOfCurShape = [];
				} else if(current_tab == "#edit") {
					//清除当前路线的站点信息
					stopArrayOfCurShapeEdit = [];
				}
			} else {
				alertify.error("New ShapeStop failed :(");
			}
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

function list_shapes() {
	var shape_id = $('#list_route_id').val() + "##" + $('#list_service_id').val();
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/list/shape_by_shape_id",
		type: "POST",
		data: shape_id,
		dataType: 'html',
		success: function (data) {
			var list_shape_content = "";
			var list = stringToJson(data);
			if(list.Shape.length == 0) {
				alertify.log("Shape points whoes ID = " + shape_id + " does not exist.");
				return;
			}
			$.each(list.Shape, function(i, shape) {
				list_shape_content += "<tr>" + 
					"<td class='c_shape_id'>" + shape_id +  "</td>" +
					"<td class='c_shape_pt_lat'>" + shape.shape_pt_lat + "</td>" +
					"<td class='c_shape_pt_lon'>" + shape.shape_pt_lon + "</td>" +
					"<td class='c_shape_pt_sequence'>" + shape.shape_pt_sequence + "</td>" +
					"<td class='c_shape_dist_traveled'>" + shape.shape_dist_traveled + "</td>" +
					"</tr>";
			});
			document.getElementById("table_list_shape").innerHTML = list_shape_content;
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

function delete_shapes() {
	var shape_id = $('#list_route_id').val() + "##" + $('#list_service_id').val();
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/delete/shape",
		type: "POST",
		data: shape_id,
		dataType: 'html',
		success: function (data) {
			alertify.success("Shape points whose ID = " + shape_id + " have been deleted :)");
			document.getElementById("table_list_shape").innerHTML = "";
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

function delete_shape_stop() {
	var shape_id = $('#list_route_id').val() + "##" + $('#list_service_id').val();
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/delete/shape_stop",
		type: "POST",
		data: shape_id,
		dataType: 'html',
		success: function (data) {
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}
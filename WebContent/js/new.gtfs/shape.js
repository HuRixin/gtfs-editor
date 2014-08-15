/**
 * @author HU RIXIN
 * @time 2014-05-28
 */
//------------------------------------------ Global Variables ------------------------------------------

//set current_tab to "new" or "list", distinguish which is the current tab opened
var current_tab = "#auto";
//state indicator
var finished = false;	//auto
var finishedMan = false;	//man

//------------------------------------------ Json format conversion------------------------------------------
/*
 * Convert string to JSON
 */
function stringToJson(str) {
	var json = eval('(' + str + ')');
	return json;
}

function shapes_to_json() {
	var shape_points;
	var route_id;
	var service_id;
	if(current_tab == "#auto") {
		shape_points = totalShapePtArray;
		route_id = "#route_id_auto";
		service_id = "#service_id_auto";
	}
	else {
		shape_points = totalShapePtArrayMan;
		route_id = "#route_id_man";
		service_id = "#service_id_man";
	}
	
	var shapes_json = '[';
	for(var i=0; i<shape_points.length; i++) {
		for(var j=0; j<$(service_id).val().length; j++) {
			shapes_json += '{"shape_id":"' + $(route_id).val() + '##' + $(service_id).val()[j] +
			'","agency_id":"' + agency_id +
			'","shape_pt_lat":"' + shape_points[i][0].toFixed(5) + 
			'","shape_pt_lon":"' + shape_points[i][1].toFixed(5) + 
			'","shape_pt_sequence":"' + i + '"},';
		}
	}
	shapes_json = shapes_json.substring(0, shapes_json.length - 1);	//remvoe last ','
	shapes_json += ']';
	return shapes_json;
}

function shape_stop_to_json() {
	var stops;
	var route_id;
	var service_id;
	if(current_tab == "#auto") {
		stops = stopArrayOfCurShape;
		route_id = "#route_id_auto";
		service_id = "#service_id_auto";
	}
	else {
		stops = stopArrayOfCurShapeMan;
		route_id = "#route_id_man";
		service_id = "#service_id_man";
	}
	var shape_stop_json = '[';
	for(var i=0; i<$(service_id).val().length; i++) {	//how many shape_id
		for(var j=0; j<stops.length; j++) {	//how many stops of this shape_id
			shape_stop_json += '{"shape_id":"' + $(route_id).val() + '##' + $(service_id).val()[i] +
			'","agency_id":"' + agency_id +
			'","stop_id":"' + stops[j] + '"},';
		}
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
	if(current_tab == "#auto") {
		t_route_id = "#route_id_auto";
		t_service_id = "#service_id_auto";
		t_finished = finished;
	} else if(current_tab == "#man") {
		t_route_id = "#route_id_man";
		t_service_id = "#service_id_man";
		t_finished = finishedMan;
	} else {
		alertify.log("Turn to 'Auto' or 'Man' tab to save modifications :)");
		return;
	}
	//2. 检测route_id和service_id是否有有效值
	if($(t_route_id).val() == "") {
		alertify.log("Please choose a route first");
		$(t_route_id).trigger('chosen:activate');	//focus on route chosen
		return;
	} else if($(t_service_id).val() == null) {
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

function btn_next() {
	// confirm dialog
	alertify.confirm("New SHAPE finished, continue to next step (TRIP) ?", function (e) {
	    if (e) {
	        // user clicked "ok", jump to new trip page
			window.location.href = "NewTrip.jsp";
	    }
	});
}

function btn_finish() {
	if(current_tab == "#auto") {
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
	} else if(current_tab == "#man") {
		if(finishedMan)	//already finished before, do nothing
			return;
		totalShapePtArrayMan = [];
		var points = polylineMan.getPoints();
		for(var i = 0; i < points.length; i++) {
			totalShapePtArrayMan.push([points[i].getLatLng().lat, points[i].getLatLng().lng]);
		}
		//移除原来的线
		if(polylineMan != null) window.map_man.removeLayer(polylineMan);
		//使用蓝色重新画线
		polylineMan = L.Polyline.PolylineEditor(totalShapePtArrayMan, {color:'blue',maxMarkers: 0}).addTo(window.map_man);
		finishedMan = true;
	} else {
		alertify.log("Turn to 'Auto' or 'Man' tab to save modifications :)");
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
				$('#route_id_auto').append("<option value='" + route.route_id + "'>" + route.route_id + " (" + route.route_short_name + ")</option>");
				$('#route_id_man').append("<option value='" + route.route_id + "'>" + route.route_id + " (" + route.route_short_name + ")</option>");
				$('#list_route_id').append("<option value='" + route.route_id + "'>" + route.route_id + " (" + route.route_short_name + ")</option>");
			});
			$('#route_id_auto').trigger("chosen:updated");
			$('#route_id_man').trigger("chosen:updated");
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
				$('#service_id_auto').append("<option value='" + calendar.service_id + "'>" + calendar.service_id + "</option>");
				$('#service_id_man').append("<option value='" + calendar.service_id + "'>" + calendar.service_id + "</option>");
				$('#list_service_id').append("<option value='" + calendar.service_id + "'>" + calendar.service_id + "</option>");
			});
			$('#service_id_auto').trigger("chosen:updated");
			$('#service_id_man').trigger("chosen:updated");
			$('#list_service_id').trigger("chosen:updated");
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
					if(current_tab == "#auto")
						$('#service_id_auto').val('').trigger('chosen:updated');
					else if(current_tab == "#man")
						$('#service_id_man').val('').trigger('chosen:updated');
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
				if(current_tab == "#auto") {
					//reset route-chosen and calendar chosen
					$('#route_id_auto').val('').trigger('chosen:updated');
					$('#service_id_auto').val('').trigger('chosen:updated');
					//reset "finished" switch
					finished = false;
					//reset/clear relative vars
					clear();
				} else if(current_tab == "#man") {
					//reset route-chosen and calendar chosen
					$('#route_id_man').val('').trigger('chosen:updated');
					$('#service_id_man').val('').trigger('chosen:updated');
					//reset "finished" switch
					finishedMan = false;
					clearMan();
				} else
					alert("have not exe");
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
				if(current_tab == "#auto") {
					//清除车站数据
					stopArrayOfCurShape = [];
				} else if(current_tab == "#man") {
					//重置车站icon, 恢复为白色
					for(var i=0; i<stopArrayMan.length; i++) {
						stopArrayMan[i].setIcon(StopIconExisted);
					}
					//清除当前路线的站点信息
					stopArrayOfCurShapeMan = [];
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
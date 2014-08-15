/**
 * @author HU RIXIN
 * @time 2014-06-24
 */
//------------------------------------------ Global Variables ------------------------------------------

//set current_tab to "edit" or "list", distinguish which is the current tab opened
var current_tab = "#edit";

//---------------------------------------------- Validate ----------------------------------------------
function validate_trip_id() {
	var val = $("#edit_trip_id").val();
	if (val == null || val == "") {
		alertify.error("Trip ID must be filled out");
		$("#edit_trip_id").focus();
		return false;
	} else {
		return true;
	}
}

function validate_route_id() {
	var val = $("#edit_route_id").val();
	if (val == null || val == "") {
		alertify.error("Route ID must be filled out");
		$("#edit_route_id").focus();
		return false;
	} else {
		return true;
	}
}

function validate_service_id() {
	var val = $("#edit_service_id").val();
	if (val == null || val == "") {
		alertify.error("Service ID must be filled out");
		$("#edit_service_id").focus();
		return false;
	} else {
		return true;
	}
}

function validate_chain() {
	if(validate_trip_id() == false) {
		return false;
	} else if(validate_route_id() == false) {
		return false;
	} else if(validate_service_id() == false) {
		return false;
	} else {
		return true;
	}
}

//------------------------------------------ Json format conversion------------------------------------------
/*
 * Convert string to JSON
 */
function stringToJson(str){
	var json = eval('(' + str + ')');
	return json;
}

function trip_to_json() {
	var trip_json = '{';
	trip_json += '"trip_id":"' + $("#edit_trip_id").val() + '",';
	trip_json += '"agency_id":"' + agency_id + '",';
	trip_json += '"route_id":"' + $("#edit_route_id").val() + '",';
	trip_json += '"service_id":"' + $("#edit_service_id").val() + '",';
	trip_json += '"trip_headsign":"' + $("#edit_trip_headsign").val() + '",';
	trip_json += '"trip_short_name":"' + $("#edit_trip_short_name").val() + '",';
	trip_json += '"direction_id":"' + $("#edit_direction_id").val() + '",';
	trip_json += '"block_id":"' + $("#edit_block_id").val() + '",';
	trip_json += '"shape_id":"' + $("#edit_shape_id").val() + '",';
	trip_json += '"wheelchair_accessible":"' + $("#edit_wheelchair_accessible").val() + '",';
	trip_json += '"bikes_allowed":"' + $("#edit_bikes_allowed").val() + '"}';
	return trip_json;
}

//------------------------------------------ Button response function ------------------------------------------
function btn_save() {
	//if in "edit" tab (current_tab=="#edit"), insert or update current item to DB
	if(current_tab == "#edit") {
		//validate first
		if(validate_chain() == false)
			return;
		new_trip();
	} else {
		alertify.log("Turn to 'Edit' tab to save modifications :)");
	}
}

function btn_back() {
	window.location.href = "EditIntroduction.jsp";
}

function btn_reset() {
	if(current_tab == "#edit") {
		//clear all fields
		$("#edit_trip_id").val('');
		$("#edit_route_id").val('').trigger('chosen:updated');
		$("#edit_service_id").val('').trigger('chosen:updated');
		$("#edit_trip_headsign").val('');
		$("#edit_trip_short_name").val('');
		$("#edit_direction_id").val('').trigger('chosen:updated');
		$("#edit_block_id").val('');
		$("#edit_shape_id").val('');
		$('#edit_wheelchair_accessible').val('').trigger('chosen:updated');
		$('#edit_bikes_allowed').val('').trigger('chosen:updated');
		//reset focus to stop_id
		$("#edit_trip_id").focus();
	} else {
		$("#list_route_id").val('').trigger('chosen:updated');
		$("#list_service_id").val('').trigger('chosen:updated');
		document.getElementById("table_list_trip").innerHTML = "";
	}
}

//move values of clicked item in 'list' tab to 'edit' tab
function btn_edit(selected_item) {
	//get values of each fields of clicked item in 'list' tab
	var trip_id = $(selected_item).find('.c_trip_id').html();
	var route_id = $("#list_route_id").val();
	var service_id = $("#list_service_id").val();
	var trip_headsign = $(selected_item).find('.c_trip_headsign').html();
	var trip_short_name = $(selected_item).find('.c_trip_short_name').html();
	var direction_id = $(selected_item).find('.c_direction_id').html();
	var block_id = $(selected_item).find('.c_block_id').html();
	var shape_id = $(selected_item).find('.c_shape_id').html();
	var wheelchair_accessible = $(selected_item).find('.c_wheelchair_accessible').html();
	var bikes_allowed = $(selected_item).find('.c_bikes_allowed').html();
	//set values of each fields to 'edit' tab
	$('#edit_trip_id').val(trip_id);
	$('#edit_route_id').val(route_id).trigger("chosen:updated");
	$('#edit_service_id').val(service_id).trigger("chosen:updated");
	$('#edit_trip_headsign').val(trip_headsign);
	$('#edit_trip_short_name').val(trip_short_name);
	$('#edit_direction_id').val(direction_id).trigger("chosen:updated");
	$('#edit_block_id').val(block_id);
	$('#edit_shape_id').val(shape_id);
	$('#edit_wheelchair_accessible').val(wheelchair_accessible).trigger("chosen:updated");
	$('#edit_bikes_allowed').val(bikes_allowed).trigger("chosen:updated");
	change_to_tab_edit();
}

function btn_delete(selected_item) {
	// confirm dialog
	alertify.confirm("Are you sure you want to delete this trip?", function (e) {
	    if (e) {
	    	// user clicked "ok"
	    	//web service call, delete trip
	    	delete_trip(selected_item);
	    }
	});
}

function btn_delete_all() {
	if($('#list_route_id').val() == "") {
		alertify.error("Please choose a route first");
		return;
	} else if($('#list_service_id').val() == "") {
		alertify.error("Please choose a calendar first");
		return;
	}
	// confirm dialog
	alertify.confirm("Are you sure you want to delete this group of trips?", function (e) {
	    if (e) {
	    	// user clicked "ok"
	    	//web service call, delete calendar
	    	delete_trip_all();
	    }
	});
}

function btn_query() {
	if($('#list_route_id').val() == "") {
		alertify.error("Please choose a route first");
		return;
	} else if($('#list_service_id').val() == "") {
		alertify.error("Please choose a calendar first");
		return;
	}
	list_trip();
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
				$('#edit_route_id').append("<option value='" + route.route_id + "'>" + route.route_id + " (" + route.route_short_name + ")</option>");
				$('#list_route_id').append("<option value='" + route.route_id + "'>" + route.route_id + " (" + route.route_short_name + ")</option>");
			});
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
				$('#edit_service_id').append("<option value='" + calendar.service_id + "'>" + calendar.service_id + "</option>");
				$('#list_service_id').append("<option value='" + calendar.service_id + "'>" + calendar.service_id + "</option>");
			});
			$('#edit_service_id').trigger("chosen:updated");
			$('#list_service_id').trigger("chosen:updated");
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

function new_trip() {
	//pack each field to a json format
	var trip_json = trip_to_json();
	//web service call, insert new trip
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/new/trip",
		type: "POST",
		data: trip_json,
		dataType: 'html',
		success: function (data) {
			if(data == "true") {
				//prompt alert to notify users
				alertify.success("Modifications have been saved :)");
				//update list
				list_trip();
				//clear each field for next new
				btn_reset();
			} else {
				alertify.error("Modifications have not been saved :(");
			}
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

function list_trip() {
	var route_id = $('#list_route_id').val();
	var service_id = $('#list_service_id').val();	
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/list/trip_by_route_service_id",
		type: "POST",
		data: "{route_id:'" + route_id + "',service_id:'" + service_id + "'}",
		dataType: 'html',
		success: function (data) {
			var list_trip_content = "";
			var list = stringToJson(data);
			if(list.Trip.length == 0) {
				alertify.log("Such trips do not exist.");
				return;
			}
			$.each(list.Trip, function(i, trip) {
				//set content of html (list tab)
				list_trip_content += "<tr>" + 
					"<td><input type='image' src='images/icn_edit.png' title='Edit' onclick='btn_edit(this.parentNode.parentNode)'>" +
					"<input type='image' src='images/icn_trash.png' title='Trash' onclick='btn_delete(this.parentNode.parentNode)'></td>" +
					"<td class='c_trip_id'>" + trip.trip_id +  "</td>" +
					"<td class='c_trip_headsign'>" + trip.trip_headsign + "</td>" +
					"<td class='c_trip_short_name'>" + trip.trip_short_name + "</td>" +
					"<td class='c_direction_id'>" + trip.direction_id + "</td>" +
					"<td class='c_block_id'>" + trip.block_id + "</td>" +
					"<td class='c_shape_id'>" + trip.shape_id + "</td>" +
					"<td class='c_wheelchair_accessible'>" + trip.wheelchair_accessible + "</td>" +
					"<td class='c_bikes_allowed'>" + trip.bikes_allowed + "</td>" +
					"</tr>";
			});
			document.getElementById("table_list_trip").innerHTML = list_trip_content;
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Retrieve trip list error:(");
	});
}

function delete_trip(selected_item) {
	//get trip_id
	var trip_id = $(selected_item).find('.c_trip_id').html();
	//web service call, delete trip
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/delete/trip",
		type: "POST",
		data: trip_id,
		dataType: 'html',
		success: function (data) {
			if(data == "true") {
				//prompt alert to notify users
		    	alertify.success("Trip has been deleted :)");
				//update list tab
				selected_item.remove();
			} else {
				alertify.error("Trip has not been deleted :(");
			}
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

function delete_trip_all() {
	var route_id = $('#list_route_id').val();
	var service_id = $('#list_service_id').val();	
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/delete/trip_by_route_service_id",
		type: "POST",
		data: "{route_id:'" + route_id + "',service_id:'" + service_id + "'}",
		dataType: 'html',
		success: function (data) {
			//prompt alert to notify users
	    	alertify.success("Trips have been deleted :)");
			//update list tab
	    	document.getElementById("table_list_trip").innerHTML = "";
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Delete trips error:(");
	});
}
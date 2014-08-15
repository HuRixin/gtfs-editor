/**
 * @author HU RIXIN
 * @time 2014-06-27
 */
//------------------------------------------ Global Variables ------------------------------------------

//set current_tab to "new" or "list", distinguish which is the current tab opened
var current_tab = "#map";
//current modification in "new" tab has been saved or not
var is_new_saved = false;
//increasing stop sequence
var stop_sequence = 0;

//------------------------------------------ Validate ------------------------------------------
function validate_non_negative_integer(event) {
    var key = window.event ? event.keyCode : event.which;
    //keyCode: 8-BackSpace; 37-Left Arrow; 39-Right Arrow;
    if (event.keyCode == 8 || event.keyCode == 37 || event.keyCode == 39) {
        return true;
    }
    else if ( key < 48 || key > 57 ) {
        return false;
    }
    else return true;
}

function validate_non_negative_float(event) {
    var key = window.event ? event.keyCode : event.which;
    //keyCode: 8-BackSpace; 46-Delete and DOT(.); 37-Left Arrow; 39-Right Arrow;
    if (event.keyCode == 8 || event.keyCode == 46
     || event.keyCode == 37 || event.keyCode == 39) {
        return true;
    }
    else if ( key < 48 || key > 57 ) {
        return false;
    }
    else return true;
}

function validate_route_id() {
	var tagid_route_id = "#new_route_id";
	var val = $(tagid_route_id).val();
	if (val == null || val == "") {
		alertify.error("Route ID must be filled out");
		return false;
	} else {
		return true;
	}
}

function validate_trip_id() {
	var tagid_trip_id = "#new_trip_id";
	var val = $(tagid_trip_id).val();
	if (val == null || val == "") {
		alertify.error("Trip ID must be filled out");
		return false;
	} else {
		return true;
	}
}

function validate_stop_id() {
	var tagid_stop_id = "#new_stop_id";
	var val = $(tagid_stop_id).val();
	if (val == null || val == "") {
		alertify.error("Stop ID must be filled out");
		return false;
	} else {
		return true;
	}
}

function validate_stop_sequence() {
	var tagid_stop_sequence = "#new_stop_sequence";
	var val = $(tagid_stop_sequence).val();
	if (val == null || val == "") {
		alertify.error("Stop sequence must be filled out");
		$(tagid_stop_sequence).focus();
		return false;
	} else {
		return true;
	}
}

function validate_arrival_time() {
	var tagid_arrival_time = "#new_arrival_time";
	var val = $(tagid_arrival_time).val();
	if (val == null || val == "") {
		alertify.error("Arrival time must be filled out");
		$(tagid_arrival_time).focus();
		return false;
	} else {
		return true;
	}
}

function validate_departure_time() {
	var tagid_departure_time = "#new_departure_time";
	var val = $(tagid_departure_time).val();
	if (val == null || val == "") {
		alertify.error("Departure time must be filled out");
		$(tagid_departure_time).focus();
		return false;
	} else {
		return true;
	}
}

function validate_shape_dist_traveled() {
	var tagid_shape_dist_traveled = "#new_shape_dist_traveled";
	var val = $(tagid_shape_dist_traveled).val();
	if (val == null || val == "") {
		return true;	//shape_dist_traveled is not mandatory, can be empty
	} else if(isNaN(val) || (val.substring(0, 1) == ".") || (val.substr(val.length-1) == ".")) {//must be a number and doesn't begin/end with "."
		alertify.error("Shape distance traveled must be a valid number");
		$(tagid_shape_dist_traveled).focus();
		return false;
	} else {
		return true;
	}
}

function validate_chain() {
	if(validate_route_id() == false) {
		return false;
	} else if(validate_trip_id() == false) {
		return false;
	} else if(validate_stop_id() == false) {
		return false;
	} else if(validate_stop_sequence() == false) {
		return false;
	} else if(validate_arrival_time() == false) {
		return false;
	} else if(validate_departure_time() == false) {
		return false;
	} else if (validate_shape_dist_traveled() == false) {
		return false;
	} else {
		return true;
	}
}

//------------------------------------------ Json format conversion------------------------------------------
/*
 * Convert string to JSON
 */
function stringToJson(str) {
	var json = eval('(' + str + ')');
	return json;
}

function stop_time_to_json() {
	var stop_time_json = '{';
	stop_time_json += '"trip_id":"' + $("#new_trip_id").val() + '",';
	stop_time_json += '"agency_id":"' + agency_id + '",';
	stop_time_json += '"stop_id":"' + $("#new_stop_id").val() + '",';
	stop_time_json += '"stop_sequence":"' + $("#new_stop_sequence").val() + '",';
	stop_time_json += '"arrival_time":"' + $("#new_arrival_time").val() + '",';
	stop_time_json += '"departure_time":"' + $("#new_departure_time").val() + '",';
	stop_time_json += '"pickup_type":"' + $("#new_pickup_type").val() + '",';
	stop_time_json += '"drop_off_type":"' + $("#new_drop_off_type").val() + '",';
	stop_time_json += '"stop_headsign":"' + $("#new_stop_headsign").val() + '",';
	stop_time_json += '"shape_dist_traveled":"' + $("#new_shape_dist_traveled").val() + '"}';
	return stop_time_json;
}

//copy the value of stop_sequence of map tab to new tab
function move_map_seq_to_new() {
	$('#new_stop_sequence').val($('#map_stop_sequence').val());
}

//copy the value of arrival_time of map tab to new tab
function move_map_at_to_new() {
	$('#new_arrival_time').val($('#map_arrival_time').val());
}

//copy the value of departure_time of map tab to new tab
function move_map_dt_to_new() {
	$('#new_departure_time').val($('#map_departure_time').val());
}

//------------------------------------------ Button response function ------------------------------------------
function btn_save() {
	//validate first
	if(validate_chain() == false)
		return;
	new_stop_time();
}

function btn_complete() {
	// confirm dialog
	alertify.confirm("New STOPTIME finished, finishing the whole creation procedure ?", function (e) {
	    if (e) {
	    	set_finished();
	    }
	});
}

function btn_query() {
	list_stop_time();
}

//delete a single stop_time
function btn_single_delete(row_item) {
	// confirm dialog
	alertify.confirm("Are you sure you want to delete this StopTime ?", function (e) {
	    if (e) {
	    	delete_stop_time(row_item);
	    }
	    else return;
	});
}

//delete stop_times of a specific trip
function btn_group_delete() {
	if($('#list_trip_id').val() == "") {
		alertify.error("Please choose a trip ID first");
		return;
	}
	// confirm dialog
	alertify.confirm("Are you sure you want to delete this group of StopTimes ?", function (e) {
	    if (e) {
	    	delete_stop_times();
	    }
	    else return;
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
				$('#map_route_id').append("<option value='" + route.route_id + "'>" + route.route_id + " (" + route.route_short_name + ")</option>");
				$('#list_route_id').append("<option value='" + route.route_id + "'>" + route.route_id + " (" + route.route_short_name + ")</option>");
			});
			$('#map_route_id').trigger("chosen:updated");
			$('#list_route_id').trigger("chosen:updated");
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened when trying to retrieve routes :(");
	});
}

function load_trips_of_route(route_id) {
	if(route_id == null || route_id == "") return;
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/list/trips_of_route",
		type: "POST",
		data: route_id,
		dataType: 'html',
		success: function (data) {
			var list = stringToJson(data);
			var control_id = current_tab + "_trip_id";
			$(control_id).empty();
			$(control_id).append("<option value=''></option>");
			$.each(list.Trip, function(i, trip) {
				$(control_id).append("<option value='" + trip.trip_id + "'>" + trip.trip_id + " (" + trip.service_id + ")</option>");
			});
			$(control_id).trigger("chosen:updated");
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened when trying to retrieve trips :(");
	});
}

//get stops of a specific trip, draw these stops on map
function draw_stops_of_trip(trip_id) {
	if(trip_id == null || trip_id == "") {
		//if stops layerGroup is not null, first remove the layer which includes all stops on it
		if (stopgroup != null)
		{
			window.map.removeLayer(stopgroup);
			stopgroup = null;
		}
		//array contains all stops "marker"
		stopsArray = [];
		return;
	}
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/list/stop_of_trip",
		type: "POST",
		data: trip_id,
		dataType: 'html',
		success: function (data) {
			var list = stringToJson(data);
			//if stops layerGroup is not null, first remove the layer which includes all stops on it
			if (stopgroup != null)
			{
				window.map.removeLayer(stopgroup);
				stopgroup = null;
			}
			//array contains all stops "marker"
			stopsArray = [];
			$.each(list.Stop, function(i, stop) {
				//new a marker to represent the stop
		    	var marker = new customMarker([stop.stop_lat, stop.stop_lon], {
		    		id: stop.stop_id,
		    		name: stop.stop_name,
		    	    icon: StopIcon,
		    	}).on('click', onMarkerClick);
				//push the marker into array, for later drawing
				stopsArray.push(marker);
			});
			//put the array (with all markers) into a layerGroup, draw them one time
			stopgroup = L.layerGroup(stopsArray).addTo(window.map);
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened when trying to retrieve trips :(");
	});
}

function new_stop_time() {
	//pack each field to a json format
	var stop_time_json = stop_time_to_json();
	//web service call, insert new stop_time
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/new/stop_time",
		type: "POST",
		data: stop_time_json,
		dataType: 'html',
		success: function (data) {
			//prompt alert to notify users
			alertify.success("Modifications have been saved :)");
			//change stop icon to Green
			current_popup_marker.setIcon(StopIconGreen);
			//set sequence, arrival_time and departure time for current_popup_maker
			current_popup_marker.options.sequence = $('#new_stop_sequence').val();
			current_popup_marker.options.arrival_time = $('#new_arrival_time').val();
			current_popup_marker.options.departure_time = $('#new_departure_time').val();
			stop_sequence++;
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

function list_stop_time() {
	if($('#list_route_id').val() == "") {
		alertify.error("Please choose a route first");
		return;
	} else if($('#list_trip_id').val() == "") {
		alertify.error("Please choose a trip first");
		return;
	}
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/list/stop_time",
		type: "POST",
		data: $('#list_trip_id').val(),
		dataType: 'html',
		success: function (data) {
			var list_stop_time_content = "";
			var list = stringToJson(data);
			if(list.StopTime.length == 0) {
				alertify.log("Stop_times whoes trip ID = " + $('#list_trip_id').val() + " does not exist.");
				return;
			}
			$.each(list.StopTime, function(i, stop_time) {
				//set content of html (list tab)
				list_stop_time_content += "<tr>" + 
					"<td><input type='image' src='images/icn_trash.png' title='Trash' onclick='btn_single_delete(this.parentNode.parentNode)'></td>" +
					"<td class='c_stop_id'>" + stop_time.stop_id +  "</td>" +
					"<td class='c_stop_sequence'>" + stop_time.stop_sequence + "</td>" +
					"<td class='c_arrival_time'>" + stop_time.arrival_time + "</td>" +
					"<td class='c_departure_time'>" + stop_time.departure_time + "</td>" +
					"<td class='c_pickup_type'>" + stop_time.pickup_type + "</td>" +
					"<td class='c_drop_off_type'>" + stop_time.drop_off_type + "</td>" +
					"<td class='c_stop_headsign'>" + stop_time.stop_headsign + "</td>" +
					"<td class='c_shape_dist_traveled'>" + stop_time.shape_dist_traveled + "</td>" +
					"</tr>";
			});
			document.getElementById("table_list_stop_time").innerHTML = list_stop_time_content;
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

//delete stop_times of a specific trip
function delete_stop_times() {
	//web service call, delete stop_times
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/delete/stop_times",
		type: "POST",
		data: $('#list_trip_id').val(),
		dataType: 'html',
		success: function (data) {
			//prompt alert to notify users
	    	alertify.success("StopTimes have been deleted :)");
	    	document.getElementById("table_list_stop_time").innerHTML = "";
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

//delete a single stop_time
function delete_stop_time(selected_item) {
	var trip_id = $('#list_trip_id').val();
	//get stop_id
	var stop_id = $(selected_item).find('.c_stop_id').html();
	//web service call, delete stop_time
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/delete/stop_time",
		type: "POST",
		data: "{trip_id:'" + trip_id + "', stop_id:'" + stop_id + "'}",
		dataType: 'html',
		success: function (data) {
			//prompt alert to notify users
	    	alertify.success("StopTime has been deleted :)");
			//update list tab
			selected_item.remove();
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

//set creation finished indicator in session
function set_finished() {
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/util/finished",
		type: "POST",
		dataType: 'html',
		success: function (data) {
			window.location.href = "NewIntroduction.jsp";
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}
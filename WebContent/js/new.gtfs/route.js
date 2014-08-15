/**
 * @author HU RIXIN
 * @time 2014-05-28
 */
//------------------------------------------ Global Variables ------------------------------------------

//set current_tab to "new" or "list", distinguish which is the current tab opened
var current_tab = "#new";

function validate_url(url) {
	var reurl = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
	if(reurl.test(url)) {
		return true;
	} else {
		alertify.error("Please enter a valid URL, remember including http://");
		return false;
	}
}

//------------------------------------------ Validate ------------------------------------------
function validate_route_id() {
	var tagid_route_id = "#new_route_id";
	var val = $(tagid_route_id).val();
	if (val == null || val == "") {
		alertify.error("Route ID must be filled out");
		$(tagid_route_id).focus();
		return false;
	} else {
		return true;
	}
}

function validate_route_short_name() {
	var tagid_route_short_name = "#new_route_short_name";
	var val = $(tagid_route_short_name).val();
	if (val == null || val == "") {
		alertify.error("Route short name must be filled out");
		$(tagid_route_short_name).focus();
		return false;
	} else {
		return true;
	}
}

function validate_route_long_name() {
	var tagid_route_long_name = "#new_route_long_name";
	var val = $(tagid_route_long_name).val();
	if (val == null || val == "") {
		alertify.error("Route long name must be filled out");
		$(tagid_route_long_name).focus();
		return false;
	} else {
		return true;
	}
}

function validate_route_type() {
	var tagid_route_type = "#new_route_type";
	var val = $(tagid_route_type).val();
	if (val == null || val == "") {
		alertify.error("Route type must be filled out");
		$(tagid_route_type).focus();
		return false;
	} else {
		return true;
	}
}

function validate_route_url() {
	var tagid_route_url = "#new_route_url";
	var val = $(tagid_route_url).val();
	if (val == null || val == "") {
		return true;
	} else if(validate_url(val) == false) {
		$(tagid_route_url).focus();
		return false;
	} else {
		return true;
	}
}

function validate_chain() {
	if(validate_route_id() == false) {
		return false;
	} else if(validate_route_short_name() == false) {
		return false;
	} else if(validate_route_long_name() == false) {
		return false;
	} else if(validate_route_type() == false) {
		return false;
	} else if (validate_route_url() == false) {
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

function route_to_json() {
	var route_json = '{';
	route_json += '"route_id":"' + $("#new_route_id").val() + '",';
	route_json += '"agency_id":"' + $("#new_agency_id").val() + '",';
	route_json += '"route_short_name":"' + $("#new_route_short_name").val() + '",';
	route_json += '"route_long_name":"' + $("#new_route_long_name").val() + '",';
	route_json += '"route_desc":"' + $("#new_route_desc").val() + '",';
	route_json += '"route_type":"' + $("#new_route_type").val() + '",';
	route_json += '"route_url":"' + $("#new_route_url").val() + '",';
	route_json += '"route_color":"' + $("#new_route_color").val() + '",';
	route_json += '"route_text_color":"' + $("#new_route_text_color").val() + '"}';
	return route_json;
}

//------------------------------------------ Button response function ------------------------------------------
function btn_save() {
	//if in "new" tab (current_tab=="#new"), insert current item to DB
	if(current_tab == "#new") {
		//validate first
		if(validate_chain() == false)
			return;
		new_route();
	} else {
		alertify.log("Turn to 'new' tab to save modifications :)");
	}
}

function btn_next() {
	// confirm dialog
	alertify.confirm("New ROUTE finished, continue to next step (STOP) ?", function (e) {
	    if (e) {
	        // user clicked "ok", jump to new stop page
			window.location.href = "NewStop.jsp";
	    }
	});
}

function btn_reset() {
	if(current_tab == "#new") {
		//clear all fields
		$("#new_route_id").val('');;
		$("#new_route_short_name").val('');;
		$("#new_route_long_name").val('');;
		$("#new_route_desc").val('');;
		$("#new_route_url").val('');;
		$("#new_route_color").val('');;
		$("#new_route_text_color").val('');;
		$('#new_route_type').val('').trigger('chosen:updated');
		//reset focus to route_id
		$("#new_route_id").focus();
	}
}

function btn_delete(selected_item) {
	// confirm dialog
	alertify.confirm("Are you sure you want to delete this route?", function (e) {
	    if (e) {
	    	// user clicked "ok"
	    	//web service call, delete route
	    	delete_route(selected_item);
	    }
	});
}

//------------------------------------------ Web service call ------------------------------------------
function new_route() {
	//pack each field to a json format
	var route_json = route_to_json();
	//web service call, insert new route
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/new/route",
		type: "POST",
		data: route_json,
		dataType: 'html',
		success: function (data) {
			if(data == "true") {
				//prompt alert to notify users
				alertify.success("Modifications have been saved :)");
				//update list
				list_route();
				//clear each field for next new
				btn_reset();
			} else {
				alertify.error("Save modifications failed :(");
			}
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

function list_route() {
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/list/route",
		type: "GET",
		dataType: 'html',
		success: function (data) {
			var list_route_content = "";
			var list = stringToJson(data);
			$.each(list.Route, function(i, route) {
				list_route_content += "<tr>" + 
					"<td><input type='image' src='images/icn_trash.png' title='Trash' onclick='btn_delete(this.parentNode.parentNode)'></td>" +
					"<td class='c_route_id'>" + route.route_id +  "</td>" +
					"<td class='c_agency_id'>" + route.agency_id +  "</td>" +
					"<td class='c_route_short_name'>" + route.route_short_name + "</td>" +
					"<td class='c_route_long_name'>" + route.route_long_name + "</td>" +
					"<td class='c_route_desc'>" + route.route_desc + "</td>" +
					"<td class='c_route_type'>" + route.route_type + "</td>" +
					"<td class='c_route_url'>" + route.route_url + "</td>" +
					"<td class='c_route_color'>" + route.route_color + "</td>" +
					"<td class='c_route_text_color'>" + route.route_text_color + "</td>" +
					"</tr>";
			});
			document.getElementById("table_list_route").innerHTML = list_route_content;
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

function delete_route(selected_item) {
	//get route_id
	var route_id = $(selected_item).find('.c_route_id').html();
	//web service call, delete route
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/delete/route",
		type: "POST",
		data: route_id,
		dataType: 'html',
		success: function (data) {
			if(data == "true") {
				//prompt alert to notify users
		    	alertify.success("Route has been deleted :)");
				//update list tab
				selected_item.remove();
			} else {
				alertify.error("Route has not been deleted :(");
			}
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

function existence_check() {
	var val = $("#new_route_id").val();
	if(val != null && val != '') {
		//web service call, check if this route existed or not 
		$.ajax({
			url: "/IRMA_RT_EDIT/service/gtfs/edit/existed/route",
			type: "POST",
			data: $("#new_route_id").val(),
			dataType: 'html',
			success: function (data) {
				if(data == "true") {
					alertify.error("This route ID already existed, please enter another one");
					$("#new_route_id").focus();
				}
			}
		}).fail(function (data, textStatus, errorThrown) {
			alertify.error("Something unknown happened :(");
		});
	}
}
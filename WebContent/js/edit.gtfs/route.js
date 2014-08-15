/**
 * @author HU RIXIN
 * @time 2014-07-14
 */
//------------------------------------------ Global Variables ------------------------------------------

//set current_tab to "edit" or "list", distinguish which is the current tab opened
var current_tab = "#list";

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
	var tagid_route_id = "#edit_route_id";
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
	var tagid_route_short_name = "#edit_route_short_name";
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
	var tagid_route_long_name = "#edit_route_long_name";
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
	var tagid_route_type = "#edit_route_type";
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
	var tagid_route_url = "#edit_route_url";
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
	route_json += '"route_id":"' + $("#edit_route_id").val() + '",';
	route_json += '"agency_id":"' + $("#edit_agency_id").val() + '",';
	route_json += '"route_short_name":"' + $("#edit_route_short_name").val() + '",';
	route_json += '"route_long_name":"' + $("#edit_route_long_name").val() + '",';
	route_json += '"route_desc":"' + $("#edit_route_desc").val() + '",';
	route_json += '"route_type":"' + $("#edit_route_type").val() + '",';
	route_json += '"route_url":"' + $("#edit_route_url").val() + '",';
	route_json += '"route_color":"' + $("#edit_route_color").val() + '",';
	route_json += '"route_text_color":"' + $("#edit_route_text_color").val() + '"}';
	return route_json;
}

//------------------------------------------ Button response function ------------------------------------------
function btn_save() {
	//if in "edit" tab (current_tab=="#edit"), insert current item to DB
	if(current_tab == "#edit") {
		//validate first
		if(validate_chain() == false)
			return;
		new_route();
	} else {
		alertify.log("Turn to 'edit' tab to save modifications :)");
	}
}

function btn_back() {
	window.location.href = "EditIntroduction.jsp";
}

function btn_reset() {
	if(current_tab == "#edit") {
		//clear all fields
		$("#edit_route_id").val('');;
		$("#edit_route_short_name").val('');;
		$("#edit_route_long_name").val('');;
		$("#edit_route_desc").val('');;
		$("#edit_route_url").val('');;
		$("#edit_route_color").val('');;
		$("#edit_route_text_color").val('');;
		$('#edit_route_type').val('').trigger('chosen:updated');
		//reset focus to route_id
		$("#edit_route_id").focus();
	}
}

//move values of clicked item in 'list' tab to 'edit' tab
function btn_edit(selected_item) {
	//get values of each fields of clicked item in 'list' tab
	var route_id = $(selected_item).find('.c_route_id').html();
	var route_short_name = $(selected_item).find('.c_route_short_name').html();
	var route_long_name = $(selected_item).find('.c_route_long_name').html();
	var route_desc = $(selected_item).find('.c_route_desc').html();
	var route_type = $(selected_item).find('.c_route_type').html();
	var route_url = $(selected_item).find('.c_route_url').html();
	var route_color = $(selected_item).find('.c_route_color').html();
	var route_text_color = $(selected_item).find('.c_route_text_color').html();
	//set values of each fields to 'edit' tab
	$('#edit_route_id').val(route_id);
	$('#edit_route_short_name').val(route_short_name);
	$('#edit_route_long_name').val(route_long_name);
	$('#edit_route_desc').val(route_desc);
	$('#edit_route_type').val(route_type).trigger("chosen:updated");
	$('#edit_route_url').val(route_url);
	$('#edit_route_color').val(route_color);
	$('#edit_route_text_color').val(route_text_color);
	change_to_tab_edit();
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
	//web service call, insert new route or update existed route
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
					"<td><input type='image' src='images/icn_edit.png' title='Edit' onclick='btn_edit(this.parentNode.parentNode)'>" +
					"<input type='image' src='images/icn_trash.png' title='Trash' onclick='btn_delete(this.parentNode.parentNode)'></td>" +
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
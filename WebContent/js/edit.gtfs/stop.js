/**
 * @author HU RIXIN
 * @time 2014-05-23 
 */
//------------------------------------------ Global Variables ------------------------------------------

//set current_tab to "new" or "list", distinguish which is the current tab opened
var current_tab = "#map";
//current modification in "new" tab has been saved or not
var is_new_saved = true;

//------------------------------------------ Validate ------------------------------------------
function validate_url(url) {
	var reurl = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
	if(reurl.test(url)) {
		return true;
	} else {
		alertify.error("Please enter a valid URL, remember including http://");
		return false;
	}
}

function validate_number(event) {
    var key = window.event ? event.keyCode : event.which;

    //keyCode: 8-BackSpace; 46-Delete; 37-Left Arrow; 39-Right Arrow; 45-Inert/Minus
    if (event.keyCode == 8 || event.keyCode == 46
     || event.keyCode == 37 || event.keyCode == 39 || event.keyCode ==  45) {
        return true;
    }
    else if ( key < 48 || key > 57 ) {
        return false;
    }
    else return true;
};

function validate_stop_id() {
	var val = $("#edit_stop_id").val();
	if (val == null || val == "") {
		alertify.error("Stop ID must be filled out");
		$("#edit_stop_id").focus();
		return false;
	} else {
		return true;
	}
}

function validate_stop_name() {
	var val = $("#edit_stop_name").val();
	if (val == null || val == "") {
		alertify.error("Stop name must be filled out");
		$("#edit_stop_name").focus();
		return false;
	} else {
		return true;
	}
}

function validate_stop_lat() {
	var val = $("#edit_stop_lat").val();
	if (val == null || val == "") {
		alertify.error("Stop latitude must be filled out");
		$("#edit_stop_lat").focus();
		return false;
	} else if(isNaN(val) || (val.substring(0, 1) == ".") || (val.substr(val.length-1) == ".")){//lat/lon must be a number and doesn't begin/end with "."
		alertify.error("Stop latitude must be a valid number");
		$("#edit_stop_lat").focus();
		return false;
	} else {
		var stop_lat_num = parseFloat(val);
		if(stop_lat_num < -90 || stop_lat_num > 90) {
			alertify.error("Stop latitude must be a valid WGS 84 value. (-90~90)");
			$("#edit_stop_lat").focus();
			return false;
		} else {
			return true;
		}
	}
}

function validate_stop_lon() {
	var val = $("#edit_stop_lon").val();
	if (val == null || val == "") {
		alertify.error("Stop longitude must be filled out");
		$("#edit_stop_lon").focus();
		return false;
	}  else if(isNaN(val) || (val.substring(0, 1) == ".") || (val.substr(val.length-1) == ".")){//lat/lon must be a number and doesn't begin/end with "."
		alertify.error("Stop longitude must be a valid number");
		$("#edit_stop_lon").focus();
		return false;
	} else {
		var stop_lon_num = parseFloat(val);
		if(stop_lon_num < -180 || stop_lon_num > 180) {
			alertify.error("Stop longitude must be a valid WGS 84 value. (-180~180)");
			$("#edit_stop_lon").focus();
			return false;
		} else {
			return true;
		}
	}
}

function validate_stop_url() {
	var val = $("#edit_stop_url").val();
	if (val == null || val == "") {
		return true;
	} else if(validate_url(val) == false) {
		$("#edit_stop_url").focus();
		return false;
	} else {
		return true;
	}
}

function validate_chain() {
	if(validate_stop_id() == false) {
		return false;
	} else if(validate_stop_name() == false) {
		return false;
	} else if(validate_stop_lat() == false) {
		return false;
	} else if(validate_stop_lon() == false) {
		return false;
	} else if (validate_stop_url() == false){
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

function stop_to_json() {
	var stop_json = '{';
	stop_json += '"agency_id":"' + agency_id + '",';
	stop_json += '"stop_id":"' + $("#edit_stop_id").val() + '",';
	stop_json += '"stop_code":"' + $("#edit_stop_code").val() + '",';
	stop_json += '"stop_name":"' + $("#edit_stop_name").val() + '",';
	stop_json += '"stop_desc":"' + $("#edit_stop_desc").val() + '",';
	stop_json += '"stop_lat":"' + $("#edit_stop_lat").val() + '",';
	stop_json += '"stop_lon":"' + $("#edit_stop_lon").val() + '",';
	stop_json += '"zone_id":"' + $("#edit_zone_id").val() + '",';
	stop_json += '"stop_url":"' + $("#edit_stop_url").val() + '",';
	stop_json += '"location_type":"' + $("#edit_location_type").val() + '",';
	stop_json += '"parent_station":"' + $("#edit_parent_station").val() + '",';
	stop_json += '"stop_timezone":"' + $("#edit_stop_timezone").val() + '",';
	stop_json += '"wheelchair_boarding":"' + $("#edit_wheelchair_boarding").val() + '"}';
	return stop_json;
}

//------------------------------------------ Button response function ------------------------------------------
function btn_save() {
	//if in "edit" tab (current_tab=="#edit"), insert or update current item to DB
	if(current_tab == "#edit") {
		//validate first
		if(validate_chain() == false)
			return;
		new_stop();//save里记得设置is_new_saved = true;
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
		$("#edit_stop_id").val('');
		$("#edit_stop_code").val('');
		$("#edit_stop_name").val('');
		$("#edit_stop_desc").val('');
		$("#edit_stop_lat").val('');
		$("#edit_stop_lon").val('');
		$("#edit_zone_id").val('');
		$("#edit_stop_url").val('');
		$('#edit_location_type').val('').trigger('chosen:updated');
		$('#edit_parent_station').val('').trigger('chosen:updated');
		$('#edit_stop_timezone').val('').trigger('chosen:updated');
		$('#edit_wheelchair_boarding').val('').trigger('chosen:updated');
		//reset focus to stop_id
		$("#edit_stop_id").focus();
		new_stop_from_map = false;
	}
}

//move values of clicked item in 'map' tab to 'edit' tab
function btn_link_edit(stop_id) {
	//scan list to find the line number of this stop_id
	var numRow = $('#table_list_stop tr').length;
	//get corresponding row (tr) in list tab
	var selected_item;
	var stop_id_in_list;
	for(var i=1; i<=numRow; i++) {
		selected_item = $('#table_list_stop tr:nth-child(' + i + ')');
		stop_id_in_list = $(selected_item).find('.c_stop_id').html();
		if(stop_id == stop_id_in_list) {
			btn_edit(selected_item);
		}
	}
}

function move_list_to_edit(selected_item) {
	//get values of each fields of clicked item in 'list' tab
	var stop_id = $(selected_item).find('.c_stop_id').html();
	var stop_code = $(selected_item).find('.c_stop_code').html();
	var stop_name = $(selected_item).find('.c_stop_name').html();
	var stop_desc = $(selected_item).find('.c_stop_desc').html();
	var stop_lat = $(selected_item).find('.c_stop_lat').html();
	var stop_lon = $(selected_item).find('.c_stop_lon').html();
	var zone_id = $(selected_item).find('.c_zone_id').html();
	var stop_url = $(selected_item).find('.c_stop_url').html();
	var location_type = $(selected_item).find('.c_location_type').html();
	var parent_station = $(selected_item).find('.c_parent_station').html();
	var stop_timezone = $(selected_item).find('.c_stop_timezone').html();
	var wheelchair_boarding = $(selected_item).find('.c_wheelchair_boarding').html();
	//set values of each fields to 'edit' tab
	$('#edit_stop_id').val(stop_id);
	$('#edit_stop_code').val(stop_code);
	$('#edit_stop_name').val(stop_name);
	$('#edit_stop_desc').val(stop_desc);
	$('#edit_stop_lat').val(stop_lat);
	$('#edit_stop_lon').val(stop_lon);
	$('#edit_zone_id').val(zone_id);
	$('#edit_stop_url').val(stop_url);
	$('#edit_location_type').val(location_type).trigger("chosen:updated");
	$('#edit_parent_station').val(parent_station).trigger("chosen:updated");
	$('#edit_stop_timezone').val(stop_timezone).trigger("chosen:updated");
	$('#edit_wheelchair_boarding').val(wheelchair_boarding).trigger("chosen:updated");
}

//move values of clicked item in 'list' tab to 'edit' tab
function btn_edit(selected_item) {
	change_to_tab_edit();
	if(is_new_saved == false)
		// confirm dialog
		alertify.confirm("Current modifications have not been saved, continue?", function (e) {
		    if (e) {
		    	move_list_to_edit(selected_item);
				alertify.log("Previous modifications have been dropped");
		    } else {
		    	alertify.log("Please save the current modifications first");
		    }
		});
	else {
		move_list_to_edit(selected_item);
		is_new_saved = false;
	}
}

function btn_delete(selected_item) {
	// confirm dialog
	alertify.confirm("Are you sure you want to delete this stop?", function (e) {
	    if (e) {
	    	// user clicked "ok"
	    	//web service call, delete calendar
	    	delete_stop(selected_item);
	    }
	});
}

//click the "Delete Stop" link in the popup in map tab
function btn_link_delete(stop_id) {
	//scan list to find the line number of this stop_id
	var numRow = $('#table_list_stop tr').length;
	//get corresponding row (tr) in list tab
	var selected_item;
	var stop_id_in_list;
	for(var i=1; i<=numRow; i++) {
		selected_item = $('#table_list_stop tr:nth-child(' + i + ')');
		stop_id_in_list = $(selected_item).find('.c_stop_id').html();
		if(stop_id == stop_id_in_list) {
			// confirm dialog
			alertify.confirm("Are you sure you want to delete this stop?", function (e) {
			    if (e) {
			    	// user clicked "ok"
			    	//web service call, delete calendar
			    	delete_stop(selected_item);
			    }
			});
			break;
		}
	}
}

//------------------------------------------ Web service call ------------------------------------------
function new_stop() {
	//pack each field to a json format
	var stop_json = stop_to_json();
	//web service call, insert new stop
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/new/stop",
		type: "POST",
		data: stop_json,
		dataType: 'html',
		success: function (data) {
			if(data == "true") {
				//prompt alert to notify users
				alertify.success("New stop has been saved :)");
				//update list tab
				list_stop();
				if(new_stop_from_map) {	//如果本次添加是以地图点击的方式, 那么添加完成后移除地图上原来待添加的车站的图标
					remove_marker(current_new_stop_seq);
				}
				is_new_saved = true;
				btn_reset();
			} else {
				alertify.error("New stop failed :(");
			}
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

function list_stop() {
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/list/stop",
		type: "GET",
		dataType: 'html',
		success: function (data) {
			var list_stop_content = "";
			var list = stringToJson(data);
			existedStopArray = [];
			$.each(list.Stop, function(i, stop) {
				//set content of html (list tab)
				list_stop_content += "<tr>" + 
					"<td><input type='image' src='images/icn_edit.png' title='Edit' onclick='btn_edit(this.parentNode.parentNode)'>" +
					"<input type='image' src='images/icn_trash.png' title='Trash' onclick='btn_delete(this.parentNode.parentNode)'></td>" +
					"<td class='c_stop_id'>" + stop.stop_id +  "</td>" +
					"<td class='c_stop_code'>" + stop.stop_code +  "</td>" +
					"<td class='c_stop_name'>" + stop.stop_name + "</td>" +
					"<td class='c_stop_desc'>" + stop.stop_desc + "</td>" +
					"<td class='c_stop_lat'>" + stop.stop_lat + "</td>" +
					"<td class='c_stop_lon'>" + stop.stop_lon + "</td>" +
					"<td class='c_zone_id'>" + stop.zone_id + "</td>" +
					"<td class='c_stop_url'>" + stop.stop_url + "</td>" +
					"<td class='c_location_type'>" + stop.location_type + "</td>" +
					"<td class='c_parent_station'>" + stop.parent_station + "</td>" +
					"<td class='c_stop_timezone'>" + stop.stop_timezone + "</td>" +
					"<td class='c_wheelchair_boarding'>" + stop.wheelchair_boarding + "</td>" +
					"</tr>";
				//construct stop markers on the map
		    	var marker = new customMarker([stop.stop_lat, stop.stop_lon], {
		    	    icon: StopIconExisted,
		    	    id: stop.stop_id
		    	});
		    	var content = "<div><h3 align='center'>" + stop.stop_id + "</h3>" +
		    		"<table class='reference'><tr><th>Field</th><th>Content</th></tr>" +
		    		"<tr><td>Name</td><td>" + stop.stop_name + "</td></tr>" +
		    		"<tr><td>Location</td><td>(" + stop.stop_lat + ", " + stop.stop_lon + ")</td></tr>" +
		    		"<tr><td>Description</td><td>" + stop.stop_desc + "</td></tr>" +
		    		"<tr><td>Action</td><td><a href='javascript:btn_link_edit(\"" + stop.stop_id + "\")'>Update</a> / <a href='javascript:btn_link_delete(\"" + stop.stop_id + "\")'>Delete</a></td></tr></table></div>";
		    	popup = L.popup().setLatLng([stop.stop_lat, stop.stop_lon]);
				popup.setContent(content);
				marker.bindPopup(popup);
		    	existedStopArray.push(marker);
		    	if(show_hide == 1) {	//刷新地图显示
		    		if(existedStopGroup != null)
		    			window.map.removeLayer(existedStopGroup);
		    		existedStopGroup = L.layerGroup(existedStopArray).addTo(window.map);
		    	}
			});
			document.getElementById("table_list_stop").innerHTML = list_stop_content;
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

function delete_stop(selected_item) {
	//get stop_id
	var stop_id = $(selected_item).find('.c_stop_id').html();
	//web service call, delete stop
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/delete/stop",
		type: "POST",
		data: stop_id,
		dataType: 'html',
		success: function (data) {
			if(data == "true") {
				//prompt alert to notify users
		    	alertify.success("Stop has been deleted :)");
		    	//update existedStopArray for map tab
		    	for(var i=0; i<existedStopArray.length; i++) {
		    		if(stop_id == existedStopArray[i].options.id) {
		    			if (existedStopGroup != null)
		    			{
		    				window.map.removeLayer(existedStopGroup);
		    				existedStopGroup = null;
		    			}
		    			existedStopArray.splice(i, 1);
		    			existedStopGroup = L.layerGroup(existedStopArray).addTo(window.map);
		    			break;
		    		}
		    	}
				//update list tab
				selected_item.remove();
			} else {
				alertify.error("Stop has not been deleted :(");
			}
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}
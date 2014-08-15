/**
 * @author HU RIXIN
 * @time 2014-05-23 
 */
//------------------------------------------ Global Variables ------------------------------------------

//set current_tab to "new" or "list", distinguish which is the current tab opened
var current_tab = "#new";

//------------------------------------------ Validate ------------------------------------------
function validate_service_id() {
	var tagid_service_id = "#new_service_id";
	var val = $(tagid_service_id).val();
	if (val == null || val == "") {
		alertify.error("Service ID must be filled out");
		$(tagid_service_id).focus();
		return false;
	} else {
		return true;
	}
}

function validate_start_end_date() {
	var tagid_start_date = "#new_start_date";
	var tagid_end_date = "#new_end_date";
	var val_start_date = $(tagid_start_date).val();
	var val_end_date = $(tagid_end_date).val();
	if (val_start_date == null || val_start_date == "") {
		alertify.error("Start date must be filled out");
		$(tagid_start_date).focus();
		return false;
	} else if(val_end_date == null || val_end_date == "") {
		alertify.error("End date must be filled out");
		$(tagid_end_date).focus();
		return false;
	} else if(val_end_date < val_start_date) {
		alertify.error("End date can't be earlier than start date");
		$(tagid_end_date).focus();
		return false;
	} else {
		return true;
	}
}

function validate_day_of_week() {
	if(current_tab == "#new") {
		var day_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
		for(var i=0; i<day_of_week.length; i++) {
			if(!$("input[name='" + day_of_week[i] + "']").is(':checked')) {
				alertify.error("Please check " + day_of_week[i] + " will be available or not");
				$('input[name=' + day_of_week[i]).focus();
				return false;
			}
		}
	}
}

function validate_chain() {
	if(validate_service_id() == false) {
		return false;
	} else if(validate_start_end_date() == false) {
		return false;
	} else if(validate_day_of_week() == false) {
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

function calendar_to_json() {
	var calendar_json = '{';
	calendar_json += '"agency_id":"' + agency_id + '",';
	calendar_json += '"service_id":"' + $("#new_service_id").val() + '",';
	calendar_json += '"start_date":"' + $("#new_start_date").val() + '",';
	calendar_json += '"end_date":"' + $("#new_end_date").val() + '",';
	calendar_json += '"monday":"' + $('input[name=Monday]:checked').val() + '",';
	calendar_json += '"tuesday":"' + $('input[name=Tuesday]:checked').val() + '",';
	calendar_json += '"wednesday":"' + $('input[name=Wednesday]:checked').val() + '",';
	calendar_json += '"thursday":"' + $('input[name=Thursday]:checked').val() + '",';
	calendar_json += '"friday":"' + $('input[name=Friday]:checked').val() + '",';
	calendar_json += '"saturday":"' + $('input[name=Saturday]:checked').val() + '",';
	calendar_json += '"sunday":"' + $('input[name=Sunday]:checked').val() + '"}';
	return calendar_json;
}

//------------------------------------------ Button response function ------------------------------------------
function btn_save() {
	//if in "new" tab (current_tab=="#new"), insert current item to DB
	if(current_tab == "#new") {
		//validate first
		if(validate_chain() == false)
			return;
		new_calendar();
	} else {
		alertify.log("Turn to 'new' tab to save modifications :)");
	}
}

function btn_next() {
	// confirm dialog
	alertify.confirm("New CALENDAR finished, continue to next step (ROUTE) ?", function (e) {
	    if (e) {
	        // user clicked "ok", jump to new route page
			window.location.href = "NewRoute.jsp";
	    }
	});
}

function btn_reset() {
	if(current_tab == "#new") {
		//clear all fields
		$("#new_service_id").val('');
		$("#new_start_date").val('');
		$("#new_end_date").val('');
		$('input[name=Monday]').attr('checked',false);
		$('input[name=Tuesday]').attr('checked',false);
		$('input[name=Wednesday]').attr('checked',false);
		$('input[name=Thursday]').attr('checked',false);
		$('input[name=Friday]').attr('checked',false);
		$('input[name=Saturday]').attr('checked',false);
		$('input[name=Sunday]').attr('checked',false);
		//reset focus to service_id
		$("#new_service_id").focus();
	}
}

function btn_delete(selected_item) {
	// confirm dialog
	alertify.confirm("Are you sure you want to delete this calendar?", function (e) {
	    if (e) {
	    	// user clicked "ok"
	    	//web service call, delete calendar
	    	delete_calendar(selected_item);
	    }
	});
}

//------------------------------------------ Web service call ------------------------------------------
function new_calendar() {
	//pack each field to a json format
	var calendar_json = calendar_to_json();
	//web service call, insert new agency
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/new/calendar",
		type: "POST",
		data: calendar_json,
		dataType: 'html',
		success: function (data) {
			if(data == "true") {
				//prompt alert to notify users
				alertify.success("New calendar has been saved :)");
				//update list
				list_calendar();
				//clear each field for next new
				btn_reset();
			} else {
				alertify.error("New calendar failed :(");
			}
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

function list_calendar() {
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/list/calendar",
		type: "GET",
		dataType: 'html',
		success: function (data) {
			var list_calendar_content = "";
			var list = stringToJson(data);
			$.each(list.Calendar, function(i, calendar) {
				list_calendar_content += "<tr>" + 
					"<td><input type='image' src='images/icn_trash.png' title='Trash' onclick='btn_delete(this.parentNode.parentNode)'></td>" +
					"<td class='c_service_id'>" + calendar.service_id +  "</td>" +
					"<td class='c_start_date'>" + calendar.start_date + "</td>" +
					"<td class='c_end_date'>" + calendar.end_date + "</td>" +
					"<td class='c_monday'>" + calendar.monday + "</td>" +
					"<td class='c_tuesday'>" + calendar.tuesday + "</td>" +
					"<td class='c_wednesday'>" + calendar.wednesday + "</td>" +
					"<td class='c_thursday'>" + calendar.thursday + "</td>" +
					"<td class='c_friday'>" + calendar.friday + "</td>" +
					"<td class='c_saturday'>" + calendar.saturday + "</td>" +
					"<td class='c_sunday'>" + calendar.sunday + "</td>" +
					"</tr>";
			});
			document.getElementById("table_list_calendar").innerHTML = list_calendar_content;
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

function delete_calendar(selected_item) {
	//get service_id
	var service_id = $(selected_item).find('.c_service_id').html();
	//web service call, delete calendar
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/delete/calendar",
		type: "POST",
		data: service_id,
		dataType: 'html',
		success: function (data) {
			if(data == "true") {
				//prompt alert to notify users
		    	alertify.success("Calendar has been deleted :)");
				//update list tab
				selected_item.remove();
			} else {
				alertify.error("Calendar has not been deleted :(");
			}
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

function existence_check() {
	var val = $("#new_service_id").val();
	if(val != null && val != '') {
		//web service call, check if this calendar existed or not 
		$.ajax({
			url: "/IRMA_RT_EDIT/service/gtfs/edit/existed/calendar",
			type: "POST",
			data: $("#new_service_id").val(),
			dataType: 'html',
			success: function (data) {
				if(data == "true") {
					alertify.error("This service ID already existed, please enter another one");
					$("#new_service_id").focus();
				}
			}
		}).fail(function (data, textStatus, errorThrown) {
			alertify.error("Something unknown happened :(");
		});
	}
}
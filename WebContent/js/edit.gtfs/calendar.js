/**
 * @author HU RIXIN
 * @time 2014-07-14
 */
//------------------------------------------ Global Variables ------------------------------------------

//set current_tab to "edit" or "list", distinguish which is the current tab opened
var current_tab = "#list";

//------------------------------------------ Validate ------------------------------------------
function validate_service_id() {
	var tagid_service_id = "#edit_service_id";
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
	var tagid_start_date = "#edit_start_date";
	var tagid_end_date = "#edit_end_date";
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
	if(current_tab == "#edit") {
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
	calendar_json += '"service_id":"' + $("#edit_service_id").val() + '",';
	calendar_json += '"start_date":"' + $("#edit_start_date").val() + '",';
	calendar_json += '"end_date":"' + $("#edit_end_date").val() + '",';
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
	//if in "edit" tab (current_tab=="#edit"), insert or update current item to DB
	if(current_tab == "#edit") {
		//validate first
		if(validate_chain() == false)
			return;
		new_calendar();
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
		$("#edit_service_id").val('');
		$("#edit_start_date").val('');
		$("#edit_end_date").val('');
		$('input[name=Monday]').attr('checked',false);
		$('input[name=Tuesday]').attr('checked',false);
		$('input[name=Wednesday]').attr('checked',false);
		$('input[name=Thursday]').attr('checked',false);
		$('input[name=Friday]').attr('checked',false);
		$('input[name=Saturday]').attr('checked',false);
		$('input[name=Sunday]').attr('checked',false);
		//reset focus to service_id
		$("#edit_service_id").focus();
	}
}

//move values of clicked item in 'list' tab to 'edit' tab
function btn_edit(selected_item) {
	//get values of each fields of clicked item in 'list' tab
	var service_id = $(selected_item).find('.c_service_id').html();
	var start_date = $(selected_item).find('.c_start_date').html();
	var end_date = $(selected_item).find('.c_end_date').html();
	var monday = $(selected_item).find('.c_monday').html();
	var tuesday = $(selected_item).find('.c_tuesday').html();
	var wednesday = $(selected_item).find('.c_wednesday').html();
	var thursday = $(selected_item).find('.c_thursday').html();
	var friday = $(selected_item).find('.c_friday').html();
	var saturday = $(selected_item).find('.c_saturday').html();
	var sunday = $(selected_item).find('.c_sunday').html();
	//set values of each fields to 'edit' tab
	$('#edit_service_id').val(service_id);
	$('#edit_start_date').val(start_date);
	$('#edit_end_date').val(end_date);
	monday == '1' ? $('#edit_monday_av').prop("checked", true) : $('#edit_monday_nav').prop("checked", true);
	tuesday == '1' ? $('#edit_tuesday_av').prop("checked", true) : $('#edit_tuesday_nav').prop("checked", true);
	wednesday == '1' ? $('#edit_wednesday_av').prop("checked", true) : $('#edit_wednesday_nav').prop("checked", true);
	thursday == '1' ? $('#edit_thursday_av').prop("checked", true) : $('#edit_thursday_nav').prop("checked", true);
	friday == '1' ? $('#edit_friday_av').prop("checked", true) : $('#edit_friday_nav').prop("checked", true);
	saturday == '1' ? $('#edit_saturday_av').prop("checked", true) : $('#edit_saturday_nav').prop("checked", true);
	sunday == '1' ? $('#edit_sunday_av').prop("checked", true) : $('#edit_sunday_nav').prop("checked", true);
	change_to_tab_edit();
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
	//web service call, insert new agency or update agency
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/new/calendar",
		type: "POST",
		data: calendar_json,
		dataType: 'html',
		success: function (data) {
			if(data == "true") {
				//prompt alert to notify users
				alertify.success("Modifications have been saved :)");
				//update list
				list_calendar();
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
					"<td><input type='image' src='images/icn_edit.png' title='Edit' onclick='btn_edit(this.parentNode.parentNode)'>" +
					"<input type='image' src='images/icn_trash.png' title='Delete' onclick='btn_delete(this.parentNode.parentNode)'></td>" +
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
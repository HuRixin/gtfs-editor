/**
 * @author HU RIXIN
 * @time 2014-05-23 
 */
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

function validate_agency_name() {
	var tagid_agency_name = "#new_agency_name";
	var val = $(tagid_agency_name).val();
	if (val == null || val == "") {
		alertify.error("Agency name must be filled out");
		$(tagid_agency_name).focus();
		return false;
	} else {
		return true;
	}
}

function validate_agency_url() {
	var tagid_agency_url = "#new_agency_url";
	var val = $(tagid_agency_url).val();
	if (val == null || val == "") {
		alertify.error("Agency URL must be filled out");
		$(tagid_agency_url).focus();
		return false;
	} else if(validate_url(val) == false) {
		$(tagid_agency_url).focus();
		return false;
	} else {
		return true;
	}
}

function validate_agency_timezone() {
	var tagid_agency_timezone = "#new_agency_timezone";
	var val = $(tagid_agency_timezone).val();
	if (val == null || val == "") {
		alertify.error("Agency timezone must be filled out");
		$(tagid_agency_timezone).focus();
		return false;
	} else {
		return true;
	}
}

function validate_agency_fare_url() {
	var tagid_agency_fare_url = "#new_agency_fare_url";
	var val = $(tagid_agency_fare_url).val();
	if(val == "") {
		return true;	//agency_fare_url is not necessary field, can be empty
	}else if(validate_url(val) == false) {
		$(tagid_agency_fare_url).focus();
		return false;
	} else {
		return true;
	}
}

function validate_chain() {
	if(validate_agency_name() == false) {
		return false;
	} else if(validate_agency_url() == false) {
		return false;
	} else if(validate_agency_timezone() == false) {
		return false;
	} else if(validate_agency_fare_url() == false) {
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

function agency_to_json() {
	var agency_json = '{';
	agency_json += '"agency_id":"' + $("#new_agency_id").val() + '",';
	agency_json += '"agency_name":"' + $("#new_agency_name").val() + '",';
	agency_json += '"agency_url":"' + $("#new_agency_url").val() + '",';
	agency_json += '"agency_timezone":"' + $("#new_agency_timezone").val() + '",';
	agency_json += '"agency_lang":"' + $("#new_agency_lang").val() + '",';
	agency_json += '"agency_phone":"' + $("#new_agency_phone").val() + '",';
	agency_json += '"agency_fare_url":"' + $("#new_agency_fare_url").val() + '"}';
	return agency_json;
}

//------------------------------------------ Button response function ------------------------------------------
function btn_save() {
	//validate first
	if(validate_chain() == false)
		return;
	new_agency();
}

function btn_next() {
	// confirm dialog
	alertify.confirm("New AGENCY finished, continue to next step (CALENDAR) ?", function (e) {
	    if (e) {
	        // user clicked "ok", jump to new calendar page
			window.location.href = "NewCalendar.jsp";
	    }
	});
}

function btn_reset() {
	//clear all fields except for agency_id
	$("#new_agency_name").val('');
	$("#new_agency_url").val('');
	$('#new_agency_timezone').val('').trigger('chosen:updated');
	$('#new_agency_lang').val('').trigger('chosen:updated');
	$("#new_agency_phone").val('');
	$("#new_agency_fare_url").val('');
	//reset focus to agency_name
	$("#new_agency_name").focus();
}

//------------------------------------------ Web service call ------------------------------------------
function new_agency() {
	//pack each field to a json format
	var agency_json = agency_to_json();
	//web service call, insert new agency
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/new/agency",
		type: "POST",
		data: agency_json,
		dataType: 'html',
		success: function (data) {
			if(data == "true") {
				//prompt alert to notify users
				alertify.success("Modifications have been saved :)");
			} else {
				alertify.error("Save modifications failed :(");
			}
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}
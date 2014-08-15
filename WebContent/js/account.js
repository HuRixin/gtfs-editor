/**
 * @author HU RIXIN
 * @time 2014-07-19
 */

//------------------------------------------ Validate ------------------------------------------
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

function validate_country() {
	var tagid_country = "#country";
	var val = $(tagid_country).val();
	if (val == null || val == "") {
		alertify.error("Country must be filled out");
		$(tagid_country).focus();
		return false;
	} else {
		return true;
	}
}

function validate_city() {
	var tagid_city = "#city";
	var val = $(tagid_city).val();
	if (val == null || val == "") {
		alertify.error("City must be filled out");
		$(tagid_city).focus();
		return false;
	} else {
		return true;
	}
}

function validate_city_center_lat() {
	var val = $("#city_center_lat").val();
	if (val == null || val == "") {
		alertify.error("City center latitude must be filled out");
		$("#city_center_lat").focus();
		return false;
	} else if(isNaN(val) || (val.substring(0, 1) == ".") || (val.substr(val.length-1) == ".")){//lat/lon must be a number and doesn't begin/end with "."
		alertify.error("City center latitude must be a valid number");
		$("#city_center_lat").focus();
		return false;
	} else {
		var city_center_lat_num = parseFloat(val);
		if(city_center_lat_num < -90 || city_center_lat_num > 90) {
			alertify.error("City center latitude must be a valid WGS 84 value. (-90~90)");
			$("#city_center_lat").focus();
			return false;
		} else {
			return true;
		}
	}
}

function validate_city_center_lon() {
	var val = $("#city_center_lon").val();
	if (val == null || val == "") {
		alertify.error("City center longitude must be filled out");
		$("#city_center_lon").focus();
		return false;
	}  else if(isNaN(val) || (val.substring(0, 1) == ".") || (val.substr(val.length-1) == ".")){//lat/lon must be a number and doesn't begin/end with "."
		alertify.error("City center longitude must be a valid number");
		$("#city_center_lon").focus();
		return false;
	} else {
		var city_center_lon_num = parseFloat(val);
		if(city_center_lon_num < -180 || city_center_lon_num > 180) {
			alertify.error("City center longitude must be a valid WGS 84 value. (-180~180)");
			$("#city_center_lon").focus();
			return false;
		} else {
			return true;
		}
	}
}

function validate_chain() {
	if(validate_country() == false) {
		return false;
	} else if(validate_city() == false) {
		return false;
	} else if(validate_city_center_lat() == false) {
		return false;
	} else if(validate_city_center_lon() == false) {
		return false;
	} else {
		return true;
	}
}

function validate_password() {
	var old_password = $("#old_password").val();
	if(old_password == "")
		return;
	//web service call, validate password
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/validate/password",
		type: "POST",
		data: old_password,
		dataType: 'html',
		success: function (data) {
			if(data == "false") {
				alertify.error("Wrong password :( Please try again.");
				$("#old_password").focus();
			}
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}

//------------------------------------------ Json format conversion------------------------------------------
function account_to_json() {
	var account_json = '{';
	account_json += '"username":"' + $("#username").val() + '",';
	account_json += '"agency_id":"' + $("#agency_id").val() + '",';
	account_json += '"country":"' + $("#country").val() + '",';
	account_json += '"city":"' + $("#city").val() + '",';
	account_json += '"city_center_lat":"' + $("#city_center_lat").val() + '",';
	account_json += '"city_center_lon":"' + $("#city_center_lon").val() + '",';
	account_json += '"password":"' + $("#new_password").val() + '"}';
	return account_json;
}

//------------------------------------------ Button response function ------------------------------------------
function btn_save() {
	//validate first
	if(validate_chain() == false)
		return;
	update_account();
}

function btn_reset() {
	$("#country").val('');
	$("#city").val('');
	$("#city_center_lat").val('');
	$("#city_center_lon").val('');
	$("#old_password").val('');
	$("#new_password").val('');
}

function btn_back() {
	window.location.href="main.jsp";
}

//------------------------------------------ Web service call ------------------------------------------

function update_account() {
	//pack each field to a json format
	var account = account_to_json();
	//web service call, update agency
	$.ajax({
		url: "/IRMA_RT_EDIT/service/gtfs/edit/update/account",
		type: "POST",
		data: account,
		dataType: 'html',
		success: function (data) {
			alertify.success("Modifications have been saved :)");
		}
	}).fail(function (data, textStatus, errorThrown) {
		alertify.error("Something unknown happened :(");
	});
}
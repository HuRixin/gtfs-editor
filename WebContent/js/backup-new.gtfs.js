/**
 * 
 * @author HU RIXIN
 * @time 2014-05-19 Tomorrow is unburden day hohaha! and...my 24th birthday :)
 */
//------------------------------------------ Global Variables ------------------------------------------

//set save_switch to "new" or "list", distinguish which part should be saved (used in save_xxx functions)
var save_switch = "#new";
//current modification has been saved or not
var is_saved = false;

function validate_url(url) {
	var reurl = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
	if(reurl.test(url)) {
		return true;
	} else {
		alertify.error("Please enter a valid URL, remember including http://");
		return false;
	}
}

//------------------------------------------ AGENCY ------------------------------------------
function validate_agency_name() {
	var name=document.forms["form_new_agency"]["new_agency_name"].value;
	if (name == null || name == "") {
		alertify.error("Agency name must be filled out");
		$("#new_agency_name").focus();
		return false;
	}
	return true;
}

function validate_agency_url() {
	var url = $("#new_agency_url").val();
	if(validate_url(url) == false) {
		$("#new_agency_url").focus();
		return false;
	}
	return true;
}

function validate_agency_timezone() {
	var timezone = $("#new_agency_timezone").val();
	if(timezone == "") {
		alertify.error("Agency timezone must be filled out");
		$("#new_agency_timezone").focus();
		return false;
	}
	return true;
}

function validate_agency_fare_url() {
	var url = $("#new_agency_fare_url").val();
	if(validate_url(url) == false) {
		$("#new_agency_fare_url").focus();
		return false;
	}
	return true;
}

function save_agency() {
	if(save_switch == "#new") {
		//execute validation first
		if(validate_agency_name() == false || validate_agency_url() == false || validate_agency_timezone() == false)
			return;
		
		//web service call, insert new agency
		alert("new agency");
	} else if(save_switch == "#list") {
		//web service call, update agency
		alert("update agency");
		//set this item (which has been updated) read only
		$("#list_agency_name").prop('readonly', true);
		$("#list_agency_url").prop('readonly', true);
		$("#list_agency_timezone").prop('disabled', true);
		$("#list_agency_lang").prop('disabled', true);
		$("#list_agency_agency_phone").prop('readonly', true);
		$("#list_agency_fare_url").prop('readonly', true);
	} else {
		alert('Something unknown happend? Please contact our lovely system administrator :)');
	}
	is_saved = true;
	//prompt alert to notify users
	alertify.success("Modifications have been saved :)");

}

function next_agency() {
	if(is_saved == false) {
		// confirm dialog
		alertify.confirm("Current modifications have not been saved, continue?", function (e) {
		    if (e) {
		        // user clicked "ok"
		    	alertify.error("Current modifications have not been saved :(");
				//jump to new calendar page
				setInterval(function(){window.location.href = "NewCalendar.jsp";}, 2000);
		    } else {
		        // user clicked "cancel"
		    	alertify.log("Save the current modifications first :)");
		    	return;
		    }
		});
	} else {
		//jump to new calendar page
		setInterval(function(){window.location.href = "NewCalendar.jsp";}, 2000);
	}
}

function reset_agency() {
	if(save_switch == "#new") {
		//clear all fields except for agency_id
		document.getElementById("new_agency_name").value = "";
		document.getElementById("new_agency_url").value = "";
		$('#new_agency_timezone').val('').trigger('chosen:updated');
		$('#new_agency_lang').val('').trigger('chosen:updated');
		document.getElementById("new_agency_phone").value = "";
		document.getElementById("new_agency_fare_url").value = "";
	} else if(save_switch == "#list") {
		//do nothing
	} else {
		alert('Something unknown happend? Please contact our lovely system administrator :)');
	}
}

function edit_agency(position) {
	//传进来一个要更改的位置，以备后用
	$("#list_agency_name").prop('readonly', false);
	$("#list_agency_url").prop('readonly', false);
	$("#list_agency_timezone").prop('disabled', false);
	$("#list_agency_lang").prop('disabled', false);
	$("#list_agency_agency_phone").prop('readonly', false);
	$("#list_agency_fare_url").prop('readonly', false);
	alertify.log("Click one of the agency fields to edit :)");
}

function delete_agency() {
	//web service call, delete agency
	
	// confirm dialog
	alertify.confirm("Are you sure you want to delete this agency?", function (e) {
	    if (e) {
	        // user clicked "ok"
	    	alertify.success("Agency has been deleted :)");
	    } else {
	        // user clicked "cancel"
	    	alertify.error("Agency has not been deleted :(");
	    }
	});
	
	//show list after delete
}

//------------------------------------------ CALENDAR ------------------------------------------
function save_calendar() {
	//web service call, save calendar
	
	//prompt alert to notify users
	alertify.success("Modifications have been saved :)");
	
	//jump to new calendar page
	setInterval(function(){window.location.href = "NewStop.jsp";}, 2000);
}

function delete_calendar() {
	//web service call, delete calendar
	
	// confirm dialog
	alertify.confirm("Are you sure you want to delete this calendar?", function (e) {
	    if (e) {
	        // user clicked "ok"
	    	alertify.success("Calendar has been deleted :)");
	    } else {
	        // user clicked "cancel"
	    	alertify.error("Calendar has not been deleted :(");
	    }
	});
	
	//show list after delete
}

//------------------------------------------ STOP ------------------------------------------
function save_stop() {
	//web service call, save stop
	
	//prompt alert to notify users
	alertify.success("Modifications have been saved :)");
	
	//jump to new calendar page
	setInterval(function(){window.location.href = "NewRoute.jsp";}, 2000);
}

function delete_stop() {
	//web service call, delete stop
	
	// confirm dialog
	alertify.confirm("Are you sure you want to delete this stop?", function (e) {
	    if (e) {
	        // user clicked "ok"
	    	alertify.success("Stop has been deleted :)");
	    } else {
	        // user clicked "cancel"
	    	alertify.error("Stop has not been deleted :(");
	    }
	});
	
	//show list after delete
}

//------------------------------------------ ROUTE ------------------------------------------
function save_route() {
	//web service call, save route
	
	//prompt alert to notify users
	alertify.success("Modifications have been saved :)");
	
	//jump to new calendar page
	setInterval(function(){window.location.href = "NewShape.jsp";}, 2000);
}

function delete_route() {
	//web service call, delete route
	
	// confirm dialog
	alertify.confirm("Are you sure you want to delete this route?", function (e) {
	    if (e) {
	        // user clicked "ok"
	    	alertify.success("Route has been deleted :)");
	    } else {
	        // user clicked "cancel"
	    	alertify.error("Route has not been deleted :(");
	    }
	});
	
	//show list after delete
}

//------------------------------------------ SHAPE ------------------------------------------
function save_shape() {
	//web service call, save shape
	
	//prompt alert to notify users
	alertify.success("Modifications have been saved :)");
	
	//jump to new calendar page
	setInterval(function(){window.location.href = "NewTrip.jsp";}, 2000);
}

function delete_shape() {
	//web service call, delete shape
	
	// confirm dialog
	alertify.confirm("Are you sure you want to delete this shape?", function (e) {
	    if (e) {
	        // user clicked "ok"
	    	alertify.success("Shape has been deleted :)");
	    } else {
	        // user clicked "cancel"
	    	alertify.error("Shape has not been deleted :(");
	    }
	});
	
	//show list after delete
}

//------------------------------------------ TRIP ------------------------------------------
function save_trip() {
	//web service call, save trip
	
	//prompt alert to notify users
	alertify.success("Modifications have been saved :)");
	
	//jump to new calendar page
	setInterval(function(){window.location.href = "NewStopTime.jsp";}, 2000);
}

function delete_trip() {
	//web service call, delete trip
	
	// confirm dialog
	alertify.confirm("Are you sure you want to delete this trip?", function (e) {
	    if (e) {
	        // user clicked "ok"
	    	alertify.success("Trip has been deleted :)");
	    } else {
	        // user clicked "cancel"
	    	alertify.error("Trip has not been deleted :(");
	    }
	});
	
	//show list after delete
}

//------------------------------------------ STOP_TIME ------------------------------------------
function save_stoptime() {
	//web service call, save stoptime
	
	//prompt alert to notify users
	alertify.success("Modifications have been saved :)");
	
	//clear the current edit environment, for next addition
	
}

function delete_stoptime() {
	//web service call, delete stoptime
	
	// confirm dialog
	alertify.confirm("Are you sure you want to delete this stop_time?", function (e) {
	    if (e) {
	        // user clicked "ok"
	    	alertify.success("StopTime has been deleted :)");
	    } else {
	        // user clicked "cancel"
	    	alertify.error("StopTime has not been deleted :(");
	    }
	});
	
	//show list after delete
}

function new_gtfs_complete() {
	
}

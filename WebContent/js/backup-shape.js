/**
 * @author HU RIXIN
 * @time 2014-05-28
 */
//------------------------------------------ Global Variables ------------------------------------------

//set current_tab to "new" or "list", distinguish which is the current tab opened
var current_tab = "#auto";
//current modification in "new" tab has been saved or not
var is_new_saved = false;
//current modification in "list" tab has been saved or not
var is_list_saved = true;
//which item the user want to update/edit in "list" tab
var update_position = -1;

function validate_float(event) {
    var key = window.event ? event.keyCode : event.which;
    //keyCode: 8-BackSpace; 46-Delete and DOT(.); 37-Left Arrow; 39-Right Arrow; 45-Inert/Minus
    if (event.keyCode == 8 || event.keyCode == 46
     || event.keyCode == 37 || event.keyCode == 39 || event.keyCode ==  45) {
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

function lock_item_fields(lock) {
	if(update_position == -1)
		return;
	//lock == true, lock item fields; lock == false, unlock them
	$("#list_shape_pt_lat_" + update_position).prop('readonly', lock);
	$("#list_shape_pt_lon_" + update_position).prop('readonly', lock);
	$("#list_shape_pt_sequence_" + update_position).prop('readonly', lock);
	$("#list_shape_dist_traveled_" + update_position).prop('readonly', lock);
}

//------------------------------------------ Json format conversion------------------------------------------
/*
 * Convert string to JSON
 */
function stringToJson(str){
	var json = eval('(' + str + ')');
	return json;
}


//------------------------------------------ SHAPE ------------------------------------------
function validate_shape_id() {
	var shape_id = "shape_id";
	var tagid_shape_id = "";
	//if in "new" tab: tagid="new_shape_id"; if in "list" tab: tagid="list_shape_id_position"
	if(current_tab == "#new") {
		tagid_shape_id = current_tab + "_" + shape_id;
	} else if(current_tab == "#list") {//--------------------------current_tab == #map, what should we do ??????
		if(update_position == -1) {
			return true;
		} else {
			tagid_shape_id = current_tab + "_" + shape_id + "_" + update_position;
		}
	}
	var val = $(tagid_shape_id).val();
	if (val == null || val == "") {
		alertify.error("Shape ID must be filled out");
		$(tagid_shape_id).focus();
		return false;
	} else {
		return true;
	}
}

function validate_shape_pt_lat() {
	var shape_pt_lat = "shape_pt_lat";
	var tagid_shape_pt_lat = "";
	//if in "new" tab: tagid="new_shape_pt_lat"; if in "list" tab: tagid="list_shape_pt_lat_position"
	if(current_tab == "#new") {
		tagid_shape_pt_lat = current_tab + "_" + shape_pt_lat;
	} else if(current_tab == "#list") {
		if(update_position == -1) {
			return true;
		} else {
			tagid_shape_pt_lat = current_tab + "_" + shape_pt_lat + "_" + update_position;
		}
	}
	var val = $(tagid_shape_pt_lat).val();
	if (val == null || val == "") {
		alertify.error("Shape point latitude must be filled out");
		$(tagid_shape_pt_lat).focus();
		return false;
	} else if(isNaN(val) || (val.substring(0, 1) == ".") || (val.substr(val.length-1) == ".")) {//lat/lon must be a number and doesn't begin/end with "."
		alertify.error("Shape point latitude must be a valid number");
		$(tagid_shape_pt_lat).focus();
		return false;
	} else {
		var shape_pt_lat_num = parseFloat(val);
		if(shape_pt_lat_num < -90 || shape_pt_lat_num > 90) {
			alertify.error("Shape point latitude must be a valid WGS 84 value. (-90~90)");
			$(tagid_shape_pt_lat).focus();
			return false;
		} else {
			return true;
		}
	}
}

function validate_shape_pt_lon() {
	var shape_pt_lon = "shape_pt_lon";
	var tagid_shape_pt_lon = "";
	//if in "new" tab: tagid="new_shape_pt_lon"; if in "list" tab: tagid="list_shape_pt_lon_position"
	if(current_tab == "#new") {
		tagid_shape_pt_lon = current_tab + "_" + shape_pt_lon;
	} else if(current_tab == "#list") {
		if(update_position == -1) {
			return true;
		} else {
			tagid_shape_pt_lon = current_tab + "_" + shape_pt_lon + "_" + update_position;
		}
	}
	var val = $(tagid_shape_pt_lon).val();
	if (val == null || val == "") {
		alertify.error("Shape point longitude must be filled out");
		$(tagid_shape_pt_lon).focus();
		return false;
	}  else if(isNaN(val) || (val.substring(0, 1) == ".") || (val.substr(val.length-1) == ".")) {//lat/lon must be a number and doesn't begin/end with "."
		alertify.error("Shape point longitude must be a valid number");
		$(tagid_shape_pt_lon).focus();
		return false;
	} else {
		var shape_pt_lon_num = parseFloat(val);
		if(shape_pt_lon_num < -180 || shape_pt_lon_num > 180) {
			alertify.error("Shape point longitude must be a valid WGS 84 value. (-180~180)");
			$(tagid_shape_pt_lon).focus();
			return false;
		} else {
			return true;
		}
	}
}

function validate_shape_pt_sequence() {
	var shape_pt_sequence = "shape_pt_sequence";
	var tagid_shape_pt_sequence = "";
	//if in "new" tab: tagid="new_shape_pt_sequence"; if in "list" tab: tagid="list_shape_pt_sequence_position"
	if(current_tab == "#new") {
		tagid_shape_pt_sequence = current_tab + "_" + shape_pt_sequence;
	} else if(current_tab == "#list") {
		if(update_position == -1) {
			return true;
		} else {
			tagid_shape_pt_sequence = current_tab + "_" + shape_pt_sequence + "_" + update_position;
		}
	}
	var val = $(tagid_shape_pt_sequence).val();
	if (val == null || val == "") {
		alertify.error("Shape point sequence must be filled out");
		$(tagid_shape_pt_sequence).focus();
		return false;
	} else {
		return true;
	}
}

function validate_shape_dist_traveled() {
	var shape_dist_traveled = "shape_dist_traveled";
	var tagid_shape_dist_traveled = "";
	//if in "new" tab: tagid="new_shape_dist_traveled"; if in "list" tab: tagid="list_shape_dist_traveled_position"
	if(current_tab == "#new") {
		tagid_shape_dist_traveled = current_tab + "_" + shape_dist_traveled;
	} else if(current_tab == "#list") {
		if(update_position == -1) {
			return true;
		} else {
			tagid_shape_dist_traveled = current_tab + "_" + shape_dist_traveled + "_" + update_position;
		}
	}
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
	if(validate_shape_id() == false) {
		$("#new_shape_id").focus();
		return false;
	} else if(validate_shape_pt_lat() == false) {
		$("#new_shape_pt_lat").focus();
		return false;
	} else if(validate_shape_pt_lon() == false) {
		$("#new_shape_pt_lon").focus();
		return false;
	} else if(validate_shape_pt_sequence() == false) {
		$("#new_shape_pt_sequence").focus();
		return false;
	} else if (validate_shape_dist_traveled() == false) {
		$("#new_shape_dist_traveled").focus();
		return false;
	} else {
		return true;
	}
}

function new_shape() {
	//web service call, insert new shape
	alert("new shape");
	is_new_saved = true;
}

function update_shape() {
	//web service call, update shape
	alert("update shape");
	is_list_saved = true;
}

function save_shape() {
	//validate first
	if(validate_chain() == false)
		return;
	//if in "new" tab (current_tab=="#new"), insert current item to DB
	if(current_tab == "#new") {
		new_shape();
		//reset fields for another new
		reset_shape();
	}
	//if in "list" tab (current_tab=="#list"), update current item to DB
	else if(current_tab == "#list") {
		update_shape();
		//lock this item (which has been updated): set it read only
		lock_item_fields(true);
		//reset update_position: no item is selected now
		update_position = -1;
	} else {
		alert('Something unknown happend? Please contact our lovely system administrator :)');
	}

	//prompt alert to notify users
	alertify.success("Modifications have been saved :)");
}

function next_shape() {
	if(is_new_saved == false || is_list_saved == false) {
		// confirm dialog
		alertify.confirm("Current modifications have not been saved, continue?", function (e) {
		    if (e) {
		        // user clicked "ok"
		    	alertify.error("Current modifications have not been saved :(");
				//jump to new calendar page
				setInterval(function(){window.location.href = "NewTrip.jsp";}, 2000);
		    } else {
		        // user clicked "cancel"
		    	alertify.log("Save the current modifications first :)");
		    	return;
		    }
		});
	} else {
		//jump to new calendar page
		setInterval(function(){window.location.href = "NewTrip.jsp";}, 2000);
	}
}

function reset_shape() {
	if(current_tab == "#new") {
		//clear all fields
		$('#new_shape_id').val('').trigger('chosen:updated');
		document.getElementById("new_shape_pt_lat").value = "";
		document.getElementById("new_shape_pt_lon").value = "";
		document.getElementById("new_shape_pt_sequence").value = "";
		document.getElementById("new_shape_dist_traveled").value = "";
		//reset focus to shape_id
		$("#new_shape_id").focus();
	} else if(current_tab == "#list" || current_tab == "#map") {
		//do nothing
	} else {
		alert('Something unknown happend? Please contact our lovely system administrator :)');
	}
}

function edit_shape(position) {
	if(update_position == position) {
		alertify.log("Click one of the shape fields to edit :)");
		return;
	} else if(is_list_saved == false) {
		alertify.error("Please save the current edit item first :)");
		return;
	} else {
		is_list_saved = false;
		//传进来一个要更改的位置，以备后用（用来产生list tab下每一行每一个控件的id，如shape_id_1等）
		update_position = position;
		//unlock the item fields in the line (position), make them editable
		lock_item_fields(false);
		alertify.log("Click one of the shape fields to edit :)");
	}
}

function delete_shape(position) {
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
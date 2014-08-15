<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<%@page import="irma.rt.edit.bean.AccountBean" %>
<title>Public Transit Open Data Edit Platform</title>
	<link rel="stylesheet" href="css/layout.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="css/leaflet.css" />
	<!-- alertify jquery plugin -->
	<link rel="stylesheet" href="css/alertify.core.css" />
	<link rel="stylesheet" href="css/alertify.default.css" />
	<!-- chosen jquery plugin -->
	<link rel="stylesheet" href="css/chosen/chosen.min.css" />
	<!--[if lt IE 9]>
	<link rel="stylesheet" href="css/ie.css" type="text/css" media="screen" />
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<script src="js/jquery-1.10.2.js"></script>
	<script src="js/hideshow.js" type="text/javascript"></script>
	<script src="js/jquery.tablesorter.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="js/jquery.equalHeight.js"></script>
	<script src="js/leaflet.js"></script>
	<script src="js/alert.js"></script>
	<script src="js/new.gtfs/stop_time.js"></script>
	<script type="text/javascript">
	$(document).ready(function() 
    	{ 
      	  $(".tablesorter").tablesorter(); 
      	  $(".validate_stop_sequence").keypress(validate_non_negative_integer);
      	  $(".validate_shape_dist_traveled").keypress(validate_non_negative_float);
   	 } 
	);
	$(document).ready(function() {

	//When page loads...
	$(".tab_content").hide(); //Hide all content
	$("ul.tabs li:first").addClass("active").show(); //Activate first tab
	$(".tab_content:first").show(); //Show first tab content

	//On Click Event
	$("ul.tabs li").click(on_tab_change);
	});

	function on_tab_change() {
		$("ul.tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".tab_content").hide(); //Hide all tab content

		var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		current_tab = activeTab;
		$(activeTab).fadeIn(); //Fade in the active ID content
		return false;
	}
	function change_to_tab_new() {
		$("ul.tabs li").removeClass("active"); //Remove any "active" class
		$("#tab_new").addClass("active"); //Add "active" class to "new" tab
		$(".tab_content").hide(); //Hide all tab content
		
		var activeTab = "#new";
		current_tab = activeTab;
		$(activeTab).fadeIn(); //Fade in the active ID content
		return false;
	}
    </script>
    <script type="text/javascript">
    $(function(){
        $('.column').equalHeight();
    });
</script>
<%
	AccountBean account = (AccountBean)session.getAttribute("account");
	String username = account.getUsername();
	String agency_id = account.getAgency_id();
	String city = account.getCity();
	double city_center_lat = account.getCity_center_lat();
	double city_center_lon = account.getCity_center_lon();
%>
</head>
<script>
//城市中心
var city_center_lat = "<%=city_center_lat%>";
var city_center_lon = "<%=city_center_lon%>";
</script>
<body>

 	<!-- common header -->
	<%@include file="Header.jsp"  %>
	
	<section id="secondary_bar">
		<div class="user">
			<p><%= username%> (<%= city%>)</p>
			<a class="logout_user" href="logout" title="Logout">Logout</a>
		</div>
		<div class="breadcrumbs_container">
			<article class="breadcrumbs"><a href="<%= mainPage%>">Admin Console</a>
			<div class="breadcrumb_divider"></div> <a href="NewIntroduction.jsp">New GTFS</a>
			<div class="breadcrumb_divider"></div> <a href="NewAgency.jsp">Agency</a>
			<div class="breadcrumb_divider"></div> <a href="NewCalendar.jsp">Calendar</a>
			<div class="breadcrumb_divider"></div> <a href="NewRoute.jsp">Route</a>
			<div class="breadcrumb_divider"></div> <a href="NewStop.jsp">Stop</a>
			<div class="breadcrumb_divider"></div> <a href="NewShape.jsp">Shape</a>
			<div class="breadcrumb_divider"></div> <a href="NewTrip.jsp">Trip</a>
			<div class="breadcrumb_divider"></div> <a class="current">StopTime</a>
			</article>
		</div>
	</section><!-- end of secondary bar -->
	
	<!-- common side bar -->
	<jsp:include page="Sidebar.jsp"/> 
	
	<section id="main" class="column">
		
		<h4 class="alert_info"><a href="https://developers.google.com/transit/gtfs/reference?csw=1#stop_times_fields" target="_blank">StopTime</a> - Times that a vehicle arrives at and departs from individual stops for each trip.</h4>
		
		<article class="module width_3_quarter">
		<header><h3 class="tabs_involved">New StopTime  <a href="javascript:show_detail_stop_time(&quot;usage&quot;)">(Usage)</a></h3>
		<ul class="tabs">			
			<li><a href="#map">Map</a></li>
   			<li id="tab_new"><a href="#new">New</a></li>
    		<li><a href="#list">List</a></li>
		</ul>
		</header>
		<div class="tab_container">
			<div id="map" class="tab_content" style="position:relative;">
				<div id="map_new_stop_time" style="width:100%; height:550px;"><script src="js/map/map.newstoptime.js"></script></div>
				<div style="width:25%; position: absolute; top:1%; left:75%;">
					<select id="map_route_id" data-placeholder="Choose a Route..." class="map_choose" style="width:95%;">
			            <option value=""></option>
	           		</select>
	           		<script type="text/javascript">
						load_routes();
					</script>
				</div><!-- end of chose route -->
				<div style="width:25%; position: absolute; top:7%; left:75%;">
					<select id="map_trip_id" data-placeholder="Choose a Trip..." class="map_choose" style="width:95%;">
			            <option value=""></option>
	           		</select>
				</div><!-- end of chose trip -->
			</div><!-- end of tab0 (map) -->
			
			<div id="new" class="tab_content" style="overflow:auto; height:550px">
				<fieldset style="width:48%; float:left;  margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Route ID <a href="javascript:show_detail_stop_time(&quot;route_id&quot;)">(Read More)</a></label>
					<input id="new_route_id" type="text" style="width:92%;" value="" disabled>
				</fieldset>
				<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Trip ID * <a href="javascript:show_detail_stop_time(&quot;trip_id&quot;)">(Read More)</a></label>
					<input id="new_trip_id" type="text" style="width:92%;" value="" disabled>
				</fieldset>
				<fieldset style="width:48%; float:left;  margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Stop ID * <a href="javascript:show_detail_stop_time(&quot;stop_id&quot;)">(Read More)</a></label>
					<input id="new_stop_id" type="text" style="width:92%;" value="" disabled>
				</fieldset>
				<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Stop Sequence * <a href="javascript:show_detail_stop_time(&quot;stop_sequence&quot;)">(Read More)</a></label>
					<input id="new_stop_sequence" type="text" class="validate_stop_sequence" style="width:92%;" value="" disabled>
				</fieldset>
				<fieldset style="width:48%; float:left;  margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Arrival Time *  <a href="javascript:show_detail_stop_time(&quot;arrival_time&quot;)">(Read More)</a></label>
					<input id="new_arrival_time" type="time" style="width:92%;" value="">
				</fieldset>
				<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Departure Time * <a href="javascript:show_detail_stop_time(&quot;departure_time&quot;)">(Read More)</a></label>
					<input id="new_departure_time" type="time" style="width:92%;" value="">
				</fieldset><div class="clear"></div>
				<fieldset style="width:48%; float:left;  margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Pickup Type <a href="javascript:show_detail_stop_time(&quot;pickup_type&quot;)">(Read More)</a></label>
					<div style="margin-left:10px;">
					<select id="new_pickup_type" data-placeholder="Choose a Pickup Type..." class="new_choose">
			            <option value="0">0 - Regularly scheduled pickup</option>
			            <option value="1">1 - No pickup available</option>
			            <option value="2">2 - Must phone agency to arrange pickup</option>
			            <option value="3">3 - Must coordinate with driver to arrange pickup</option>
					</select>
					</div>
				</fieldset>
				<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Drop off Type <a href="javascript:show_detail_stop_time(&quot;drop_off_type&quot;)">(Read More)</a></label>
					<div style="margin-left:10px;">
					<select id="new_drop_off_type" data-placeholder="Choose a Drop off Type..." class="new_choose">
			            <option value="0">0 - Regularly scheduled drop off</option>
			            <option value="1">1 - No drop off available</option>
			            <option value="2">2 - Must phone agency to arrange drop off</option>
			            <option value="3">3 - Must coordinate with driver to arrange drop off</option>
					</select>
					</div>
				</fieldset>
				<fieldset style="width:48%; float:left;  margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Stop Headsign <a href="javascript:show_detail_stop_time(&quot;stop_headsign&quot;)">(Read More)</a></label>
					<input id="new_stop_headsign" type="text" style="width:92%;" value="">
				</fieldset>
				<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Shape Traveled Distance <a href="javascript:show_detail_stop_time(&quot;shape_dist_traveled&quot;)">(Read More)</a></label>
					<input id="new_shape_dist_traveled" type="text" class="validate_shape_dist_traveled" style="width:92%;" value="">
				</fieldset>
				<div class="clear"></div>
				<div class="spacer"></div>
			</div><!-- end of #tab (new) -->
			
			<div id="list" class="tab_content" style="overflow:auto; height:550px">
			<fieldset style="width:95%; float:left;  margin-left: 2%; margin-right: 2%;">
					<div style="width: 40%; float:left; margin-left:10px;">
					<select id="list_route_id" data-placeholder="Choose a Route ID..." class="new_choose">
						<option value=""></option>
					</select>
					</div>
					<div style="width: 40%; float:left; margin-left:10px;">
					<select id="list_trip_id" data-placeholder="Choose a Trip ID..." class="new_choose">
						<option value=""></option>
					</select>
					</div>
					<input type="submit" class="alt_btn" value="Query" onclick="btn_query()">
					<input type="submit" value="Delete" onclick="btn_group_delete()">
			</fieldset>
			<table class="tablesorter"> 
			<thead> 
				<tr> 
    				<th>Actions</th> 
    				<th>Stop ID *</th> 
    				<th>Stop Sequence *</th> 
    				<th>Arrival Time *</th> 
    				<th>Departure Time *</th>
    				 <th>Pickup Type</th> 
    				<th>Drop off Type</th>
     				<th>Stop Headsign</th> 
    				<th>Shape Dist Traveled</th>
				</tr> 
			</thead> 
			<tbody id="table_list_stop_time">
			</tbody> 
			</table>

			</div><!-- end of #tab (list) -->
		</div><!-- end of .tab_container -->
		<footer>
				<div class="submit_link">
					<input type="submit" value="Save" class="alt_btn" onclick="btn_save()">
					<input type="submit" value="Complete" class="alt_btn" onclick="btn_complete()">
				</div>
		</footer>
		</article><!-- end of content manager article -->

		<div class="clear"></div>
		<div class="spacer"></div>
		<div class="spacer"></div>
		<div class="spacer"></div>
	</section>
	
<!-- alertify jquery plugin -->
<script src="js/alertify.min.js"></script>
<!-- chosen jquery plugin -->
<script src="js/chosen/chosen.jquery.min.js" type="text/javascript"></script>
<!-- ClockPicker script -->
<script type="text/javascript" src="js/clockpicker/jquery-clockpicker.min.js"></script>

<script type="text/javascript">
//很重要！把JSP Session中的agency_id拿出来,放在全局js中,用来标识正在操作的这些item属于哪个agency
var agency_id = "<%=agency_id%>";
	$(".map_choose").chosen({no_results_text: "Oops, nothing found!", allow_single_deselect: true});
	$(".new_choose").chosen({disable_search_threshold: 1000, allow_single_deselect: true});
	
	$("#map_route_id").on('change', function(evt, params) {
		if(params === undefined) {	//when user clears the selection (select nothing)
			$('#new_route_id').val('');	//clear route_id field in 'new' tab
			$('#map_trip_id').empty().trigger('chosen:updated');	//clear items in trip selection box
			stop_sequence = 0;	//reset stop sequence
			draw_stops_of_trip(null);
			draw_shapes_of_trip();	//get shapes for drawing line of this trip
		} else {
			$('#new_route_id').val(params.selected);
			load_trips_of_route(params.selected);
	    }
		$('#new_trip_id').val('');	//clear trip_id field in 'new' tab
		$('#new_stop_id').val('');	//clear stop_id field in 'new' tab
		$('#new_stop_sequence').val('');	//clear stop_sequence field in 'new' tab
		$('#new_arrival_time').val('');	//clear arrival_time field in 'new' tab
		$('#new_departure_time').val('');	//clear departure_time field in 'new' tab
	}); 
	
	$("#map_trip_id").on('change', function(evt, params) {
		var trip_id = null;
		if(params === undefined) {	//when user clears the selection (select nothing)
			$('#new_trip_id').val('');	//clear trip_id field in 'new' tab
		} else {
			trip_id = params.selected;
			$('#new_trip_id').val(trip_id);	//set value for trip_id field in 'new' tab
	    }
		stop_sequence = 0;	//reset stop sequence
		draw_stops_of_trip(trip_id);
		draw_shapes_of_trip();	//get shapes for drawing line of this trip
		$('#new_stop_id').val('');	//clear stop_id field in 'new' tab
		$('#new_stop_sequence').val('');	//clear stop_sequence field in 'new' tab
		$('#new_arrival_time').val('');	//clear arrival_time field in 'new' tab
		$('#new_departure_time').val('');	//clear departure_time field in 'new' tab
	});
	
	$("#list_route_id").on('change', function(evt, params) {
		if(params === undefined) {	//when user clears the selection (select nothing)
			$('#list_trip_id').empty().trigger('chosen:updated');	//clear items in stop selection box
		} else {
			load_trips_of_route(params.selected);
	    }
	}); 
</script>

</body>
</html>
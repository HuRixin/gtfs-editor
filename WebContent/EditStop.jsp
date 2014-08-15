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
	<!-- leaflet geocoder plugin -->
	<link rel="stylesheet" href="css/geocoder/Control.Geocoder.css" />
	<!-- for easy-button -->
	<link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
	
	<!--[if lt IE 9]>
	<link rel="stylesheet" href="css/ie.css" type="text/css" media="screen" />
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<script src="js/jquery-1.10.2.js"></script>
	<script src="js/hideshow.js" type="text/javascript"></script>
	<script src="js/jquery.tablesorter.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="js/jquery.equalHeight.js"></script>
	<script src="js/leaflet.js"></script>
	<script src="js/map/Control.Geocoder.js"></script>	
	<script src="js/map/easy-button.js"></script>
	<script src="js/alert.js"></script>
	<script src="js/edit.gtfs/stop.js"></script>
	
	<script type="text/javascript">
	$(document).ready(function() 
    	{ 
      	  $(".tablesorter").tablesorter();
		  $(".validate_stop_latlon").keypress(validate_number);
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
	function new_from_map(lat, lon) {
		$("ul.tabs li").removeClass("active"); //Remove any "active" class
		$("#tab_edit").addClass("active"); //Add "active" class to "new" tab
		$(".tab_content").hide(); //Hide all tab content
		
		var activeTab = "#edit";
		current_tab = activeTab;
		$(activeTab).fadeIn(); //Fade in the active ID content
		
		if(is_new_saved == false)
			// confirm dialog
			alertify.confirm("Current modifications have not been saved, continue?", function (e) {
			    if (e) {
			    	btn_reset();
					$("#edit_stop_lat").val(lat);
					$("#edit_stop_lon").val(lon);
					$("#edit_stop_desc").val(current_marker_addr);
					is_new_saved = false;
					alertify.log("Previous modifications have been dropped");
					new_stop_from_map = true;	//本次添加车站是通过地图点击的方式添加的
			    } else {
			    	alertify.log("Please save the current modifications first");
			    }
			});
		else {
			$("#edit_stop_lat").val(lat);
			$("#edit_stop_lon").val(lon);
			$("#edit_stop_desc").val(current_marker_addr);
			is_new_saved = false;
			new_stop_from_map = true;	//本次添加车站是通过地图点击的方式添加的
		}
		return false;
	}
	function change_to_tab_edit() {
		$("ul.tabs li").removeClass("active"); //Remove any "active" class
		$("#tab_edit").addClass("active"); //Add "active" class to "edit" tab
		$(".tab_content").hide(); //Hide all tab content

		var activeTab = "#edit";
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
<script>
//城市中心
var city_center_lat = "<%=city_center_lat%>";
var city_center_lon = "<%=city_center_lon%>";
</script>
</head>

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
			<div class="breadcrumb_divider"></div> <a href="EditIntroduction.jsp">Edit GTFS</a>
			<div class="breadcrumb_divider"></div> <a class="current">Stop</a></article>
		</div>
	</section><!-- end of secondary bar -->
	
	<!-- common side bar -->
	<jsp:include page="Sidebar.jsp"/> 
	
	<section id="main" class="column">
		
		<h4 class="alert_info"><a href="https://developers.google.com/transit/gtfs/reference?csw=1#stops_fields" target="_blank">Stop</a> - Individual locations where vehicles pick up or drop off passengers.</h4>
		
		<article class="module width_3_quarter">
		<header><h3 class="tabs_involved">Edit Stop <a href="javascript:show_detail_stop(&quot;usage&quot;)">(Usage)</a></h3>
		<ul class="tabs">
			<li><a href="#map">Map</a></li>
   			<li id="tab_edit"><a href="#edit">Edit</a></li>
    		<li><a href="#list">List</a></li>
		</ul>
		</header>

		<div class="tab_container">
			<div id="map" class="tab_content" style="overflow:auto; height:650px">
				<div id="map_edit_stop" style="width:100%; height:100%"><script src="js/map/map.editstop.js"></script></div>
			</div>
			<div id="edit" class="tab_content" style="overflow:auto; height:650px">
				<fieldset style="margin-left: 1%; margin-right: 2%;">
					<label>Stop ID * <a href="javascript:show_detail_stop(&quot;stop_id&quot;)">(Read More)</a></label>
					<input type="text" id="edit_stop_id" placeholder="e.g. S1" autofocus>
				</fieldset>
				<fieldset style="width:48%; float:left;  margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Stop Code <a href="javascript:show_detail_stop(&quot;stop_code&quot;)">(Read More)</a></label>
					<input type="text" id="edit_stop_code" style="width:92%;" value="" placeholder="e.g. pv202">
				</fieldset>
				<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Stop Name * <a href="javascript:show_detail_stop(&quot;stop_name&quot;)">(Read More)</a></label>
					<input type="text" id="edit_stop_name" style="width:92%;" value="" placeholder="e.g. Mission St. & Silver Ave.">
				</fieldset><div class="clear"></div>
				<fieldset style="margin-left: 1%; margin-right: 2%;">
					<label>Stop Description <a href="javascript:show_detail_stop(&quot;stop_desc&quot;)">(Read More)</a></label>
					<textarea rows="2" id="edit_stop_desc" placeholder="e.g. The stop is located at the southwest corner of the intersection."></textarea>
				</fieldset>
				<fieldset style="width:48%; float:left;  margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Stop Latitude * <a href="javascript:show_detail_stop(&quot;stop_lat&quot;)">(Read More)</a></label>
					<input type="text" id="edit_stop_lat" maxlength="10" class="validate_stop_latlon" style="width:92%;" value="" placeholder="e.g. 45.18601">
				</fieldset>
				<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Stop Longitude * <a href="javascript:show_detail_stop(&quot;stop_lon&quot;)">(Read More)</a></label>
					<input type="text" id="edit_stop_lon" maxlength="10" class="validate_stop_latlon" style="width:92%;" value="" placeholder="e.g. 9.15466">
				</fieldset><div class="clear"></div>
				<fieldset style="width:48%; float:left;  margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Zone ID <a href="javascript:show_detail_stop(&quot;zone_id&quot;)">(Read More)</a></label>
					<input type="text" id="edit_zone_id" style="width:92%;" value="">
				</fieldset>
				<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Stop Url <a href="javascript:show_detail_stop(&quot;stop_url&quot;)">(Read More)</a></label>
					<input type="text" id="edit_stop_url" style="width:92%;" value="" placeholder="e.g. http://www.thefunbus.org">
				</fieldset><div class="clear"></div>
				<fieldset style="width:48%; float:left;  margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Location Type <a href="javascript:show_detail_stop(&quot;location_type&quot;)">(Read More)</a></label>
					<div style="margin-left:10px;">
					<select id="edit_location_type" data-placeholder="Choose a Location Type..." class="stop_options">
						<option value=""></option>
						<option value="0">0 or blank - Stop</option>
						<option value="1">1 - Station</option>
					</select>
					</div>
				</fieldset>
				<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Parent Station <a href="javascript:show_detail_stop(&quot;parent_station&quot;)">(Read More)</a></label>
					<div style="margin-left:10px;">
					<select id="edit_parent_station" data-placeholder="Choose a Location Type..." class="stop_options">
						<option value=""></option>
						<option value="0">0 or blank - Stop</option>
						<option value="1">1 - Station</option>
					</select>
					</div>
				</fieldset><div class="clear"></div>
				<fieldset style="width:48%; float:left;  margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Stop Timezone <a href="javascript:show_detail_stop(&quot;stop_timezone&quot;)">(Read More)</a></label>
					<div style="margin-left:10px;">
					<select id="edit_stop_timezone" data-placeholder="Choose a Timezone..." class="stop_options">
					<!-- timezones -->
					<script src="Timezones.js"></script>
					</select>
					</div> 
				</fieldset>
				<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Wheelchair Boarding <a href="javascript:show_detail_stop(&quot;wheelchair_boarding&quot;)">(Read More)</a></label>
					<div style="margin-left:10px;">
					<select id="edit_wheelchair_boarding" data-placeholder="Choose a Location Type..." class="stop_options">
						<option value=""></option>
						<option value="0">0 (or empty) - indicates that there is no accessibility information for the stop</option>
						<option value="1">1 - indicates that at least some vehicles at this stop can be boarded by a rider in a wheelchair</option>
						<option value="2">2 - wheelchair boarding is not possible at this stop</option>
					</select>
					</div>
				</fieldset><div class="clear"></div>
				<div class="clear"></div>
				<div class="spacer"></div>
			</div><!-- end of #tab (new) -->
			
			<div id="list" class="tab_content" style="overflow:auto; height:650px">
			<table class="tablesorter"> 
			<thead> 
				<tr> 
					<th>Actions</th> 
   					<th>Stop ID *</th> 
    				<th>Code</th> 
    				<th>Name *</th> 
    				<th>Description</th> 
    				<th>Latitude *</th>
    				<th>Longitude*</th> 
    				<th>Zone ID</th>
    				<th>Url</th> 
    				<th>Location Type</th> 
    				<th>Parent Station</th>
    				<th>Timezone</th> 
    				<th>Wheelchair Boarding</th>   				
				</tr> 
			</thead> 
			<tbody id="table_list_stop"> 
			</tbody> 
			</table>
			<script type="text/javascript">list_stop();</script>

			</div><!-- end of #tab (list) -->
		</div><!-- end of .tab_container -->
		<footer>
				<div class="submit_link">
					<input type="submit" value="Save" class="alt_btn" onclick="btn_save()">
					<input type="submit" value="Reset" onclick="btn_reset()">
					<input type="submit" value="Back" onclick="btn_back()">
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
<script type="text/javascript">
//很重要！把JSP Session中的agency_id拿出来,放在全局js中,用来标识正在操作的这些item属于哪个agency
var agency_id = "<%=agency_id%>";

	$(".stop_options").chosen({
		disable_search_threshold: 1000,
		allow_single_deselect: true
	});
</script>
</body>

</html>
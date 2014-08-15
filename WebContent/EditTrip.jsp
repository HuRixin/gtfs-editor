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
	<script src="js/edit.gtfs/trip.js"></script>
	
	<script type="text/javascript">
	$(document).ready(function() 
    	{ 
      	  $(".tablesorter").tablesorter(); 
      	
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
%>
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
			<div class="breadcrumb_divider"></div> <a class="current">Trip</a>
			</article>
		</div>
	</section><!-- end of secondary bar -->
	
	<!-- common side bar -->
	<jsp:include page="Sidebar.jsp"/> 
	
	<section id="main" class="column">
		
		<h4 class="alert_info"><a href="https://developers.google.com/transit/gtfs/reference?csw=1#trips_fields" target="_blank">Trip</a> - Trips for each route. A trip is a sequence of two or more stops that occurs at specific time.</h4>
		
		<article class="module width_3_quarter">
		<header><h3 class="tabs_involved">Edit Trip</h3>
		<ul class="tabs">
			<li><a href="#list">List</a></li>
   			<li id="tab_edit"><a href="#edit">Edit</a></li>
		</ul>
		</header>

		<div class="tab_container">
		<div id="list" class="tab_content" style="overflow:auto; height:500px">
				<fieldset style="width:95%; float:left;  margin-left: 2%; margin-right: 2%;">
					<div style="width: 40%; float:left; margin-left:10px;">
					<select id="list_route_id" data-placeholder="Choose a Route ID..." class="choose_list">
						<option value=""></option>
					</select>
					</div>
					<div style="width: 40%; float:left; margin-left:10px;">
					<select id="list_service_id" data-placeholder="Choose a Service ID..." class="choose_list">
						<option value=""></option>
					</select>
					</div>
					<input type="submit" class="alt_btn" value="Query" onclick="btn_query()">
					<input type="submit" value="Delete" onclick="btn_delete_all()">
			</fieldset>
			<table class="tablesorter"> 
			<thead> 
				<tr> 
				    <th>Actions</th> 
   					<th>Trip ID *</th> 
    				<th>Headsign</th> 
    				<th>Short Name</th>
    				<th>Direction ID</th> 
    				<th>Block ID</th>
    				<th>Shape ID</th>
    				<th>Wheelchair Accessible</th>
    				<th>Bikes Allowed</th>
				</tr> 
			</thead> 
			<tbody id='table_list_trip'>
			</tbody> 
			</table>
			</div><!-- end of #tab1 -->
			
			<div id="edit" class="tab_content" style="overflow:auto; height:500px">
						<fieldset style="width:48%; float:left;  margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
							<label>Trip ID * <a href="javascript:show_detail_trip(&quot;trip_id&quot;)">(Read More)</a></label>
							<input id="edit_trip_id" type="text" style="width:92%;" value="" placeholder="e.g. AWE1">
						</fieldset>
						<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
							<label>Route ID * <a href="javascript:show_detail_trip(&quot;route_id&quot;)">(Read More)</a></label>
							<div style="margin-left:10px;">
							<select id="edit_route_id" data-placeholder="Choose a Route ID..." class="choose_list">
					            <option value=""></option>
							</select>
							</div>
						</fieldset>
						<fieldset style="width:48%; float:left; margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
							<label>Service ID * <a href="javascript:show_detail_trip(&quot;service_id&quot;)">(Read More)</a></label>
							<div style="margin-left:10px;">
							<select id="edit_service_id" data-placeholder="Choose a Service ID..." class="choose_list">
					            <option value=""></option>
							</select>
							</div>
						</fieldset>
						<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
							<label>Trip Headsign <a href="javascript:show_detail_trip(&quot;trip_headsign&quot;)">(Read More)</a></label>
							<input id="edit_trip_headsign" type="text" style="width:92%;" placeholder="e.g. Downtown">
						</fieldset>
						<fieldset style="width:48%; float:left; margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
							<label>Trip Short Name <a href="javascript:show_detail_trip(&quot;trip_short_name&quot;)">(Read More)</a></label>
							<input id="edit_trip_short_name" type="text" style="width:92%;">
						</fieldset>
						<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
							<label>Direction ID <a href="javascript:show_detail_trip(&quot;direction_id&quot;)">(Read More)</a></label>
							<div style="margin-left:10px;">
							<select id="edit_direction_id" data-placeholder="Choose a Direction ID..." class="choose_list">
					            <option value=""></option>
					            <option value="0">0 - travel in one direction (e.g. outbound travel)</option>
					            <option value="1">1 - travel in the opposite direction (e.g. inbound travel)</option>
							</select>
							</div>
						</fieldset>
						<fieldset style="width:48%; float:left; margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
							<label>Block ID <a href="javascript:show_detail_trip(&quot;block_id&quot;)">(Read More)</a></label>
							<input id="edit_block_id" type="text" style="width:92%;" placeholder="e.g. 1">
						</fieldset>
						<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
							<label>Shape ID <a href="javascript:show_detail_trip(&quot;shape_id&quot;)">(Read More)</a></label>
							<input id="edit_shape_id" type="text" style="width:92%;" disabled>
						</fieldset>
						<div class="clear"></div>
						<fieldset style="width:48%; float:left; margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
							<label>Wheelchair Accessible <a href="javascript:show_detail_trip(&quot;wheelchair_accessible&quot;)">(Read More)</a></label>
							<div style="margin-left:10px;">
							<select id="edit_wheelchair_accessible" data-placeholder="Choose wheelchair accessibility..." class="choose_list">
					            <option value=""></option>
					            <option value="0">0 - indicates that there is no accessibility information for the trip</option>
					            <option value="1">1 - indicates that the vehicle being used on this particular trip can accommodate at least one rider in a wheelchair</option>
								<option value="2">2 - indicates that no riders in wheelchairs can be accommodated on this trip</option>
							</select>
							</div>
						</fieldset>
						<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
							<label>Bikes Allowed <a href="javascript:show_detail_trip(&quot;bikes_allowed&quot;)">(Read More)</a></label>
							<div style="margin-left:10px;">
							<select id="edit_bikes_allowed" data-placeholder="Bikes allowed..." class="choose_list">
					            <option value=""></option>
					            <option value="0">0 - indicates that there is no bike information for the trip</option>
					            <option value="1">1 - indicates that the vehicle being used on this particular trip can accommodate at least one bicycle</option>
								<option value="2">2 - indicates that no bicycles are allowed on this trip</option>
							</select>
							</div>
						</fieldset>
						<div class="clear"></div>
			</div><!-- end of #tab2 -->
			
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
//加载 route 和 calendar
load_routes();
load_calendar();

$(".choose_list").chosen({
	allow_single_deselect: true,
	disable_search_threshold: 1000
});
$("#edit_route_id").on('change', function(evt, params) {
	if(params === undefined) {	//when user clears the selection (select nothing)
		$("#edit_shape_id").val('');
		return;
	} else if(params.selected != "" && $("#edit_service_id").val() != "")
    	$("#edit_shape_id").val(params.selected + '##' + $("#edit_service_id").val());
});

$("#edit_service_id").on('change', function(evt, params) {
	if(params === undefined) {	//when user clears the selection (select nothing)
		$("#edit_shape_id").val('');
		return;
	} else if(params.selected != "" && $("#edit_route_id").val() != "")
    	$("#edit_shape_id").val($("#edit_route_id").val() + '##' + params.selected);
});

$("#list_route_id").on('change', function(evt, params) {
	document.getElementById("table_list_trip").innerHTML = "";
});

$("#list_service_id").on('change', function(evt, params) {
	document.getElementById("table_list_trip").innerHTML = "";
});
</script>
</body>

</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<%@page import="irma.rt.edit.bean.AccountBean" %>
<title>Public Transit Open Data Edit Platform</title>
	<link rel="stylesheet" href="css/layout.css" type="text/css" media="screen" />
	<!-- <link rel="stylesheet" href="css/leaflet.css" /> -->
	<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
	<!-- alertify jquery plugin -->
	<link rel="stylesheet" href="css/alertify.core.css" />
	<link rel="stylesheet" href="css/alertify.default.css" />
	<!-- chosen jquery plugin -->
	<link rel="stylesheet" href="css/chosen/chosen.min.css" />
	<!-- leaflet routing machine -->
	<link rel="stylesheet" href="css/routing-machine/leaflet-routing-machine.css" />
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
	<!-- <script src="js/leaflet.js"></script> -->
	<script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
	<script src="js/map/leaflet-routing-machine.min.js"></script> <!-- automatically generate shapes -->
	<script src="js/map/leaflet-editable-polyline.js"></script>		<!-- manually generate shapes -->
	<script src="js/alert.js"></script>
	<script src="js/edit.gtfs/shape.js"></script>
	
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
	$("ul.tabs li").click(function() {

		$("ul.tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".tab_content").hide(); //Hide all tab content

		var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		current_tab = activeTab;
		$(activeTab).fadeIn(); //Fade in the active ID content
		return false;
	});
	});
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
			<div class="breadcrumb_divider"></div> <a class="current">Shape</a>
			</article>
		</div>
	</section><!-- end of secondary bar -->
	
	<!-- common side bar -->
	<jsp:include page="Sidebar.jsp"/> 
	
	<section id="main" class="column">
		
		<h4 class="alert_info"><a href="https://developers.google.com/transit/gtfs/reference?csw=1#shapes_fields" target="_blank">Shape</a> - Rules for drawing lines on a map to represent a transit organization's routes.</h4>
		
		<article class="module width_3_quarter">
		<header><h3 class="tabs_involved">Edit Shape  <a href="javascript:show_detail_shape(&quot;usage&quot;)">(Usage)</a></h3>
		<ul class="tabs">
			<li><a href="#edit">Edit</a></li>
			<li><a href="#new">New</a></li>
    		<li><a href="#list">List</a></li>
		</ul>
		</header>
		<div class="tab_container">
		<div id="edit" class="tab_content" style="position:relative;">
				<!-- Map container -->
				<div style="width:100%; height:550px;">
					<div id="map_edit" style="width:100%; height:550px"><script src="js/map/map.editshape.edit.js"></script></div>
				</div>
				<!-- Choose a Route -->
				<div style="width:25%; position: absolute; top:1%; left:75%;">
					<select id="edit_route_id" data-placeholder="Choose a Route..." class="choose_edit" style="width:95%;">
			            <option value=""></option>
	           		 </select>
				</div><!-- end of choose route -->
				<!-- Choose a Service -->
				<div style="width:25%; position: absolute; top:7%; left:75%;">
					<select id="edit_service_id" data-placeholder="Choose a Calendar..." class="choose_edit" style="width:95%;">
	           			<option value=""></option>
	           		</select>
				</div><!-- end of chose trip -->
			</div><!-- end of tab0 (edit) -->
			
		<div id="new" class="tab_content" style="position:relative;">
				<!-- Map container -->
				<div style="width:100%; height:550px;">
					<div id="map_new" style="width:100%; height:550px"><script src="js/map/map.editshape.new.js"></script></div>
				</div>
				<!-- Choose a Route -->
				<div style="width:25%; position: absolute; top:1%; left:75%;">
					<select id="new_route_id" data-placeholder="Choose a Route..." class="choose_edit" style="width:95%;">
			            <option value=""></option>
	           		 </select>
				</div><!-- end of choose route -->
				<!-- Choose a Calendar -->
				<div style="width:25%; position: absolute; top:7%; left:75%;">
					<select id="new_service_id" data-placeholder="Choose a Calendar..." class="choose_edit" style="width:95%;" multiple>
	           		 </select>
				</div><!-- end of chose calendar -->
			</div><!-- end of tab1 (new) -->
			
			<div id="list" class="tab_content" style="overflow:auto; height:550px">
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
					<input type="submit" value="Delete" onclick="btn_delete()">
			</fieldset>
			<table class="tablesorter"> 
			<thead> 
				<tr> 
   					<th>Shape ID *</th> 
    				<th>Latitude *</th> 
    				<th>Longitude *</th> 
    				<th>Sequence *</th> 
    				<th>Distance Traveled</th>
				</tr> 
			</thead> 
			<tbody id="table_list_shape"> 
			</tbody> 
			</table>
			</div><!-- end of #tab (list) -->
		</div><!-- end of .tab_container -->
		<footer>
				<div class="submit_link">
					<input type="submit" value="Save" class="alt_btn" onclick="btn_save()">
					<input type="submit" value="Finish" onclick="btn_finish()">
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

$(".choose_edit").chosen({
	allow_single_deselect: true,
	no_results_text: "Oops, nothing found!"
});

$(".choose_list").chosen({
	allow_single_deselect: true,
	disable_search_threshold: 1000,
});

$("#new_route_id").on('change', function(evt, params) {
	if(params === undefined) {	//when user clears the selection (select nothing)
    	return;
	} else if(params.selected != "" && $('#new_service_id').val() != null && $('#new_service_id').val() != "") {
		for(var i=0; i<$('#new_service_id').val().length; i++)
			check_shape_existence(params.selected + "##" + $('#new_service_id').val()[i]);
	}
}); 

$("#new_service_id").on('change', function(evt, params) {
	if($('#new_service_id').val() == null) {	//when user clears the selection (select nothing)
    	return;
	} else if(params.selected != "" && $('#new_route_id').val() != "") {
		for(var i=0; i<$('#new_service_id').val().length; i++)
			check_shape_existence($('#new_route_id').val() + "##" + $('#new_service_id').val()[i]);
    }
}); 

$("#edit_route_id").on('change', function(evt, params) {
	if(params === undefined) {	//when user clears the selection (select nothing)
		clear_map();
	} else if(params.selected != "" && $('#edit_service_id').val() != null && $('#edit_service_id').val() != "") {
		clear_map();
		load_shape(params.selected + "##" + $('#edit_service_id').val());
		load_stop_of_shape(params.selected + "##" + $('#edit_service_id').val());
	}
}); 

$("#edit_service_id").on('change', function(evt, params) {
	if(params === undefined) {	//when user clears the selection (select nothing)
		clear_map();
	} else if(params.selected != "" && $('#edit_route_id').val() != null && $('#edit_route_id').val() != "") {
		clear_map();
		load_shape($('#edit_route_id').val() + "##" + $('#edit_service_id').val());
		load_stop_of_shape($('#edit_route_id').val() + "##" + $('#edit_service_id').val());
    }
}); 
</script>
</body>

</html>
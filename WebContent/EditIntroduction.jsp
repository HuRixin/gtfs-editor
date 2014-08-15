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
	<!--[if lt IE 9]>
	<link rel="stylesheet" href="css/ie.css" type="text/css" media="screen" />
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<script src="js/jquery-1.10.2.js"></script>
	<script src="js/hideshow.js" type="text/javascript"></script>
	<script src="js/jquery.tablesorter.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="js/jquery.equalHeight.js"></script>
	<script src="js/leaflet.js"></script>
	
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
			<article class="breadcrumbs"><a href="main.jsp">Admin Console</a>
			<div class="breadcrumb_divider"></div> <a class="current">Edit GTFS</a></article>
		</div>
	</section><!-- end of secondary bar -->
	
	<!-- common side bar -->
	<jsp:include page="Sidebar.jsp"/>
	
	<section id="main" class="column">
		
		<div id="message"></div>


		<h4 class='alert_info'>Welcome to the Edit GTFS Wizard, please choose a GTFS file in the list to edit.</h4>

		
		<article class="module width_full">
			<header><h3>Guideline</h3></header>
				<div class="module_content">
					<img src="images/train-banner.jpg"  alt="" style="height:300px; width:940px;" align="middle"/>
					<h3>I. Choose a file to edit</h3>
					<ol>
						<li><a href="EditAgency.jsp"><b>Agency</b></a> - One or more transit agencies that provide the data in this feed.</li>
						<li><a href="EditCalendar.jsp"><b>Calendar</b></a> - Dates for service IDs using a weekly schedule. Specify when service starts and ends, as well as days of the week where service is available.</li>
						<li><a href="EditRoute.jsp"><b>Route</b></a> - Transit routes. A route is a group of trips that are displayed to riders as a single service.</li>
						<li><a href="EditStop.jsp"><b>Stop</b></a> - Individual locations where vehicles pick up or drop off passengers.</li>
						<li><a href="EditShape.jsp"><b>Shape</b></a> - Rules for drawing lines on a map to represent a transit organization's routes.</li>
						<li><a href="EditTrip.jsp"><b>Trip</b></a> - Trips for each route. A trip is a sequence of two or more stops that occurs at specific time.</li>
						<li><a href="EditStopTime.jsp"><b>StopTime</b></a> - Times that a vehicle arrives at and departs from individual stops for each trip.</li>
					</ol>
				</div>
		</article><!-- end of styles article -->
		<div class="spacer"></div>
	</section>
	
<!-- alertify jquery plugin -->
<script src="js/alertify.min.js"></script>
</body>

</html>
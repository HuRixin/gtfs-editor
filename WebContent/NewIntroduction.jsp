<%@page import="irma.rt.edit.dao.DataAccessUtil"%>
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
	<script type="text/javascript" src="js/jquery.equalHeight.js"></script>
	<script src="js/leaflet.js"></script>
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
	Boolean existed = DataAccessUtil.existedAgency(agency_id);
	Boolean creationFinished = (Boolean)session.getAttribute("creationFinished");
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
			<div class="breadcrumb_divider"></div> <a class="current">New GTFS</a></article>
		</div>
	</section><!-- end of secondary bar -->
	
	<!-- common side bar -->
	<jsp:include page="Sidebar.jsp"/>
	
	<section id="main" class="column">
		
		<div id="message"></div>

		<%
			if(creationFinished == null || creationFinished == false)
				out.print("<h4 class='alert_info'>Welcome to the New GTFS Wizard, please follow the instructions bellow to generate a new GTFS for your city step by step.</h4>");
			else
				out.print("<h4 class='alert_success'>GTFS creation complete! Now you can <a href='EditIntroduction.jsp'>EDIT</a> or <a href='export'>EXPORT</a> GTFS.</h4>");
		%>
		
		<article class="module width_full">
			<header><h3>Guideline</h3></header>
				<div class="module_content">
					<h1 style="text-align: center">New GTFS Wizard</h1>
					
					<h3>I. What is GTFS?</h3>
					<p>The General Transit Feed Specification (GTFS) defines a common format for public transportation schedules and associated geographic information. GTFS "feeds" allow public transit agencies to publish their transit data and developers to write applications that consume that data in an interoperable way.</p>
					
					<h3>II. Steps to create new GTFS</h3>
					<ol>
						<li><a href="NewAgency.jsp">Agency</a> - One or more transit agencies that provide the data in this feed.</li>
						<li><a href="NewCalendar.jsp">Calendar</a> - Dates for service IDs using a weekly schedule. Specify when service starts and ends, as well as days of the week where service is available.</li>
						<li><a href="NewRoute.jsp">Route</a> - Transit routes. A route is a group of trips that are displayed to riders as a single service.</li>
						<li><a href="NewStop.jsp">Stop</a> - Individual locations where vehicles pick up or drop off passengers.</li>
						<li><a href="NewShape.jsp">Shape</a> - Rules for drawing lines on a map to represent a transit organization's routes.</li>
						<li><a href="NewTrip.jsp">Trip</a> - Trips for each route. A trip is a sequence of two or more stops that occurs at specific time.</li>
						<li><a href="NewStopTime.jsp">StopTime</a> - Times that a vehicle arrives at and departs from individual stops for each trip.</li>
					</ol>
					
					<h3>III. GTFS examples</h3>
					<div style="height:200px; overflow-y: auto">
					<h4>agency.txt</h4>
					<p style="color:green">
					agency_id, agency_name,agency_url,agency_timezone,agency_phone,agency_lang<br>
					FunBus,The Fun Bus,http://www.thefunbus.org,America/Los_Angeles,(310) 555-0222,en
					</p><hr>
					
					<h4>calendar.txt</h4>
					<p style="color:green">
					service_id,monday,tuesday,wednesday,thursday,friday,saturday,sunday,start_date,end_date<br>
					WE,0,0,0,0,0,1,1,20060701,20060731<br>
					WD,1,1,1,1,1,0,0,20060701,20060731
					</p><hr>
					
					<h4>routes.txt</h4>
					<p style="color:green">
					route_id,route_short_name,route_long_name,route_desc,route_type<br>
					A,17,Mission,"The ""A"" route travels from lower Mission to Downtown.",3
					</p><hr>
					
					<h4>stops.txt</h4>
					<p style="color:green">
					stop_id,stop_name,stop_desc,stop_lat,stop_lon,stop_url,location_type,parent_station<br>
					S1,Mission St. & Silver Ave.,The stop is located at the southwest corner of the intersection.,37.728631,-122.431282,,,<br>
					S2,Mission St. & Cortland Ave.,The stop is located 20 feet south of Mission St.,37.74103,-122.422482,,,<br>
					S3,Mission St. & 24th St.,The stop is located at the southwest corner of the intersection.,37.75223,-122.418581,,,<br>
					S4,Mission St. & 21st St.,The stop is located at the northwest corner of the intersection.,37.75713,-122.418982,,,<br>
					S5,Mission St. & 18th St.,The stop is located 25 feet west of 18th St.,37.761829,-122.419382,,,<br>
					S6,Mission St. & 15th St.,The stop is located 10 feet north of Mission St.,37.766629,-122.419782,,,<br>
					S7,24th St. Mission Station,,37.752240,-122.418450,,,S8<br>
					S8,24th St. Mission Station,,37.752240,-122.418450,http://www.bart.gov/stations/stationguide/stationoverview_24st.asp,1, <br>
					</p><hr>
					
					<h4>shapes.txt</h4>
					<p style="color:green">
					shape_id,shape_pt_lat,shape_pt_lon,shape_pt_sequence,shape_dist_traveled<br>
					A_shp,37.61956,-122.48161,1,0<br>
					A_shp,37.64430,-122.41070,2,6.8310<br>
					A_shp,37.65863,-122.30839,3,15.8765
					</p><hr>
					
					<h4>trips.txt</h4>
					<p style="color:green">
					route_id,service_id,trip_id,trip_headsign,block_id<br>
					A,WE,AWE1,Downtown,1<br>
					A,WE,AWE2,Downtown,2
					</p><hr>
					
					<h4>stop_times.txt</h4>
					<p style="color:green">
					trip_id,arrival_time,departure_time,stop_id,stop_sequence,pickup_type,drop_off_type<br>
					AWE1,0:06:10,0:06:10,S1,1,0,0,0<br>
					AWE1,,,S2,2,0,1,3<br>
					AWE1,0:06:20,0:06:30,S3,3,0,0,0<br>
					AWE1,,,S5,4,0,0,0<br>
					AWE1,0:06:45,0:06:45,S6,5,0,0,0<br>
					AWD1,0:06:10,0:06:10,S1,1,0,0,0<br>
					AWD1,,,S2,2,0,0,0<br>
					AWD1,0:06:20,0:06:20,S3,3,0,0,0<br>
					AWD1,,,S4,4,0,0,0<br>
					AWD1,,,S5,5,0,0,0<br>
					AWD1,0:06:45,0:06:45,S6,6,0,0,0
					</p><hr>
					</div>
				</div>
			<footer>
				<div class="submit_link">
					<input type="submit" value="GO" class="alt_btn" onclick="window.location.href='NewAgency.jsp'">
				</div>
			</footer>
		</article><!-- end of styles article -->
		<div class="spacer"></div>
	</section>
<!-- alertify jquery plugin -->
<script src="js/alertify.min.js"></script>
<script>
var agency_id = "<%=agency_id%>";
	var s = "<%=existed%>";
	var creationFinished = "<%=creationFinished%>";
	//check agency_id, if there already existed such an agency, we suppose that means there existed a copy of GTFS files
  	if(creationFinished != "true" && s == 'true') {
			// confirm dialog
			alertify.confirm("GTFS already existed, are you sure to remove all and create a new set ? <br>(It's better to backup/export the current GTFS before you do this.)", function (e) {
			    if (e) {
			        // user clicked "ok", web service call to remove all items related to this agency_id
			    	$.ajax({
			    		//因为每个表都是连接到agency的, 级联删除, 所以只需要删除agency即可删除所有与之关联的gtfs
			    		url: "/IRMA_RT_EDIT/service/gtfs/edit/delete/agency",
			    		type: "POST",
			    		data: agency_id,
			    		dataType: 'html',
			    		success: function (data) {
			    		}
			    	}).fail(function (data, textStatus, errorThrown) {
			    		alertify.error("Something unknown happened :(");
			    	});
			    } else {
			    	window.location.href = "main.jsp";
			    }
			});
	} 
</script>
</body>

</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<%@page import="irma.rt.edit.bean.AccountBean" %>
<title>Public Transit Open Data Edit Platform</title>
	<link rel="stylesheet" href="css/layout.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="css/leaflet.css" />
	<!-- pickadate jquery plugin -->
 	<link rel="stylesheet" href="css/pickadate/classic.css" />
 	<link rel="stylesheet" href="css/pickadate/classic.date.css" />
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
	<script src="js/alert.js"></script>
	<script src="js/edit.gtfs/calendar.js"></script>
	
	<script type="text/javascript">
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
				<div class="breadcrumb_divider"></div> <a class="current">Calendar</a>
			</article>
		</div>
	</section><!-- end of secondary bar -->
	
	<!-- common side bar -->
	<jsp:include page="Sidebar.jsp"/> 
	
	<section id="main" class="column">
		
		<h4 class="alert_info"><a href="https://developers.google.com/transit/gtfs/reference?csw=1#calendar_fields" title="GTFS Reference - Calendar" target="_blank">Calendar</a> - Dates for service IDs using a weekly schedule. Specify when service starts and ends, as well as days of the week where service is available.</h4>

		<article class="module width_3_quarter">
		<header><h3 class="tabs_involved">Edit Calendar</h3>
		<ul class="tabs">
   			<li><a href="#list">List</a></li>
    		<li id="tab_edit"><a href="#edit">Edit</a></li>
		</ul>
		</header>
		<div class="tab_container">
			<div id="list" class="tab_content" style="overflow:auto; height:400px">
			<table class="tablesorter"> 
			<thead> 
				<tr> 
					<th>Actions</th> 
   					<th>Service ID *</th> 
    				<th>Start Date *</th> 
    				<th>End Date *</th> 
    				<th>Monday *</th> 
    				<th>Tuesday *</th>
    				<th>Wednesday *</th> 
    				<th>Thursday *</th>
    				<th>Friday *</th> 
    				<th>Saturday *</th> 
    				<th>Sunday *</th>
				</tr> 
			</thead> 
			<tbody id="table_list_calendar"> 
			</tbody> 
			</table>
			<script type="text/javascript">list_calendar();</script>
			</div><!-- end of #tab (list) -->
		
			<div id="edit" class="tab_content" style="overflow:auto; height:400px">
				<fieldset style="margin-left: 1%; margin-right: 2%;">
					<label>Service ID * <a href="javascript:show_detail_calendar(&quot;service_id&quot;)">(Read More)</a></label>
					<input type="text" id="edit_service_id" placeholder="e.g. Weekday" autofocus>
				</fieldset>
				<fieldset style="width:48%; float:left;  margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Start Date * <a href="javascript:show_detail_calendar(&quot;start_date&quot;)">(Read More)</a></label>
					<input type="text" id="edit_start_date" style="width:92%;" value="" placeholder="e.g. 20060701" readonly>
				</fieldset>
				<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>End Date * <a href="javascript:show_detail_calendar(&quot;end_date&quot;)">(Read More)</a></label>
					<input type="text" id="edit_end_date" style="width:92%;" value="" placeholder="e.g. 20060731" readonly>
				</fieldset>
				<div class="clear"></div>
				<div class="spacer"></div>
				<table class="tablesorter"> 
				<thead>
					<tr>
						<th><a href="javascript:show_detail_calendar(&quot;day_of_week&quot;)">Day of Week</a></th>
						<th>Monday *</th>
						<th>Tuesday *</th>
						<th>Wednesday *</th>
						<th>Thursday *</th>
						<th>Friday *</th>
						<th>Saturday *</th>
						<th>Sunday *</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Available</td>
						<td><input id="edit_monday_av" name="Monday" type="radio" value="1"></td>
						<td><input id="edit_tuesday_av" name="Tuesday" type="radio" value="1"></td>
						<td><input id="edit_wednesday_av" name="Wednesday" type="radio" value="1"></td>
						<td><input id="edit_thursday_av" name="Thursday" type="radio" value="1"></td>
						<td><input id="edit_friday_av" name="Friday" type="radio" value="1"></td>
						<td><input id="edit_saturday_av" name="Saturday" type="radio" value="1"></td>
						<td><input id="edit_sunday_av" name="Sunday" type="radio" value="1"></td>
					</tr>
					<tr>
						<td>Not Available</td>
						<td><input id="edit_monday_nav" name="Monday" type="radio" value="0"></td>
						<td><input id="edit_tuesday_nav" name="Tuesday" type="radio" value="0"></td>
						<td><input id="edit_wednesday_nav" name="Wednesday" type="radio" value="0"></td>
						<td><input id="edit_thursday_nav" name="Thursday" type="radio" value="0"></td>
						<td><input id="edit_friday_nav" name="Friday" type="radio" value="0"></td>
						<td><input id="edit_saturday_nav" name="Saturday" type="radio" value="0"></td>
						<td><input id="edit_sunday_nav" name="Sunday" type="radio" value="0"></td>
					</tr>
				</tbody>
				</table>
				<div class="clear"></div>
			</div><!-- end of #tab (edit) -->
			
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
<!-- alertify jquery plugin (v0.3.11)-->
<script src="js/alertify.min.js"></script>
<!-- pick a date jquery plugin (v3.5.2)-->
<script src="js/pickadate/legacy.js"></script>
<script src="js/pickadate/picker.js"></script>
<script src="js/pickadate/picker.date.js"></script>
<script type="text/javascript">
//很重要！把JSP Session中的agency_id拿出来,放在全局js中,用来标识正在操作的这些item属于哪个agency
var agency_id = "<%=agency_id%>";
       $( '#edit_start_date' ).pickadate({ format: 'yyyymmdd' });
       $( '#edit_end_date' ).pickadate({ format: 'yyyymmdd' });
 </script>
</body>

</html>
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
	<script type="text/javascript" src="js/jquery.equalHeight.js"></script>
	<script src="js/leaflet.js"></script>
	<script src="js/alert.js"></script>
	<script src="js/account.js"></script>
	
    <script type="text/javascript">
    $(function(){
        $('.column').equalHeight();
        $(".validate_coordinate").keypress(validate_number);
    });
</script>
<%
	AccountBean account = (AccountBean)session.getAttribute("account");
	String username = account.getUsername();
	String agency_id = account.getAgency_id();
	String country = account.getCountry();
	String city = account.getCity();
	double city_center_lat = account.getCity_center_lat();
	double city_center_lon = account.getCity_center_lon();
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
				<div class="breadcrumb_divider"></div> <a class="current">Account</a>
			</article>
		</div>
	</section><!-- end of secondary bar -->
	
	<!-- common side bar -->
	<jsp:include page="Sidebar.jsp"/> 
	
	<section id="main" class="column">
		
		<h4 class="alert_info">Account - you can update account information here.</h4>
		
		<article class="module width_3_quarter">
		<header><h3 class="tabs_involved">Edit Account</h3>
		</header>

		<div class="tab_container">
			<form id="form_edit_agency">
						<fieldset style="width:48%; float:left;  margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
							<label>User Name *</label>
							<input id="username" type="text" style="width:92%;" value="<%= username%>" readonly>
						</fieldset>
						<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
 							<label>Agency ID *</label>
							<input id="agency_id" type="url" style="width:92%;" value="<%= agency_id%>" readonly>
						</fieldset>
						<fieldset style="width:48%; float:left;  margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
							<label>Country *</label>
							<input id="country" type="text" style="width:92%;" value="<%= country%>">
						</fieldset>
						<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
 							<label>City *</label>
							<input id="city" type="url" style="width:92%;" value="<%= city%>">
						</fieldset>
						<fieldset style="width:48%; float:left;  margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
							<label>City Center Latitude *</label>
							<input id="city_center_lat" class="validate_coordinate" type="text" style="width:92%;" value="<%= city_center_lat%>">
						</fieldset>
						<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
 							<label>City Center Longitude *</label>
							<input id="city_center_lon" class="validate_coordinate" type="text" style="width:92%;" value="<%= city_center_lon%>">
						</fieldset>
						<fieldset style="width:48%; float:left; margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
							<label>Old Password</label>
							<input id="old_password" type="password" style="width:92%;" maxlength="10" onblur="validate_password()">
						</fieldset>
						<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
							<label>New Password</label>
							<input id="new_password" title="max length: 10" type="password" style="width:92%;" maxlength="10">
						</fieldset><div class="clear"></div>
				</form>
			</div><!-- end of #tab (new) -->
		<footer>
				<div class="submit_link">
					<input type="submit" value="Save" class="alt_btn" onclick="btn_save()">
					<input type="submit" value="Reset" onclick="btn_reset()">
					<input type="submit" value="Back" onclick="btn_back()">
				</div>
		</footer>
		</article><!-- end of content manager article -->

		<div class="spacer"></div>
	</section>
	
<!-- alertify jquery plugin -->
<script src="js/alertify.min.js"></script>
<!-- chosen jquery plugin -->
<script src="js/chosen/chosen.jquery.min.js" type="text/javascript"></script>
<script type="text/javascript">
	$(".chose_timezone").chosen({
		disable_search_threshold: 1000,
		allow_single_deselect: true
	});
	$(".chose_language").chosen({
		disable_search_threshold: 1000,
		allow_single_deselect: true
	});
</script>
</body>

</html>
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
	<script src="js/edit.gtfs/agency.js"></script>
	
	<script type="text/javascript">
	$(document).ready(function() {
		//When page loads...
		list_agency();
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
				<div class="breadcrumb_divider"></div> <a class="current">Agency</a>
			</article>
		</div>
	</section><!-- end of secondary bar -->
	
	<!-- common side bar -->
	<jsp:include page="Sidebar.jsp"/> 
	
	<section id="main" class="column">
		
		<h4 class="alert_info"><a href="https://developers.google.com/transit/gtfs/reference?csw=1#agency_fields" title="GTFS Reference - Agency" target="_blank">Agency</a> - one or more transit agencies that provide the data in this feed.</h4>
		
		<article class="module width_3_quarter">
		<header><h3 class="tabs_involved">Edit Agency</h3>
		</header>

		<div class="tab_container">
			<form id="form_edit_agency">
						<fieldset style="margin-left: 1%; margin-right: 2%;">
							<label>Agency ID * <a href="javascript:show_detail_agency(&quot;agency_id&quot;)">(Read More)</a></label>
							<input id="edit_agency_id" type="text" style="width:96%;" value="" disabled>
						</fieldset>
						<fieldset style="width:48%; float:left;  margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
							<label>Agency Name * <a href="javascript:show_detail_agency(&quot;agency_name&quot;)">(Read More)</a></label>
							<input id="edit_agency_name" type="text" style="width:92%;" value="" autofocus>
						</fieldset>
						<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
 							<label>Agency URL * <a href="javascript:show_detail_agency(&quot;agency_url&quot;)">(Read More)</a></label>
							<input id="edit_agency_url" type="url" style="width:92%;" value="">
						</fieldset>
						<fieldset style="width:48%; float:left; margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
							<label>Agency Timezone * <a href="javascript:show_detail_agency(&quot;agency_timezone&quot;)">(Read More)</a></label>
							<div style="margin-left:10px;">
							<select id="edit_agency_timezone" data-placeholder="Choose a Timezone..." class="chose_timezone">
							<!-- timezones -->
							<script src="Timezones.js"></script>
							</select>
							</div>
						</fieldset>
						<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
							<label>Agency Language <a href="javascript:show_detail_agency(&quot;agency_lang&quot;)">(Read More)</a></label>
							<div style="margin-left:10px;">
							<select id="edit_agency_lang" data-placeholder="Choose a Language..." class="chose_language">
								<option value=""></option>
								<option value="ed">en</option>
								<option value="zh">zh</option>
								<option value="it">it</option>
								<option value="fr">fr</option>
								<option value="de">de</option>
								<option value="es">es</option>
								<option value="ja">ja</option>
							</select>
							</div>
						</fieldset>
						<fieldset style="width:48%; float:left; margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
							<label>Agency Phone <a href="javascript:show_detail_agency(&quot;agency_phone&quot;)">(Read More)</a></label>
							<input id="edit_agency_phone" type="text" style="width:92%;">
						</fieldset>
						<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
							<label>Agency Fare URL <a href="javascript:show_detail_agency(&quot;agency_fare_url&quot;)">(Read More)</a></label>
							<input id="edit_agency_fare_url" type="text" style="width:92%;">
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
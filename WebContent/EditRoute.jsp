<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<%@page import="irma.rt.edit.bean.AccountBean" %>
<title>Public Transit Open Data Edit Platform</title>
	<link rel="stylesheet" href="css/layout.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="css/leaflet.css" />
	<!-- alertify jquery plugin (beautiful alert)-->
	<link rel="stylesheet" href="css/alertify.core.css" />
	<link rel="stylesheet" href="css/alertify.default.css" />
	<!-- chosen jquery plugin (select box)-->
	<link rel="stylesheet" href="css/chosen/chosen.min.css" />
	<!-- colpick plugin (color picker) -->
	<link rel="stylesheet" href="css/colpick/colpick.css" />
	
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
	<script src="js/edit.gtfs/route.js"></script>
	
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
			<div class="breadcrumb_divider"></div> <a class="current">Route</a>
			</article>
		</div>
	</section><!-- end of secondary bar -->
	
	<!-- common side bar -->
	<jsp:include page="Sidebar.jsp"/> 
	
	<section id="main" class="column">
		
		<h4 class="alert_info"><a href="https://developers.google.com/transit/gtfs/reference?csw=1#routes_fields" target="_blank">Route</a> - Transit routes. A route is a group of trips that are displayed to riders as a single service.</h4>
		
		<article class="module width_3_quarter">
		<header><h3 class="tabs_involved">Edit Route</h3>
		<ul class="tabs">
   			<li><a href="#list">List</a></li>
    		<li id="tab_edit"><a href="#edit">Edit</a></li>
		</ul>
		</header>
		<div class="tab_container">
		<div id="list" class="tab_content" style="overflow:auto; height:500px">
			<table class="tablesorter"> 
			<thead> 
				<tr> 
					<th>Actions</th>
   					<th>Route ID *</th> 
    				<th>Agency ID</th>
    				<th>Short Name *</th>
    				<th>Long Name *</th>
    				<th>Description</th>
    				<th>Type *</th>
    				<th>Url</th>
    				<th>Route Color</th>
    				<th>Text Color</th>
				</tr> 
			</thead> 
			<tbody id="table_list_route"> 
			</tbody> 
			</table>
			<script type="text/javascript">list_route();</script>
			</div><!-- end of #tab (list) -->
			
			<div id="edit" class="tab_content" style="overflow:auto; height:500px">
				<fieldset style="width:48%; float:left;  margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Route ID * <a href="javascript:show_detail_route(&quot;route_id&quot;)">(Read More)</a></label>
					<input type="text" id="edit_route_id" style="width:92%;" value="" placeholder="e.g. A" autofocus>
				</fieldset>
				<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Agency ID <a href="javascript:show_detail_route(&quot;agency_id&quot;)">(Read More)</a></label>
					<input type="text" id="edit_agency_id" style="width:92%;" value="<%= agency_id%>" disabled>
				</fieldset><div class="clear"></div>
				<fieldset style="width:48%; float:left;  margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Route Short Name * <a href="javascript:show_detail_route(&quot;route_short_name&quot;)">(Read More)</a></label>
					<input type="text" id="edit_route_short_name" style="width:92%;" value="" placeholder="e.g. 17">
				</fieldset>
				<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Route Long Name * <a href="javascript:show_detail_route(&quot;route_long_name&quot;)">(Read More)</a></label>
					<input type="text" id="edit_route_long_name" style="width:92%;" value="" placeholder="e.g. Mission">
				</fieldset><div class="clear"></div>
				<fieldset style="margin-left: 1%; margin-right: 2%;">
					<label>Route Description <a href="javascript:show_detail_route(&quot;route_desc&quot;)">(Read More)</a></label>
					<textarea rows="3" id="edit_route_desc" placeholder='e.g. The "A" route travels from lower Mission to Downtown.'></textarea>
				</fieldset>
				<fieldset style="width:48%; float:left;  margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Route Type * <a href="javascript:show_detail_route(&quot;route_type&quot;)">(Read More)</a></label>
					<div style="margin-left:10px;">
					<select id="edit_route_type" data-placeholder="Choose a Route Type..." class="choose_route_type">
						<option value=""></option>
						<option value="0">0 - Tram, Streetcar, Light rail</option>
						<option value="1">1 - Subway, Metro</option>
						<option value="2">2 - Rail</option>
						<option value="3">3 - Bus</option>
						<option value="4">4 - Ferry</option>
						<option value="5">5 - Cable car</option>
						<option value="6">6 - Gondola, Suspended cable car</option>
						<option value="7">7 - Funicular</option>
					</select>
					</div>
				</fieldset>
				<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Route Url <a href="javascript:show_detail_route(&quot;route_url&quot;)">(Read More)</a></label>
					<input type="text" id="edit_route_url" style="width:92%;" value="" placeholder="e.g. http://www.thefunbus.org">
				</fieldset><div class="clear"></div>
				<fieldset style="width:48%; float:left;  margin-left: 1%; margin-right: 1%;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Route Color <a href="javascript:show_detail_route(&quot;route_color&quot;)">(Read More)</a></label>
					<input type="text" id="edit_route_color" class="picker" style="width:92%;" value="" placeholder="e.g. FFFFFF" readonly>
				</fieldset>
				<fieldset style="width:48%; float:left;"> <!-- to make two field float next to one another, adjust values accordingly -->
					<label>Route Text Color <a href="javascript:show_detail_route(&quot;route_text_color&quot;)">(Read More)</a></label>
					<input type="text" id="edit_route_text_color" class="picker" style="width:92%;" value="" placeholder="e.g. 000000" readonly>
				</fieldset>
				
				<div class="clear"></div>
				<div class="spacer"></div>
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
	
<!-- alertify jquery plugin -->
<script src="js/alertify.min.js"></script>
<!-- chosen jquery plugin -->
<script src="js/chosen/chosen.jquery.min.js" type="text/javascript"></script>
<!-- colpick plugin -->
<script src="js/colpick/colpick.js" type="text/javascript"></script>
<script type="text/javascript">
	$(".choose_route_type").chosen({
		disable_search_threshold: 1000,
		allow_single_deselect: true
	});
	
	$('.picker').colpick({
		layout:'hex',
		submit:0,
		colorScheme:'dark',
		onChange:function(hsb,hex,rgb,el,bySetColor) {
			$(el).css('border-color','#'+hex);
			// Fill the text box just if the color was set using the picker, and not the colpickSetColor function.
			if(!bySetColor) $(el).val(hex);
		}
	}).keyup(function(){
		$(this).colpickSetColor(this.value);
	});
</script>
</body>

</html>
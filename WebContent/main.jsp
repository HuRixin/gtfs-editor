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
			<article class="breadcrumbs"><a href="<%= mainPage%>">Admin Console</a></article>
		</div>
	</section><!-- end of secondary bar -->
	
	<!-- common side bar -->
	<jsp:include page="Sidebar.jsp"/>  
	
	<section id="main" class="column">
		
		<h4 class="alert_info">Welcome to the Public Transit Open Data (GTFS) Edit Platform, choose a function on left column to begin.</h4>
		
		<article class="module width_full">
			<header><h3>Main Page</h3></header>
			<div class="module_content" style="overflow:auto; height:450px">
				<article class="stats_graph">
					<img src="images/main page.jpg"  alt=""  />
				</article>
				<div class="clear"></div>
			</div>
		</article><!-- end of stats article -->
		
		<div class="clear"></div>
		<div class="spacer"></div>
	</section>
	
<!-- alertify jquery plugin -->
<script src="js/alertify.min.js"></script>
</body>

</html>
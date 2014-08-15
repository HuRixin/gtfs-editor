<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>

	<!-- General Metas -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">	<!-- Force Latest IE rendering engine -->
	<title>GTFS Editor</title>
	<meta name="description" content="">
	<meta name="author" content="">
	<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	
	<!-- Mobile Specific Metas -->
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" /> 
	
	<!-- Stylesheets -->
	<link rel="stylesheet" href="css/login/base.css">
	<link rel="stylesheet" href="css/login/skeleton.css">
	<link rel="stylesheet" href="css/login/layout.css">
	<script src="js/jquery-1.10.2.js"></script>
	<script src="js/jquery.cookie.js"></script>
	<script> 
function remember_me(){
   var c = $("#remember"); //INPUT CHECKBOX

   //IF CHECKBOX IS SET, COOKIE WILL BE SET
   if(c.is(":checked")) {
     var u = $("#username").val(); //VALUE OF USERNAME
     var p = $("#password").val(); //VALUE OF PASSWORD
     var checked = 1;
     $.cookie("username", u, { expires: 3650 }); //SETS IN DAYS (10 YEARS)
     $.cookie("password", p, { expires: 3650 }); //SETS IN DAYS (10 YEARS)
     $.cookie("checked", checked, { expires: 3650 }); //SETS IN DAYS (10 YEARS)
   } else {
	   $.removeCookie('username');
	   $.removeCookie('password');
	   $.removeCookie('checked');
   }
}
//NEXT PAGE LOAD, THE USERNAME & PASSWORD WILL BE SHOWN IN THEIR FIELDS
function load_em(){
   	var u = $.cookie("username"); //"USERNAME" COOKIE
   	var p = $.cookie("password"); //"PASSWORD" COOKIE
	var checked = $.cookie("checked");
   $("#username").val(u); //FILLS WITH "USERNAME" COOKIE
   $("#password").val(p); //FILLS WITH "PASSWORD" COOKIE
   if(checked == 1)
	   $("#remember").prop("checked", true);
}
</script>

</head>
<body onLoad="load_em()">
<!-- Control the presence of login failed message -->
 <%
    String msg = (String)session.getAttribute("login_failed_msg");
 	if(msg == null) msg = "";
%>
     
	<!-- Primary Page Layout -->
	<div class="container">
		<div><p></p><p></div>
		<div><p></p><p></div>
		<div><p></p><p></div>
		<div class="form-bg">
			<form method="post" action="login">
				<h2>Login <font color="red"><%= msg%></font></h2>
				<p><input type="text" placeholder="Username" id="username" name="username"></p>
				<p><input type="password" placeholder="Password" id="password" name="password"></p>
				<label for="remember">
				  <input type="checkbox" id="remember" value="remember" />
				  <span>Remember me on this computer</span>
				</label>
				<button type="submit" onClick="remember_me()"></button>
			</form>
		</div>

	
		<p class="forgot">Forgot password? Email admin: <a class="emaillink" href="mailto:irmarealtime@gmail.com">irmarealtime@gmail.com</a></p>
		

	</div><!-- container -->

	<!-- JS  -->
	<script>window.jQuery || document.write("<script src='js/login/jquery-1.5.1.min.js'>\x3C/script>")</script>
	<script src="js/login/app.js"></script>
	
<!-- End Document -->

</body>
</html>
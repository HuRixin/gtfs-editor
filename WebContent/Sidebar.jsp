<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@page import="irma.rt.edit.bean.AccountBean" %>
	
	<aside id="sidebar" class="column">
		<form class="quick_search">
			<input type="text" value="Quick Search" onfocus="if(!this._haschanged){this.value=''};this._haschanged=true;">
		</form>
		<hr/>
		<h3>GTFS</h3>
		<ul class="toggle">
			<li class="icn_new"><a href="NewIntroduction.jsp">Create New GTFS</a></li>
			<li class="icn_edit"><a href="EditIntroduction.jsp">Edit Current GTFS</a></li>
			<!-- <li class="icn_security"><a href="#">Import GTFS</a></li> -->
			<li class="icn_folder"><a href="export">Export GTFS</a></li>
		</ul>
		<h3>Admin</h3>
		<ul class="toggle">
			<li class="icn_profile"><a href="Account.jsp">Account</a></li>
			<li class="icn_jump_back"><a href="logout">Logout</a></li>
		</ul>
		<h3>Reference</h3>
		<ul class="toggle">
			<li class="icn_tags"><a href="User Manual.pdf" target="_blank">User Manual</a></li>
			<li class="icn_tags"><a href="https://developers.google.com/transit/gtfs/reference?csw=1#agency_fields" target="_blank">Agency</a></li>
			<li class="icn_tags"><a href="https://developers.google.com/transit/gtfs/reference?csw=1#calendar_fields" target="_blank">Calendar</a></li>
			<li class="icn_tags"><a href="https://developers.google.com/transit/gtfs/reference?csw=1#stops_fields" target="_blank">Stop</a></li>
			<li class="icn_tags"><a href="https://developers.google.com/transit/gtfs/reference?csw=1#routes_fields" target="_blank">Route</a></li>
			<li class="icn_tags"><a href="https://developers.google.com/transit/gtfs/reference?csw=1#shapes_fields" target="_blank">Shape</a></li>
			<li class="icn_tags"><a href="https://developers.google.com/transit/gtfs/reference?csw=1#trips_fields" target="_blank">Trip</a></li>
			<li class="icn_tags"><a href="https://developers.google.com/transit/gtfs/reference?csw=1#stop_times_fields" target="_blank">StopTime</a></li>
		</ul>

		<footer>
			<hr />
			<p><strong>Copyright &copy; 2014 Univercita di Pavia</strong></p>
			<p>Created by Rixin</p>
		</footer>
	</aside><!-- end of sidebar -->
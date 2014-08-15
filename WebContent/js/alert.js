/**
 * 
 * @author HU RIXIN
 */

//show details
function show_detail_agency(param) {
	var msg = "";
	switch (param)
	{
	case "agency_id":
		msg = "<p align='justify'>The agency_id field is an ID that uniquely identifies a transit agency. A transit feed may represent data from more than one agency. The agency_id is dataset unique. This field is optional for transit feeds that only contain data for a single agency.</p>";
		break;
	case "agency_name":
		msg = "<p align='justify'>The agency_name field contains the full name of the transit agency. Google Maps will display this name.</p>";
		break;
	case "agency_url":
		msg = "<p align='justify'>The agency_url field contains the URL of the transit agency. The value must be a fully qualified URL that includes http:// or https://, and any special characters in the URL must be correctly escaped. <br>See http://www.w3.org/Addressing/URL/4_URI_Recommentations.html for a description of how to create fully qualified URL values.</p>";
		break;
	case "agency_timezone":
		msg = "<p align='justify'>The agency_timezone field contains the timezone where the transit agency is located. Timezone names never contain the space character but may contain an underscore. Please refer to http://en.wikipedia.org/wiki/List_of_tz_zones for a list of valid values. If multiple agencies are specified in the feed, each must have the same agency_timezone.</p>";
		break;
	case "agency_lang":
		msg = "<p align='justify'>The agency_lang field contains a two-letter ISO 639-1 code for the primary language used by this transit agency. The language code is case-insensitive (both en and EN are accepted). This setting defines capitalization rules and other language-specific settings for all text contained in this transit agency's feed. Please refer to http://www.loc.gov/standards/iso639-2/php/code_list.php for a list of valid values.</p>";
		break;
	case "agency_phone":
		msg = "<p align='justify'>The agency_phone field contains a single voice telephone number for the specified agency. This field is a string value that presents the telephone number as typical for the agency's service area. It can and should contain punctuation marks to group the digits of the number. Dialable text (for example, TriMet's '503-238-RIDE') is permitted, but the field must not contain any other descriptive text.</p>";
		break;
	case "agency_fare_url":
		msg = "<p align='justify'>The agency_fare_url specifies the URL of a web page that allows a rider to purchase tickets or other fare instruments for that agency online. The value must be a fully qualified URL that includes http:// or https://, and any special characters in the URL must be correctly escaped. <br>See http://www.w3.org/Addressing/URL/4_URI_Recommentations.html for a description of how to create fully qualified URL values.</p>";
		break;
	}
	alertify.alert(msg);
}

function show_detail_calendar(param) {
	var msg = "";
	switch (param) 
	{
	case "service_id":
		msg = "<p align='justify'>The service_id contains an ID that uniquely identifies a set of dates when service is available for one or more routes. Each service_id value can appear at most once in a calendar.txt file. This value is dataset unique. It is referenced by the trips.txt file.</p>";
		break;
	case "start_date":
		msg = "<p align='justify'>The start_date field contains the start date for the service.<br>The start_date field's value should be in YYYYMMDD format.</p>";
		break;
	case "end_date":
		msg = "<p align='justify'>The end_date field contains the end date for the service. This date is included in the service interval.<br>The end_date field's value should be in YYYYMMDD format.</p>";
		break;
	case "day_of_week":
		msg = "<p align='justify'>The <strong>Day of Week</strong> field (take <strong>'Monday'</strong> for example) contains a binary value that indicates whether the service is valid for all Mondays.<br>";
		msg += "A value of 1 indicates that service is available for all Mondays in the date range. (The date range is specified using the start_date and end_date fields.)<br>";
		msg += "A value of 0 indicates that service is not available on Mondays in the date range.</p>";
		break;
	}
	alertify.alert(msg);
}

function show_detail_stop(param) {
	var msg = "";
	switch(param)
	{
	case "usage":
		msg = "<p align='justify'>Click on the map to add a stop, drag and drop it to the correct location, then enter other information to complete addition.</p>" +
			"<p align='justify'>Click the left-top button to show / hide the existed stops.</p>";
		break;
	case "stop_id":
		msg = "<p align='justify'>The stop_id field contains an ID that uniquely identifies a stop or station. Multiple routes may use the same stop. The stop_id is dataset unique.</p>";
		break;
	case "stop_code":
		msg = "<p align='justify'>The stop_code field contains short text or a number that uniquely identifies the stop for passengers. Stop codes are often used in phone-based transit information systems or printed on stop signage to make it easier for riders to get a stop schedule or real-time arrival information for a particular stop.</p>";
		msg += "<p align='justify'>The stop_code field should only be used for stop codes that are displayed to passengers. For internal codes, use stop_id. This field should be left blank for stops without a code.</p>";
		break;
	case "stop_name":
		msg = "<p align='justify'>The stop_name field contains the name of a stop or station. Please use a name that people will understand in the local and tourist vernacular.</p>";
		break;
	case "stop_desc":
		msg = "<p align='justify'>The stop_desc field contains a description of a stop. Please provide useful, quality information. Do not simply duplicate the name of the stop.</p>";
		break;
	case "stop_lat":
		msg = "<p align='justify'>The stop_lat field contains the latitude of a stop or station. The field value must be a valid WGS 84 latitude.</p>";
		break;
	case "stop_lon":
		msg = "<p align='justify'>The stop_lon field contains the longitude of a stop or station. The field value must be a valid WGS 84 longitude value from -180 to 180.</p>";
		break;
	case "zone_id":
		msg = "<p align='justify'>The zone_id field defines the fare zone for a stop ID. Zone IDs are required if you want to provide fare information using fare_rules.txt. If this stop ID represents a station, the zone ID is ignored.</p>";
		break;
	case "stop_url":
		msg = "<p align='justify'>The stop_url field contains the URL of a web page about a particular stop. This should be different from the agency_url and the route_url fields.</p>";
		msg += "<p align='justify'>The value must be a fully qualified URL that includes http:// or https://, and any special characters in the URL must be correctly escaped. See http://www.w3.org/Addressing/URL/4_URI_Recommentations.html for a description of how to create fully qualified URL values.</p>";
		break;
	case "location_type":
		msg = "<p align='justify'>The location_type field identifies whether this stop ID represents a stop or station. If no location type is specified, or the location_type is blank, stop IDs are treated as stops. Stations may have different properties from stops when they are represented on a map or used in trip planning.</p>";
		msg += "<p align='justify'>The location type field can have the following values:</p>";
		msg += "<p align='justify'>0 or blank - Stop. A location where passengers board or disembark from a transit vehicle.<br>1 - Station. A physical structure or area that contains one or more stop.</p>";
		break;
	case "parent_station":
		msg = "<p align='justify'>For stops that are physically located inside stations, the parent_station field identifies the station associated with the stop. To use this field, stops.txt must also contain a row where this stop ID is assigned location type=1.</p>" +
			"<p align='justify'>This stop ID represents: A stop located inside a station.<br>This entry's location type: 0 or blank<br>This entry's parent_station field contains: The stop ID of the station where this stop is located. The stop referenced by parent_station must have location_type=1.</p>" +
			"<p align='justify'>This stop ID represents: A stop located outside a station.<br>This entry's location type: 0 or blank<br>This entry's parent_station field contains: A blank value. The parent_station field doesn't apply to this stop.</p>" +
			"<p align='justify'>This stop ID represents: A station.<br>This entry's location type: 1<br>This entry's parent_station field contains: A blank value. Stations can't contain other stations.</p>";
		break;
	case "stop_timezone":
		msg = "<p align='justify'>The stop_timezone field contains the timezone in which this stop or station is located. Please refer to Wikipedia List of Timezones for a list of valid values. If omitted, the stop should be assumed to be located in the timezone specified by agency_timezone in agency.txt.</p>" +
			"<p align='justify'>When a stop has a parent station, the stop is considered to be in the timezone specified by the parent station's stop_timezone value. If the parent has no stop_timezone value, the stops that belong to that station are assumed to be in the timezone specified by agency_timezone, even if the stops have their own stop_timezone values. In other words, if a given stop has a parent_station value, any stop_timezone value specified for that stop must be ignored.</p>" +
			"<p align='justify'>Even if stop_timezone values are provided in stops.txt, the times in stop_times.txt should continue to be specified as time since midnight in the timezone specified by agency_timezone in agency.txt. This ensures that the time values in a trip always increase over the course of a trip, regardless of which timezones the trip crosses.</p>";
		break;
	case "wheelchair_boarding":
		msg = "<p align='justify'>The wheelchair_boarding field identifies whether wheelchair boardings are possible from the specified stop or station. The field can have the following values:<br>" +
			"0 (or empty) - indicates that there is no accessibility information for the stop<br>" +
			"1 - indicates that at least some vehicles at this stop can be boarded by a rider in a wheelchair<br>" +
			"2 - wheelchair boarding is not possible at this stop</p>" +
			"<p align='justify'>When a stop is part of a larger station complex, as indicated by a stop with a parent_station value, the stop's wheelchair_boarding field has the following additional semantics:<br>" +
			"0 (or empty) - the stop will inherit its wheelchair_boarding value from the parent station, if specified in the parent<br>" +
			"1 - there exists some accessible path from outside the station to the specific stop / platform<br>" +
			"2 - there exists no accessible path from outside the station to the specific stop / platform</p>";
		break;
	}
	alertify.alert(msg);
}

function show_detail_route(param) {
	var msg = "";
	switch(param)
	{
	case "route_id":
		msg = "<p align='justify'>The route_id field contains an ID that uniquely identifies a route. The route_id is dataset unique.</p>";
		break;
	case "agency_id":
		msg = "<p align='justify'>The agency_id field defines an agency for the specified route. This value is referenced from the agency.txt file. Use this field when you are providing data for routes from more than one agency.</p>";
		break;
	case "route_short_name":
		msg = "<p align='justify'>The route_short_name contains the short name of a route. This will often be a short, abstract identifier like '32', '100X', or 'Green' that riders use to identify a route, but which doesn't give any indication of what places the route serves. At least one of route_short_name or route_long_name must be specified, or potentially both if appropriate. If the route does not have a short name, please specify a route_long_name and use an empty string as the value for this field.<br>" +
			"<br>See a Google Maps screenshot highlighting the route_short_name.</p>";
		break;
	case "route_long_name":
		msg = "<p align='justify'>The route_long_name contains the full name of a route. This name is generally more descriptive than the route_short_name and will often include the route's destination or stop. At least one of route_short_name or route_long_name must be specified, or potentially both if appropriate. If the route does not have a long name, please specify a route_short_name and use an empty string as the value for this field.<br>" +
			"<br>See a Google Maps screenshot highlighting the route_long_name.</p>";
		break;
	case "route_desc":
		msg = "<p align='justify'>The route_desc field contains a description of a route. Please provide useful, quality information. Do not simply duplicate the name of the route. For example, 'A trains operate between Inwood-207 St, Manhattan and Far Rockaway-Mott Avenue, Queens at all times. Also from about 6AM until about midnight, additional A trains operate between Inwood-207 St and Lefferts Boulevard (trains typically alternate between Lefferts Blvd and Far Rockaway).'</p>";
		break;
	case "route_type":
		msg = "<p align='justify'>The route_type field describes the type of transportation used on a route. Valid values for this field are:<br>" +
			"0 - Tram, Streetcar, Light rail. Any light rail or street level system within a metropolitan area.<br>" +
			"1 - Subway, Metro. Any underground rail system within a metropolitan area.<br>" +
			"2 - Rail. Used for intercity or long-distance travel.<br>" +
			"3 - Bus. Used for short- and long-distance bus routes.<br>" +
			"4 - Ferry. Used for short- and long-distance boat service.<br>" +
			"5 - Cable car. Used for street-level cable cars where the cable runs beneath the car.<br>" +
			"6 - Gondola, Suspended cable car. Typically used for aerial cable cars where the car is suspended from the cable.<br>" +
			"7 - Funicular. Any rail system designed for steep inclines.<br>" +
			"See a Google Maps screenshot highlighting the route_type.</p>";
		break;
	case "route_url":
		msg = "<p align='justify'>The route_url field contains the URL of a web page about that particular route. This should be different from the agency_url.<br><br>" +
			"The value must be a fully qualified URL that includes http:// or https://, and any special characters in the URL must be correctly escaped. See http://www.w3.org/Addressing/URL/4_URI_Recommentations.html for a description of how to create fully qualified URL values.</p>";
		break;
	case "route_color":
		msg = "<p align='justify'>In systems that have colors assigned to routes, the route_color field defines a color that corresponds to a route. The color must be provided as a six-character hexadecimal number, for example, 00FFFF. If no color is specified, the default route color is white (FFFFFF).<br><br>" +
			"The color difference between route_color and route_text_color should provide sufficient contrast when viewed on a black and white screen. The W3C Techniques for Accessibility Evaluation And Repair Tools document offers a useful algorithm for evaluating color contrast. There are also helpful online tools for choosing contrasting colors, including the snook.ca Color Contrast Check application.</p>";
		break;
	case "route_text_color":
		msg = "<p align='justify'>The route_text_color field can be used to specify a legible color to use for text drawn against a background of route_color. The color must be provided as a six-character hexadecimal number, for example, FFD700. If no color is specified, the default text color is black (000000).<br><br>" +
			"The color difference between route_color and route_text_color should provide sufficient contrast when viewed on a black and white screen.</p>";
		break;
	}
	alertify.alert(msg);
}

function show_detail_shape(param) {
	var msg = "";
	switch(param)
	{
	case "usage":
		msg = "<p align='justify'>0. We support two ways to generate shape points: <font style='color:red'>Automatically and Manually</font>.<br>1. Choose a route from the upper right box;<br>2. Choose one or more calendars from the upper right box;<br>3. Click the stop belongs to the chosen route in order to generate shapes.<br>4. If necessary, drag and drop the current route line to correct it.<br>5. Click finish and save to add shapes.</p>" +
			"<p align='left'>Editing manually: <br>" +
			"* <strong>drag the point marker</strong> to move it around<br>" +
			"* <strong>right-click on point marker</strong> to <strong>remove</strong> the point<br>" +
			"* <strong>drag the middle point marker</strong> to create new points between two existing<br>" +
			"* <strong>right-click on middle point marker</strong> to <strong>split</strong> the point<br>" +
			"* <strong>click on the first or last point</strong> to add a new first/last point</p>" +
			"<p align='justify'>Note: <br>* Right click the stop icon to check more detailed information.<br>* <font style='color:orange'>Orange</font> represent editable lines/points, while <font style='color:blue'>Blue</font> represent confirmed lines/points.<br>* The shape_id field is auto-generated as this format: route_id##service_id</p>";
		break;
	case "shape_id":
		msg = "<p align='justify'>The shape_id field contains an ID that uniquely identifies a shape.</p>";
		break;
	case "shape_pt_lat":
		msg = "<p align='justify'>The shape_pt_lat field associates a shape point's latitude with a shape ID. The field value must be a valid WGS 84 latitude. Each row in shapes.txt represents a shape point in your shape definition.<br><br>" +
			"For example, if the shape 'A_shp' has three points in its definition, the shapes.txt file might contain these rows to define the shape:<br><br>" +
			"A_shp,37.61956,-122.48161,0<br>" +
			"A_shp,37.64430,-122.41070,6<br>" +
			"A_shp,37.65863,-122.30839,11</p>";
		break;
	case "shape_pt_lon":
		msg = "<p align='justify'>The shape_pt_lon field associates a shape point's longitude with a shape ID. The field value must be a valid WGS 84 longitude value from -180 to 180. Each row in shapes.txt represents a shape point in your shape definition.<br><br>" +
			"For example, if the shape 'A_shp' has three points in its definition, the shapes.txt file might contain these rows to define the shape:<br><br>" +
			"A_shp,37.61956,-122.48161,0<br>" +
			"A_shp,37.64430,-122.41070,6<br>" +
			"A_shp,37.65863,-122.30839,11</p>";
		break;
	case "shape_pt_sequence":
		msg = "<p align='justify'>The shape_pt_sequence field associates the latitude and longitude of a shape point with its sequence order along the shape. The values for shape_pt_sequence must be non-negative integers, and they must increase along the trip.<br><br>" +
			"For example, if the shape 'A_shp' has three points in its definition, the shapes.txt file might contain these rows to define the shape:<br><br>" +
			"A_shp,37.61956,-122.48161,0<br>" +
			"A_shp,37.64430,-122.41070,6<br>" +
			"A_shp,37.65863,-122.30839,11</p>";
		break;
	case "shape_dist_traveled":
		msg = "<p align='justify'>When used in the shapes.txt file, the shape_dist_traveled field positions a shape point as a distance traveled along a shape from the first shape point. The shape_dist_traveled field represents a real distance traveled along the route in units such as feet or kilometers. This information allows the trip planner to determine how much of the shape to draw when showing part of a trip on the map. The values used for shape_dist_traveled must increase along with shape_pt_sequence: they cannot be used to show reverse travel along a route. <br><br>" +
			"The units used for shape_dist_traveled in the shapes.txt file must match the units that are used for this field in the stop_times.txt file.<br><br>" +
			"For example, if a bus travels along the three points defined above for A_shp, the additional shape_dist_traveled values (shown here in kilometers) would look like this:<br><br>" +
			"A_shp,37.61956,-122.48161,0<br>" +
			"A_shp,37.64430,-122.41070,6<br>" +
			"A_shp,37.65863,-122.30839,11</p>";
	}
	alertify.alert(msg);
}

function show_detail_trip(param) {
	var msg = "";
	switch(param)
	{
	case "trip_id":
		msg = "<p align='justify'>The <strong>trip_id</strong> field contains an ID that identifies a trip. The <strong>trip_id</strong> is dataset unique.</p>";
		break;
	case "route_id":
		msg = "<p align='justify'>The <strong>route_id</strong> field contains an ID that uniquely identifies a route. This value is referenced from the routes.txt file.</p>";
		break;
	case "service_id":
		msg = "<p align='justify'>The <strong>service_id</strong> contains an ID that uniquely identifies a set of dates when service is available for one or more routes. This value is referenced from the calendar.txt or calendar_dates.txt file.</p>";
		break;
	case "trip_headsign":
		msg = "<p align='justify'>The <strong>trip_headsign</strong> field contains the text that appears on a sign that identifies the trip's destination to passengers. Use this field to distinguish between different patterns of service in the same route. If the headsign changes during a trip, you can override the <strong>trip_headsign</strong> by specifying values for the the stop_headsign field in stop_times.txt.<br><br>See a Google Maps screenshot highlighting the <a target='_blank' href='https://developers.google.com/transit/gtfs/examples/display-to-users#TripHeadsign'>headsign</a>.</p>";
		break;
	case "trip_short_name":
		msg = "<p align='justify'>The <strong>trip_short_name</strong> field contains the text that appears in schedules and sign boards to identify the trip to passengers, for example, to identify train numbers for commuter rail trips. If riders do not commonly rely on trip names, please leave this field blank.<br><br>A <strong>trip_short_name</strong> value, if provided, should uniquely identify a trip within a service day; it should not be used for destination names or limited/express designations.</p>";
		break;
	case "direction_id":
		msg = "<p align='justify'>The <strong>direction_id</strong> field contains a binary value that indicates the direction of travel for a trip. Use this field to distinguish between bi-directional trips with the same route_id. This field is not used in routing; it provides a way to separate trips by direction when publishing time tables. You can specify names for each direction with the <strong>trip_headsign</strong> field.<br><br>" +
			"<strong>0</strong> - travel in one direction (e.g. outbound travel)<br>" +
			"<strong>1</strong> - travel in the opposite direction (e.g. inbound travel)</p>" +
			"<p align='justify' style='color:green'><font For example, you could use the trip_headsign and direction_id fields together to assign a name to travel in each direction for a set of trips. A trips.txt file could contain these rows for use in time tables:<br>" +
			"trip_id,...,trip_headsign,direction_id<br>1234,...,to Airport,0<br>1505,...,to Downtown,1</p>";
		break;
	case "block_id":
		msg = "<p align='justify'>The <strong>block_id</strong> field identifies the block to which the trip belongs. A block consists of two or more sequential trips made using the same vehicle, where a passenger can transfer from one trip to the next just by staying in the vehicle. The <strong>block_id</strong> must be referenced by two or more trips in trips.txt.</p>";
		break;
	case "shape_id":
		msg = "<p align='justify'>The <strong>shape_id</strong> field contains an ID that defines a shape for the trip. This value is referenced from the shapes.txt file. The shapes.txt file allows you to define how a line should be drawn on the map to represent a trip.</p>";
		break;
	case "wheelchair_accessible":
		msg = "<p align='justify'><strong>0</strong> (or empty) - indicates that there is no accessibility information for the trip<br><strong>1</strong> - indicates that the vehicle being used on this particular trip can accommodate at least one rider in a wheelchair<br><strong>2</strong> - indicates that no riders in wheelchairs can be accommodated on this trip</p>";
		break;
	case "bikes_allowed":
		msg = "<p align='justify'><strong>0</strong> (or empty) - indicates that there is no bike information for the trip<br><strong>1</strong> - indicates that the vehicle being used on this particular trip can accommodate at least one bicycle<br><strong>2</strong> - indicates that no bicycles are allowed on this trip</p>";
		break;
	}
	alertify.alert(msg);
}

function show_detail_stop_time(param) {
	var msg = "";
	switch(param)
	{
	case "usage":
		msg = "<p align='justify'>1. Choose a route in upper right box.<br>2. Choose a trip of that route.<br>3. Click stops of that trip by SEQUENCE.<br>4. Fill the arrival time and departure time fields.<br>5. Click 'Save' to add or turn to 'New/Edit' tab, enter more information to complete.</p>";
		break;
	case "route_id":
		msg = "<p align='justify'>The <strong>route_id</strong> field contains an ID that uniquely identifies a route. The route_id is dataset unique.</p>";
		break;
	case "trip_id":
		msg = "<p align='justify'>The <strong>trip_id</strong> field contains an ID that identifies a trip. This value is referenced from the trips.txt file.</p>";
		break;
	case "stop_id":
		msg = "<p align='justify'>The <strong>stop_id</strong> field contains an ID that uniquely identifies a stop. Multiple routes may use the same stop. The stop_id is referenced from the stops.txt file. If location_type is used in stops.txt, all stops referenced in stop_times.txt must have location_type of 0.</p>" +
			"<p align='justify'>Where possible, <strong>stop_id</strong> values should remain consistent between feed updates. In other words, stop A with <strong>stop_id 1</strong> should have <strong>stop_id 1</strong> in all subsequent data updates. If a stop is not a time point, enter blank values for <strong>arrival_time</strong> and <strong>departure_time</strong>.</p>";
		break;
	case "stop_sequence":
		msg = "<p align='justify'>The <strong>stop_sequence</strong> field identifies the order of the stops for a particular trip. The values for <strong>stop_sequence</strong> must be non-negative integers, and they must increase along the trip.</p>" +
			"<p align='justify'>For example, the first stop on the trip could have a <strong>stop_sequence</strong> of <strong>1</strong>, the second stop on the trip could have a <strong>stop_sequence</strong> of <strong>23</strong>, the third stop could have a <strong>stop_sequence</strong> of <strong>40</strong>, and so on.</p>";
		break;
	case "arrival_time":
		msg = "<p align='justify'>The <strong>arrival_time</strong> specifies the arrival time at a specific stop for a specific trip on a route. The time is measured from 'noon minus 12h' (effectively midnight, except for days on which daylight savings time changes occur) at the beginning of the service date. For times occurring after midnight on the service date, enter the time as a value greater than 24:00:00 in HH:MM:SS local time for the day on which the trip schedule begins. If you don't have separate times for arrival and departure at a stop, enter the same value for <strong>arrival_time</strong> and <strong>departure_time</strong>.</p>" +
			"<p align='justify'>If this stop isn't a time point, use an empty string value for the <strong>arrival_time</strong> and <strong>departure_time</strong> fields. Stops without arrival times will be scheduled based on the nearest preceding timed stop. To ensure accurate routing, please provide arrival and departure times for all stops that are time points. Do not interpolate stops.</p>" +
			"<p align='justify'>You must specify arrival and departure times for the first and last stops in a trip.</p>" +
			"<p align='justify'>Times must be eight digits in HH:MM:SS format (H:MM:SS is also accepted, if the hour begins with 0). Do not pad times with spaces. The following columns list stop times for a trip and the proper way to express those times in the <strong>arrival_time</strong> field:</p>" +
			"<table class='reference'><tr><th>Time</th><th>arrival_time value</th></tr><tr><td>08:10:00 A.M.</td><td>08:10:00 or 8:10:00</td></tr><tr><td>01:05:00 P.M.</td><td>13:05:00</td></tr><tr><td>07:40:00 P.M.</td><td>19:40:00</td></tr><tr><td>01:55:00 A.M.</td><td>25:55:00</td></tr></table>";
		break;
	case "departure_time":
		msg = "<p align='justify'>The <strong>departure_time</strong> specifies the departure time from a specific stop for a specific trip on a route. The time is measured from 'noon minus 12h' (effectively midnight, except for days on which daylight savings time changes occur) at the beginning of the service date. For times occurring after midnight on the service date, enter the time as a value greater than 24:00:00 in HH:MM:SS local time for the day on which the trip schedule begins. If you don't have separate times for arrival and departure at a stop, enter the same value for <strong>arrival_time</strong> and <strong>departure_time</strong>.</p>" +
			"<p align='justify'>If this stop isn't a time point, use an empty string value for the <strong>arrival_time</strong> and <strong>departure_time</strong> fields. Stops without arrival times will be scheduled based on the nearest preceding timed stop. To ensure accurate routing, please provide arrival and departure times for all stops that are time points. Do not interpolate stops.</p>" +
			"<p align='justify'>You must specify arrival and departure times for the first and last stops in a trip.</p>" +
			"<p align='justify'>Times must be eight digits in HH:MM:SS format (H:MM:SS is also accepted, if the hour begins with 0). Do not pad times with spaces. The following columns list stop times for a trip and the proper way to express those times in the <strong>departure_time</strong> field:</p>" +
			"<table class='reference'><tr><th>Time</th><th>departure_time value</th></tr><tr><td>08:10:00 A.M.</td><td>08:10:00 or 8:10:00</td></tr><tr><td>01:05:00 P.M.</td><td>13:05:00</td></tr><tr><td>07:40:00 P.M.</td><td>19:40:00</td></tr><tr><td>01:55:00 A.M.</td><td>25:55:00</td></tr></table>";
		break;
	case "pickup_type":
		msg = "<p align='justify'>The <strong>pickup_type</strong> field indicates whether passengers are picked up at a stop as part of the normal schedule or whether a pickup at the stop is not available. This field also allows the transit agency to indicate that passengers must call the agency or notify the driver to arrange a pickup at a particular stop. Valid values for this field are:</p>" +
			"<p align='justify'><strong>0</strong> - Regularly scheduled pickup<br><strong>1</strong> - No pickup available<br><strong>2</strong> - Must phone agency to arrange pickup<br><strong>3</strong> - Must coordinate with driver to arrange pickup</p>";
		break;
	case "drop_off_type":
		msg = "<p align='justify'>The <strong>drop_off_type</strong> field indicates whether passengers are dropped off at a stop as part of the normal schedule or whether a drop off at the stop is not available. This field also allows the transit agency to indicate that passengers must call the agency or notify the driver to arrange a drop off at a particular stop. Valid values for this field are:</p>" +
			"<p align='justify'><strong>0</strong> - Regularly scheduled drop off<br><strong>1</strong> - No drop off available<br><strong>2</strong> - Must phone agency to arrange drop off<br><strong>3</strong> - Must coordinate with driver to arrange drop off</p>";
		break;
	case "stop_headsign":
		msg = "<p align='justify'>The <strong>stop_headsign</strong> field contains the text that appears on a sign that identifies the trip's destination to passengers. Use this field to override the default trip_headsign when the headsign changes between stops. If this headsign is associated with an entire trip, use trip_headsign instead.</p>" +
			"<p align='justify'>See a Google Maps screenshot highlighting the headsign.</p>";
		break;
	case "shape_dist_traveled":
		msg = "<p align='justify'>When used in the stop_times.txt file, the <strong>shape_dist_traveled</strong> field positions a stop as a distance from the first shape point. The <strong>shape_dist_traveled</strong> field represents a real distance traveled along the route in units such as feet or kilometers. For example, if a bus travels a distance of 5.25 kilometers from the start of the shape to the stop, the <strong>shape_dist_traveled</strong> for the stop ID would be entered as '5.25'. This information allows the trip planner to determine how much of the shape to draw when showing part of a trip on the map. The values used for <strong>shape_dist_traveled</strong> must increase along with <strong>stop_sequence</strong>: they cannot be used to show reverse travel along a route.</p>" +
			"<p align='justify'>The units used for <strong>shape_dist_traveled</strong> in the stop_times.txt file must match the units that are used for this field in the shapes.txt file.</p>";
		break;
	}
	alertify.alert(msg);
}

package irma.rt.edit.service;

import java.util.List;
import irma.rt.edit.bean.Agency;
import irma.rt.edit.bean.Calendar;
import irma.rt.edit.bean.Route;
import irma.rt.edit.bean.Shape;
import irma.rt.edit.bean.Stop;
import irma.rt.edit.bean.StopTime;
import irma.rt.edit.bean.Trip;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import org.json.JSONException;

@Path("/gtfs/edit")
public interface GtfsEditService {
	@POST
	@Produces("application/json")
	@Path("/util/finished")
	public void setCreationFinishedInSession();
	
	@POST
	@Produces("application/json")
	@Path("/validate/password")
	public Boolean validatePassword(String password);
	
	@POST
	@Produces("application/json")
	@Path("/update/account")
	public void updateAccount(String jsonAccount);
	
	//--------------------------------------- Agency -----------------------------------------------
	@POST
	@Produces("application/json")
	@Path("/new/agency")
	public boolean newAgency(String jsonAgency);
	
	@POST
	@Produces("application/json")
	@Path("/update/agency")
	public boolean updateAgency(String jsonAgency);
	
	//this method is used for checking the existence of GTFS of a specific agency when creation
	//we suppose if there exists such an agency, that means there exists a whole pack of GTFS
	@POST
	@Produces("application/json")
	@Path("/existed/agency")
	public Boolean existedAgency(String agency_id);
	
	@POST
	@Produces("application/json")
	@Path("/delete/agency")
	public boolean deleteAgency(String agency_id);
	
	@GET
	@Produces("application/json")
	@Path("/list/agency")
	public Agency getAgency();
	
	//--------------------------------------- Calendar -----------------------------------------------
	@POST
	@Produces("application/json")
	@Path("/new/calendar")
	public boolean newCalendar(String jsonCalendar);
	
	@POST
	@Produces("application/json")
	@Path("/existed/calendar")
	public boolean existedCalendar(String service_id);
	
	@POST
	@Produces("application/json")
	@Path("/delete/calendar")
	public boolean deleteCalendar(String service_id);
	
	@GET
	@Produces("application/json")
	@Path("/list/calendar")
	public List<Calendar> getCalendarList();
	
	//--------------------------------------- Stop -----------------------------------------------
	@POST
	@Produces("application/json")
	@Path("/new/stop")
	public boolean newStop(String jsonStop);
	
	@POST
	@Produces("application/json")
	@Path("/existed/stop")
	public boolean existedStop(String stop_id);
	
	@POST
	@Produces("application/json")
	@Path("/delete/stop")
	public boolean deleteStop(String stop_id);
	
	@GET
	@Produces("application/json")
	@Path("/list/stop")
	public List<Stop> getStopList();
	
	@POST
	@Produces("application/json")
	@Path("/list/stop_of_trip")
	public List<Stop> getStopOfTripList(String trip_id);
	
	@POST
	@Produces("application/json")
	@Path("/list/stop_of_shape")
	public List<Stop> getStopOfShapeList(String shape_id);
	
	//--------------------------------------- Route -----------------------------------------------
	@POST
	@Produces("application/json")
	@Path("/new/route")
	public boolean newRoute(String jsonRoute);
	
	@POST
	@Produces("application/json")
	@Path("/existed/route")
	public boolean existedRoute(String route_id);
	
	@POST
	@Produces("application/json")
	@Path("/delete/route")
	public boolean deleteRoute(String route_id);
	
	@GET
	@Produces("application/json")
	@Path("/list/route")
	public List<Route> getRouteList();
	
	
	//--------------------------------------- Shape -----------------------------------------------
/*	@POST
	@Produces("application/json")
	@Path("/new/shape")
	public boolean newShape(String jsonShape);*/
	
	@POST
	@Produces("application/json")
	@Path("/new/shapes")
	public boolean newShapes(String jsonShapes);	//shape_id: route_id##service_id
	
	@POST
	@Produces("application/json")
	@Path("/existed/shape")
	public boolean existedShape(String shape_id);
	
	@POST
	@Produces("application/json")
	@Path("/delete/shape")
	public boolean deleteShapes(String shape_id);
	
	@POST
	@Produces("application/json")
	@Path("/list/shape_by_shape_id")
	public List<Shape> getShapeListByShapeId(String shape_id);
	
	//--------------------------------------- Trip -----------------------------------------------
	@POST
	@Produces("application/json")
	@Path("/new/trip")
	public boolean newTrip(String jsonTrip);

	@POST
	@Produces("application/json")
	@Path("/delete/trip")
	public boolean deleteTrip(String trip_id);
	
	@POST
	@Produces("application/json")
	@Path("/delete/trip_by_route_service_id")
	public void deleteTripListByRouteAndServiceId(String params) throws JSONException;	//params is a json object, includes route_id and service_id
	
	@POST
	@Produces("application/json")
	@Path("/list/trip_by_route_service_id")
	public List<Trip> getTripListByRouteAndServiceId(String params) throws JSONException;	//params is a json object, includes route_id and service_id
	
	@POST
	@Produces("application/json")
	@Path("/list/trips_of_route")
	public List<Trip> getTripOfRouteList(String route_id);
	
	//--------------------------------------- StopTime -----------------------------------------------
	@POST
	@Produces("application/json")
	@Path("/new/stop_time")
	public void newStopTime(String jsonStopTime);

	@POST
	@Produces("application/json")
	@Path("/delete/stop_time")
	public void deleteStopTime(String params) throws JSONException;	//params is json format, includes trip_id and stop_id
	
	@POST
	@Produces("application/json")
	@Path("/delete/stop_times")
	public boolean deleteStopTimeByTripId(String trip_id);	//delete stop_times of a specific trip
	
	@POST
	@Produces("application/json")
	@Path("/list/stop_time")
	public List<StopTime> getStopTimeOfTripList(String trip_id);
	
	//--------------------------------------- ShapeStop (not a GTFS) -----------------------------------------------
	@POST
	@Produces("application/json")
	@Path("/new/shape_stop")
	public boolean newShapeStop(String jsonShapeStop);
	
	@POST
	@Produces("application/json")
	@Path("/delete/shape_stop")
	public void deleteShapeStop(String shape_id);
	
}

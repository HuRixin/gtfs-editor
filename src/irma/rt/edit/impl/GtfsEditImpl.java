package irma.rt.edit.impl;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.cxf.message.Message;
import org.apache.cxf.phase.PhaseInterceptorChain;
import org.apache.cxf.transport.http.AbstractHTTPDestination;
import org.json.JSONException;
import org.json.JSONObject;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import irma.rt.edit.bean.AccountBean;
import irma.rt.edit.bean.Agency;
import irma.rt.edit.bean.Calendar;
import irma.rt.edit.bean.CalendarPK;
import irma.rt.edit.bean.Route;
import irma.rt.edit.bean.RoutePK;
import irma.rt.edit.bean.Shape;
import irma.rt.edit.bean.ShapePK;
import irma.rt.edit.bean.ShapeStop;
import irma.rt.edit.bean.Stop;
import irma.rt.edit.bean.StopPK;
import irma.rt.edit.bean.StopTime;
import irma.rt.edit.bean.StopTimePK;
import irma.rt.edit.bean.Trip;
import irma.rt.edit.bean.TripPK;
import irma.rt.edit.dao.DataAccessUtil;
import irma.rt.edit.service.GtfsEditService;

public class GtfsEditImpl implements GtfsEditService {
	private ObjectMapper mapper = new ObjectMapper(); 	//for json parse
	
	@Override
	public void setCreationFinishedInSession() {
		// TODO Auto-generated method stub
	    Message message = PhaseInterceptorChain.getCurrentMessage();
	    HttpServletRequest request = (HttpServletRequest)message.get(AbstractHTTPDestination.HTTP_REQUEST);
	    HttpSession  session = request.getSession(true);
	    session.setAttribute("creationFinished", true);
	}
	
	//Each GTFS table (except for agency), its primary key is composed of its original key + agency_id to distinguish which agency it belongs to
	//Since multiple agencies share the same DB/table
	private String getAgencyId() {
	    Message message = PhaseInterceptorChain.getCurrentMessage();
	    HttpServletRequest request = (HttpServletRequest)message.get(AbstractHTTPDestination.HTTP_REQUEST);
	    HttpSession  session = request.getSession(true);
	    AccountBean account = (AccountBean) session.getAttribute("account");
	    if(account == null)
	    	return null;
	    else
	    	return account.getAgency_id();
	}
	
	@Override
	public Boolean validatePassword(String password) {
		// TODO Auto-generated method stub
	    Message message = PhaseInterceptorChain.getCurrentMessage();
	    HttpServletRequest request = (HttpServletRequest)message.get(AbstractHTTPDestination.HTTP_REQUEST);
	    HttpSession  session = request.getSession(true);
	    AccountBean account = (AccountBean) session.getAttribute("account");
	    if(account == null || !password.equals(account.getPassword()))
	    	return false;
	    else
	    	return true;
	}
	
	@Override
	public void updateAccount(String jsonAccount) {
		if(jsonAccount == null || jsonAccount.equals(""))
			return;
		AccountBean account = null;
		try {
			account = mapper.readValue(jsonAccount, AccountBean.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		DataAccessUtil.updateAccount(account);
	}
	
	//--------------------------------------- Agency -----------------------------------------------
	@Override
	public boolean newAgency(String jsonAgency) {
		//input param validation
		if(jsonAgency == null || jsonAgency.equals(""))
			return false;
		Agency agency = null;
		try {
			agency = mapper.readValue(jsonAgency, Agency.class);
			DataAccessUtil.newAgency(agency);
			return true;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public boolean updateAgency(String jsonAgency) {
		return newAgency(jsonAgency);
	}

	//this method is used for checking the existence of GTFS of a specific agency when creation
	//we suppose if there exists such an agency, that means there exists a whole pack of GTFS
	@Override
	public Boolean existedAgency(String agency_id) {
		//input param validation
		if(agency_id == null || agency_id.equals(""))
			return null;
		try {
			return DataAccessUtil.existedAgency(agency_id);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	@Override
	public boolean deleteAgency(String agency_id) {
		//input param validation
		if(agency_id == null || agency_id.equals(""))
			return false;
		try {
			DataAccessUtil.deleteAgency(agency_id);
			return true;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public Agency getAgency() {
		Agency agency = DataAccessUtil.getAgency(getAgencyId());
		return agency;
	}
	
	//--------------------------------------- Calendar -----------------------------------------------
	@Override
	public boolean newCalendar(String jsonCalendar) {
		//input param validation
		if(jsonCalendar == null || jsonCalendar.equals(""))
			return false;
		Calendar calendar = null;
		try {
			calendar = mapper.readValue(jsonCalendar, Calendar.class);
			DataAccessUtil.newCalendar(calendar);
			return true;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public boolean existedCalendar(String service_id) {
		//input param validation
		if(service_id == null || service_id.equals(""))
			return false;
		CalendarPK pk = new CalendarPK();
		pk.setAgency_id(getAgencyId());
		pk.setService_id(service_id);
		try {
			return DataAccessUtil.existedCalendar(pk);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public boolean deleteCalendar(String service_id) {
		//input param validation
		if(service_id == null || service_id.equals(""))
			return false;
		CalendarPK pk = new CalendarPK();
		pk.setAgency_id(getAgencyId());
		pk.setService_id(service_id);
		try {
			DataAccessUtil.deleteCalendar(pk);
			return true;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public List<Calendar> getCalendarList() {
		List<Calendar> lstCalendar = DataAccessUtil.getCalendarList(getAgencyId());
		return lstCalendar;
	}
	
	//--------------------------------------- Stop -----------------------------------------------
	@Override
	public boolean newStop(String jsonStop) {
		//input param validation
		if(jsonStop == null || jsonStop.equals(""))
			return false;
		Stop stop = null;
		try {
			stop = mapper.readValue(jsonStop, Stop.class);
			DataAccessUtil.newStop(stop);
			return true;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public boolean existedStop(String stop_id) {
		//input param validation
		if(stop_id == null || stop_id.equals(""))
			return false;
		StopPK pk = new StopPK();
		pk.setAgency_id(getAgencyId());
		pk.setStop_id(stop_id);
		try {
			return DataAccessUtil.existedStop(pk);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}
	
	@Override
	public boolean deleteStop(String stop_id) {
		//input param validation
		if(stop_id == null || stop_id.equals(""))
			return false;
		StopPK pk = new StopPK();
		pk.setAgency_id(getAgencyId());
		pk.setStop_id(stop_id);
		try {
			DataAccessUtil.deleteStop(pk);
			return true;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public List<Stop> getStopList() {
		List<Stop> lstStop = DataAccessUtil.getStopList(getAgencyId());
		return lstStop;
	}
	
	@Override
	public List<Stop> getStopOfTripList(String trip_id) {
		List<Stop> lstStop = DataAccessUtil.getStopOfTripList(getAgencyId(), trip_id);
		return lstStop;
	}
	
	@Override
	public List<Stop> getStopOfShapeList(String shape_id) {
		List<Stop> lstStop = DataAccessUtil.getStopOfShapeList(getAgencyId(), shape_id);
		return lstStop;
	}
	
	//--------------------------------------- Route -----------------------------------------------
	@Override
	public boolean newRoute(String jsonRoute) {
		//input param validation
		if(jsonRoute == null || jsonRoute.equals(""))
			return false;
		Route route = null;
		try {
			route = mapper.readValue(jsonRoute, Route.class);
			DataAccessUtil.newRoute(route);
			return true;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public boolean existedRoute(String route_id) {
		//input param validation
		if(route_id == null || route_id.equals(""))
			return false;
		RoutePK pk = new RoutePK();
		pk.setAgency_id(getAgencyId());
		pk.setRoute_id(route_id);
		try {
			return DataAccessUtil.existedRoute(pk);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public boolean deleteRoute(String route_id) {
		//input param validation
		if(route_id == null || route_id.equals(""))
			return false;
		RoutePK pk = new RoutePK();
		pk.setAgency_id(getAgencyId());
		pk.setRoute_id(route_id);
		try {
			DataAccessUtil.deleteRoute(pk);
			return true;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public List<Route> getRouteList() {
		List<Route> lstRoute = DataAccessUtil.getRouteList(getAgencyId());
		return lstRoute;
	}
	
	
	//--------------------------------------- Shape -----------------------------------------------
	//jsonShapes is a single shape
/*	@Override
  	public boolean newShape(String jsonShape) {
		//input param validation
		if(jsonShape == null || jsonShape.equals(""))
			return false;
		Shape shape = null;
		try {
			shape = mapper.readValue(jsonShape, Shape.class);
			DataAccessUtil.newShape(shape);
			return true;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}*/
	
	@Override
	//jsonShapes is a json array of shapes
	public boolean newShapes(String jsonShapes) {
		//input param validation
		if(jsonShapes == null || jsonShapes.equals(""))
			return false;
		List<Shape> lstShape = null;
		try {
			lstShape = mapper.readValue(jsonShapes, new TypeReference<List<Shape>>(){});
			DataAccessUtil.newShapes(lstShape);
			return true;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public boolean existedShape(String shape_id) {
		//input param validation
		if(shape_id == null || shape_id.equals(""))
			return false;
		ShapePK pk = new ShapePK();
		pk.setAgency_id(getAgencyId());
		pk.setShape_id(shape_id);
		pk.setShape_pt_sequence(0);	//因为 shape_pt_sequence 字段是自动产生的,所以 seq=0 的存在性就代表了整个 shape_id 的存在性
		try {
			return DataAccessUtil.existedShape(pk);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public boolean deleteShapes(String shape_id) {
		//input param validation
		if(shape_id == null || shape_id.equals(""))
			return false;
		try {
			DataAccessUtil.deleteShapes(shape_id, getAgencyId());
			return true;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public List<Shape> getShapeListByShapeId(String shape_id) {
		if(shape_id == null) {
			System.out.println("Error: [GtfsEditImpl][getShapeList]: shape_id == null");
			return null;
		} else if(shape_id.equals("")) {
			System.out.println("Error: [GtfsEditImpl][getShapeList]: shape_id == empty string");
			return null;
		}
		List<Shape> lstShape = DataAccessUtil.getShapeList(shape_id, getAgencyId());
		return lstShape;
	}
	
	//--------------------------------------- Trip -----------------------------------------------
	@Override
	public boolean newTrip(String jsonTrip) {
		//input param validation
		if(jsonTrip == null || jsonTrip.equals(""))
			return false;
		Trip trip = null;
		try {
			trip = mapper.readValue(jsonTrip, Trip.class);
			DataAccessUtil.newTrip(trip);
			return true;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public boolean deleteTrip(String trip_id) {
		//input param validation
		if(trip_id == null || trip_id.equals(""))
			return false;
		TripPK pk = new TripPK();
		pk.setAgency_id(getAgencyId());
		pk.setTrip_id(trip_id);
		try {
			DataAccessUtil.deleteTrip(pk);
			return true;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public void deleteTripListByRouteAndServiceId(String params) throws JSONException {	//params is a json object, includes route_id and service_id
		//input param validation
		if(params == null || params.equals(""))
			return;
		JSONObject obj = new JSONObject(params);
		String route_id = obj.getString("route_id");
		String service_id = obj.getString("service_id");	
		DataAccessUtil.deleteTripListByRouteAndServiceId(route_id, service_id, getAgencyId());
	}
	
	@Override
	public List<Trip> getTripListByRouteAndServiceId(String params) throws JSONException {	//params is a json object, includes route_id and service_id
		JSONObject obj = new JSONObject(params);
		String route_id = obj.getString("route_id");
		String service_id = obj.getString("service_id");	
		List<Trip> lstTrip = DataAccessUtil.getTripListByRouteAndServiceId(route_id, service_id, getAgencyId());
		return lstTrip;
	}
	
	@Override
	public List<Trip> getTripOfRouteList(String route_id) {
		if(route_id == null || route_id.equals("")) {
			System.out.println("Error: [GtfsEditImpl][getTripOfRouteList]: route_id is empty");
			return null;
		}
		List<Trip> lstTrip = DataAccessUtil.getTripOfRouteList(route_id, getAgencyId());
		return lstTrip;
	}
	
	//--------------------------------------- StopTime -----------------------------------------------
	@Override
	public void newStopTime(String jsonStopTime) {
		//input param validation
		if(jsonStopTime == null || jsonStopTime.equals(""))
			return;
		StopTime stop_time = null;
		try {
			stop_time = mapper.readValue(jsonStopTime, StopTime.class);
			DataAccessUtil.newStopTime(stop_time);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Override
	public void deleteStopTime(String params) throws JSONException {
		//input param validation
		if(params == null || params.equals(""))
			return;
		JSONObject obj = new JSONObject(params);
		StopTimePK pk = new StopTimePK();
		pk.setAgency_id(getAgencyId());
		pk.setTrip_id(obj.getString("trip_id"));
		pk.setStop_id(obj.getString("stop_id"));
		DataAccessUtil.deleteStopTime(pk);
	}
	
	@Override
	public boolean deleteStopTimeByTripId(String trip_id) {
		//input param validation
		if(trip_id == null || trip_id.equals(""))
			return false;
		try {
			DataAccessUtil.deleteStopTimeByTripId(trip_id, getAgencyId());
			return true;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public List<StopTime> getStopTimeOfTripList(String trip_id) {
		if(trip_id == null || trip_id.equals(""))
			return null;
		List<StopTime> lstStopTime = DataAccessUtil.getStopTimeOfTripList(getAgencyId(), trip_id);
		return lstStopTime;
	}

	//--------------------------------------- ShapeStop (not a GTFS) -----------------------------------------------
	@Override
	public boolean newShapeStop(String jsonShapeStop) {
		//input param validation
		if(jsonShapeStop == null || jsonShapeStop.equals(""))
			return false;
		List<ShapeStop> lstShapeStop = null;
		try {
			lstShapeStop = mapper.readValue(jsonShapeStop, new TypeReference<List<ShapeStop>>(){});
			DataAccessUtil.newShapeStop(lstShapeStop);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public void deleteShapeStop(String shape_id) {
		//input param validation
		if(shape_id == null || shape_id.equals(""))
			return;
		try {
			DataAccessUtil.deleteShapeStopByShapeId(shape_id, getAgencyId());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
 
}

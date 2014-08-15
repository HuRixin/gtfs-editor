package irma.rt.edit.dao;

import java.util.List;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import irma.rt.edit.bean.*;

public class DataAccessUtil {
	private static EntityManagerFactory factory = Persistence.createEntityManagerFactory("irmaPU");

	public static AccountBean isAccountValid(String username, String password) {
		EntityManager em = factory.createEntityManager();
	    em.getTransaction().begin();  
	    AccountBean account = em.find(AccountBean.class, username);
	    em.getTransaction().commit();
	    em.close();
	    if(account == null || !password.equals(account.getPassword()))
	    	return null;
	    else
	    	return account;
	}
	
	public static void updateAccount(AccountBean account) {
		if(account == null)
			return;
		EntityManager em = factory.createEntityManager();
		AccountBean accountIdDb = em.find(AccountBean.class, account.getUsername());
		if(accountIdDb == null)
			return;
		accountIdDb.update(account);
		em.getTransaction().begin();
		em.persist(accountIdDb);
		em.getTransaction().commit();
		em.close();
	}
	
	//--------------------------------------- Agency -----------------------------------------------
	public static void newAgency(Agency agency) {
		if(agency == null) {
			System.out.println("Error: [DataAccessUtil][newAgency]: invalid input params");
			return;
		}
		EntityManager em = factory.createEntityManager();
	    em.getTransaction().begin();
	    //if "agency" doesn't exist, new it; if it exists, update it
	    Agency agencyInDb = em.find(Agency.class, agency.getAgency_id());
	    if(agencyInDb == null)
	    	em.persist(agency);
	    else {
	    	em.remove(agencyInDb);
	    	em.persist(agency);
	    }
	    em.getTransaction().commit();
	    em.close();
	}
	
	//this method is used for checking the existence of GTFS of a specific agency when creation
	//we suppose if there exists such an agency, that means there exists a whole pack of GTFS
	public static Boolean existedAgency(String agency_id) {
		// TODO Auto-generated method stub
		if(agency_id == null || agency_id.equals("")) {
			System.out.println("Error: [DataAccessUtil][newAgency]: invalid input params");
			return null;
		}
		EntityManager em = factory.createEntityManager();
	    Agency agencyInDb = em.find(Agency.class, agency_id);
	    em.close();
	    if(agencyInDb == null)
	    	return false;
	    else 
	    	return true;
	}

	public static void deleteAgency(String agency_id) {
		// TODO Auto-generated method stub
		if(agency_id == null) {
			System.out.println("Error: [DataAccessUtil][deleteAgency]: invalid input params");
			return;
		}
        EntityManager em = factory.createEntityManager();
        em.getTransaction().begin();
        Agency agencyInDb = em.find(Agency.class, agency_id);
        if(agencyInDb == null) {
			System.out.println("Error: [DataAccessUtil][deleteAgency]: agency doesn't exist");
			return;
        } else {
        	em.remove(agencyInDb);
        }
        em.getTransaction().commit();
        em.close();
	}
	
	public static Agency getAgency(String agency_id) {
		if(agency_id == null || agency_id.equals(""))
			return null;
        EntityManager em = factory.createEntityManager();
        Agency agency = em.find(Agency.class, agency_id);
        return agency;
	}

	//--------------------------------------- Calendar -----------------------------------------------
	public static void newCalendar(Calendar calendar) {
		if(calendar == null) {
			System.out.println("Error: [DataAccessUtil][newCalendar]: invalid input params");
			return;
		}
		EntityManager em = factory.createEntityManager();
	    em.getTransaction().begin();
	    //if "calendar" doesn't exist, new it; if it exists, update it
	    CalendarPK pk = new CalendarPK();
	    pk.setAgency_id(calendar.getAgency_id());
	    pk.setService_id(calendar.getService_id());
	    Calendar calendarInDb = em.find(Calendar.class, pk);
	    if(calendarInDb == null)	//new one
	    	em.persist(calendar);
	    else {	//update
	    	calendarInDb.update(calendar);
	    	em.persist(calendarInDb);
	    }
	    em.getTransaction().commit();
	    em.close();
	}
	
	public static boolean existedCalendar(CalendarPK pk) {
		if(pk == null) {
			System.out.println("Error: [DataAccessUtil][existedCalendar]: invalid input params");
			return false;
		}
		EntityManager em = factory.createEntityManager();
	    Calendar calendarInDb = em.find(Calendar.class, pk);
	    em.close();
	    if(calendarInDb == null)
	    	return false;
	    else {
	    	return true;
	    }
	}
	
	public static void deleteCalendar(CalendarPK pk) {
		// TODO Auto-generated method stub
		if(pk == null) {
			System.out.println("Error: [DataAccessUtil][deleteCalendar]: invalid input params");
			return;
		}
        EntityManager em = factory.createEntityManager();
        em.getTransaction().begin();
        Calendar calendarInDb = em.find(Calendar.class, pk);
        if(calendarInDb == null) {
			System.out.println("Error: [DataAccessUtil][deleteCalendar]: calendar doesn't exist");
			return;
        } else {
        	em.remove(calendarInDb);
        }
        em.getTransaction().commit();
        em.close();
	}
	
	@SuppressWarnings("unchecked")
	public static List<Calendar> getCalendarList(String agency_id) {
        EntityManager em = factory.createEntityManager();
        em.getTransaction().begin();
        List<Calendar> lstCalendar = em.createNamedQuery("Calendar.getCalendarByAgencyId").setParameter("agency_id", agency_id).getResultList();
        em.getTransaction().commit();
        em.close();
        return lstCalendar; 
	}
	
	//--------------------------------------- Stop -----------------------------------------------
	public static void newStop(Stop stop) {
		if(stop == null) {
			System.out.println("Error: [DataAccessUtil][newStop]: invalid input params");
			return;
		}
		EntityManager em = factory.createEntityManager();
	    em.getTransaction().begin();
	    //if "stop" doesn't exist, new it; if it exists, update it
	    StopPK pk = new StopPK();
	    pk.setAgency_id(stop.getAgency_id());
	    pk.setStop_id(stop.getStop_id());
	    Stop stopInDb = em.find(Stop.class, pk);
	    if(stopInDb == null)	//new one
	    	em.persist(stop);
	    else {	//update
	    	stopInDb.update(stop);
	    	em.persist(stopInDb);
	    }
	    em.getTransaction().commit();
	    em.close();
	}
	
	public static boolean existedStop(StopPK pk) {
		if(pk == null) {
			System.out.println("Error: [DataAccessUtil][existedStop]: invalid input params");
			return false;
		}
		EntityManager em = factory.createEntityManager();
	    Stop stopInDb = em.find(Stop.class, pk);
	    em.close();
	    if(stopInDb == null)
	    	return false;
	    else {
	    	return true;
	    }
	}
	
	public static void deleteStop(StopPK pk) {
		// TODO Auto-generated method stub
		if(pk == null) {
			System.out.println("Error: [DataAccessUtil][deleteStop]: invalid input params");
			return;
		}
        EntityManager em = factory.createEntityManager();
        em.getTransaction().begin();
        Stop stopInDb = em.find(Stop.class, pk);
        if(stopInDb == null) {
			System.out.println("Error: [DataAccessUtil][deleteStop]: stop doesn't exist");
			return;
        } else {
        	em.remove(stopInDb);
        }
        em.getTransaction().commit();
        em.close();
	}
	
	@SuppressWarnings("unchecked")
	public static List<Stop> getStopList(String agency_id) {
        EntityManager em = factory.createEntityManager();
        em.getTransaction().begin();
        List<Stop> lstStop = em.createNamedQuery("Stop.getStopByAgencyId").setParameter("agency_id", agency_id).getResultList();
        em.getTransaction().commit();
        em.close();
        return lstStop; 
	}
	
	@SuppressWarnings("unchecked")
	public static List<Stop> getStopOfTripList(String agency_id, String trip_id) {
        EntityManager em = factory.createEntityManager();
        em.getTransaction().begin();
        Query query = em.createNamedQuery("Stop.getStopByTripId");
        query.setParameter("agency_id", agency_id);
        query.setParameter("trip_id", trip_id);
        List<Stop> lstStop = query.getResultList();
        em.getTransaction().commit();
        em.close();
        return lstStop; 
	}
	
	@SuppressWarnings("unchecked")
	public static List<Stop> getStopOfShapeList(String agency_id, String shape_id) {
        EntityManager em = factory.createEntityManager();
        em.getTransaction().begin();
        Query query = em.createNamedQuery("Stop.getStopByShapeId");
        query.setParameter("agency_id", agency_id);
        query.setParameter("shape_id", shape_id);
        List<Stop> lstStop = query.getResultList();
        em.getTransaction().commit();
        em.close();
        return lstStop; 
	}
	
	//--------------------------------------- Route -----------------------------------------------
	public static void newRoute(Route route) {
		if(route == null) {
			System.out.println("Error: [DataAccessUtil][newRoute]: invalid input params");
			return;
		}
		EntityManager em = factory.createEntityManager();
	    em.getTransaction().begin();
	    //if "route" doesn't exist, new it; if it exists, update it
	    RoutePK pk = new RoutePK();
	    pk.setAgency_id(route.getAgency_id());
	    pk.setRoute_id(route.getRoute_id());
	    Route routeInDb = em.find(Route.class, pk);
	    if(routeInDb == null)	//new one
	    	em.persist(route);
	    else {	//update
	    	routeInDb.update(route);
	    	em.persist(routeInDb);
	    }
	    em.getTransaction().commit();
	    em.close();
	}
	
	public static boolean existedRoute(RoutePK pk) {
		if(pk == null) {
			System.out.println("Error: [DataAccessUtil][existedRoute]: invalid input params");
			return false;
		}
		EntityManager em = factory.createEntityManager();
	    Route routeInDb = em.find(Route.class, pk);
	    em.close();
	    if(routeInDb == null)
	    	return false;
	    else {
	    	return true;
	    }
	}
	
	public static void deleteRoute(RoutePK pk) {
		// TODO Auto-generated method stub
		if(pk == null) {
			System.out.println("Error: [DataAccessUtil][deleteRoute]: invalid input params");
			return;
		}
        EntityManager em = factory.createEntityManager();
        em.getTransaction().begin();
        Route routeInDb = em.find(Route.class, pk);
        if(routeInDb == null) {
			System.out.println("Error: [DataAccessUtil][deleteRoute]: route doesn't exist");
			return;
        } else {
        	em.remove(routeInDb);
        }
        em.getTransaction().commit();
        em.close();
	}
	
	@SuppressWarnings("unchecked")
	public static List<Route> getRouteList(String agency_id) {
        EntityManager em = factory.createEntityManager();
        em.getTransaction().begin();
        List<Route> lstRoute = em.createNamedQuery("Route.getRouteByAgencyId").setParameter("agency_id", agency_id).getResultList();
        em.getTransaction().commit();
        em.close();
        return lstRoute; 
	}
	
	//--------------------------------------- Shape -----------------------------------------------
/*	public static void newShape(Shape shape) {
		if(shape == null) {
			System.out.println("Error: [DataAccessUtil][newShape]: invalid input params");
			return;
		}
		EntityManager em = factory.createEntityManager();
	    em.getTransaction().begin();
	    em.persist(shape);
	    em.getTransaction().commit();
	    em.close();
	}*/
	
	public static void newShapes(List<Shape> listShapes) {
		if(listShapes == null) {
			System.out.println("Error: [DataAccessUtil][newShapes]: invalid input params");
			return;
		}
		Shape shapeT = listShapes.get(0);
		deleteShapes(shapeT.getShape_id(), shapeT.getAgency_id());
		EntityManager em = factory.createEntityManager();
	    em.getTransaction().begin();
	    
	    for(Shape shape : listShapes)
	    	em.persist(shape);
	    em.getTransaction().commit();
	    em.close();
	}
	
	public static boolean existedShape(ShapePK pk) {
		if(pk == null) {
			System.out.println("Error: [DataAccessUtil][existedShape]: invalid input params");
			return false;
		}
		EntityManager em = factory.createEntityManager();
	    Shape shapeInDb = em.find(Shape.class, pk);
	    em.close();
	    if(shapeInDb == null)
	    	return false;
	    else {
	    	return true;
	    }
	}
	
	public static void deleteShapes(String shape_id, String agency_id) {
		// TODO Auto-generated method stub
		if(shape_id == null) {
			System.out.println("Error: [DataAccessUtil][deleteShapes]: invalid input params");
			return;
		}
        EntityManager em = factory.createEntityManager();
        em.getTransaction().begin();
        Query query = em.createQuery("DELETE FROM Shape s WHERE shape_id=:shape_id AND agency_id=:agency_id");
        query.setParameter("shape_id", shape_id);
        query.setParameter("agency_id", agency_id);
        query.executeUpdate();
        em.getTransaction().commit();
        em.close();
	}
	
	//return shapes of a specific shape ID
	@SuppressWarnings("unchecked")
	public static List<Shape> getShapeList(String shape_id, String agency_id) {
        EntityManager em = factory.createEntityManager();
        em.getTransaction().begin();
        Query query = em.createNamedQuery("Shape.getShapeByShapeId");
        query.setParameter("shape_id", shape_id);
        query.setParameter("agency_id", agency_id);
        List<Shape> lstShape = query.getResultList();
        em.getTransaction().commit();
        em.close();
        return lstShape; 
	}
	
	//return all shapes
	@SuppressWarnings("unchecked")
	public static List<Shape> getAllShapeList(String agency_id) {
        EntityManager em = factory.createEntityManager();
        em.getTransaction().begin();
        Query query = em.createNamedQuery("Shape.getShapeByAgencyId").setParameter("agency_id", agency_id);
        List<Shape> lstShape = query.getResultList();
        em.getTransaction().commit();
        em.close();
        return lstShape; 
	}
	
	//--------------------------------------- Trip -----------------------------------------------
	public static void newTrip(Trip trip) {
		if(trip == null) {
			System.out.println("Error: [DataAccessUtil][newTrip]: invalid input params");
			return;
		}
		EntityManager em = factory.createEntityManager();
	    em.getTransaction().begin();
	    //if "trip" doesn't exist, new it; if it exists, update it
	    TripPK pk = new TripPK();
	    pk.setAgency_id(trip.getAgency_id());
	    pk.setTrip_id(trip.getTrip_id());
	    Trip tripInDb = em.find(Trip.class, pk);
	    if(tripInDb == null)	//new one
	    	em.persist(trip);
	    else {	//update
	    	tripInDb.update(trip);
	    	em.persist(tripInDb);
	    }
	    em.getTransaction().commit();
	    em.close();
	}
	
	public static void deleteTrip(TripPK pk) {
		if(pk == null) {
			System.out.println("Error: [DataAccessUtil][deleteTrip]: invalid input params");
			return;
		}
        EntityManager em = factory.createEntityManager();
        em.getTransaction().begin();
        Trip tripInDb = em.find(Trip.class, pk);
        if(tripInDb == null) {
			System.out.println("Error: [DataAccessUtil][deleteTrip]: trip doesn't exist");
			return;
        } else {
        	em.remove(tripInDb);
        }
        em.getTransaction().commit();
        em.close();
	}
	
	public static void deleteTripListByRouteAndServiceId(String route_id, String service_id, String agency_id) {
        EntityManager em = factory.createEntityManager();
        em.getTransaction().begin();
        Query query = em.createQuery("DELETE FROM Trip t WHERE t.route_id=:route_id AND t.service_id=:service_id AND t.agency_id=:agency_id");
        query.setParameter("route_id", route_id);
        query.setParameter("service_id", service_id);
        query.setParameter("agency_id", agency_id);
        query.executeUpdate();
        em.getTransaction().commit();
        em.close();
	}
	
	@SuppressWarnings("unchecked")
	public static List<Trip> getTripListByRouteAndServiceId(String route_id, String service_id, String agency_id) {
        EntityManager em = factory.createEntityManager();
        em.getTransaction().begin();
        Query query = em.createNamedQuery("Trip.getTripByRouteAndServiceId");
        query.setParameter("route_id", route_id);
        query.setParameter("service_id", service_id);
        query.setParameter("agency_id", agency_id);
        List<Trip> lstTrip = query.getResultList();
        em.getTransaction().commit();
        em.close();
        return lstTrip; 
	}
	
	@SuppressWarnings("unchecked")
	public static List<Trip> getTripOfRouteList(String route_id, String agency_id) {
		// TODO Auto-generated method stub
        EntityManager em = factory.createEntityManager();
        em.getTransaction().begin();
        Query query = em.createNamedQuery("Trip.getTripByRouteId");
        query.setParameter("agency_id", agency_id);
        query.setParameter("route_id", route_id);
        List<Trip> lstTrip = query.getResultList();
        em.getTransaction().commit();
        em.close();
        return lstTrip;
	}
	
	@SuppressWarnings("unchecked")
	public static List<Trip> getTripList(String agency_id) {
        EntityManager em = factory.createEntityManager();
        em.getTransaction().begin();
        List<Trip> lstTrip = em.createNamedQuery("Trip.getTripByAgencyId").setParameter("agency_id", agency_id).getResultList();
        em.getTransaction().commit();
        em.close();
        return lstTrip; 
	}
	
	//--------------------------------------- StopTime -----------------------------------------------
	public static void newStopTime(StopTime stop_time) {
		if(stop_time == null) {
			System.out.println("Error: [DataAccessUtil][newStopTime]: invalid input params");
			return;
		}
		EntityManager em = factory.createEntityManager();
	    em.getTransaction().begin();
	    //if "stop_time" doesn't exist, new it; if it exists, update it
		StopTimePK pk = new StopTimePK();
		pk.setAgency_id(stop_time.getAgency_id());
		pk.setTrip_id(stop_time.getTrip_id());
		pk.setStop_id(stop_time.getStop_id());
	    StopTime stopTimeInDb = em.find(StopTime.class, pk);
	    if(stopTimeInDb == null)	//new one
	    	em.persist(stop_time);
	    else {	//update
	    	stopTimeInDb.update(stop_time);
	    	em.persist(stopTimeInDb);
	    }
	    em.getTransaction().commit();
	    em.close();
	}
	
	public static void deleteStopTime(StopTimePK pk) {
		// TODO Auto-generated method stub
		if(pk == null) {
			System.out.println("Error: [DataAccessUtil][deleteStopTime]: invalid input params");
			return;
		}
        EntityManager em = factory.createEntityManager();
        em.getTransaction().begin();
        StopTime stopTimeInDb = em.find(StopTime.class, pk);
        if(stopTimeInDb == null) {
			System.out.println("Error: [DataAccessUtil][deleteStopTime]: stop_time doesn't exist");
			return;
        } else {
        	em.remove(stopTimeInDb);
        }
        em.getTransaction().commit();
        em.close();
	}
	
	public static void deleteStopTimeByTripId(String trip_id, String agency_id) {
		// TODO Auto-generated method stub
		if(trip_id == null || trip_id == null) {
			System.out.println("Error: [DataAccessUtil][deleteStopTimes]: invalid input params");
			return;
		}
        EntityManager em = factory.createEntityManager();
        em.getTransaction().begin();
        Query query = em.createQuery("DELETE FROM StopTime st WHERE st.trip_id=:trip_id AND st.agency_id=:agency_id");
        query.setParameter("trip_id", trip_id);
        query.setParameter("agency_id", agency_id);
        query.executeUpdate();
        em.getTransaction().commit();
        em.close();
	}
	
	@SuppressWarnings("unchecked")
	public static List<StopTime> getStopTimeOfTripList(String agency_id, String trip_id) {
		if(trip_id == null || trip_id.equals(""))
			return null;
        EntityManager em = factory.createEntityManager();
        em.getTransaction().begin();  
        Query query = em.createNamedQuery("StopTime.getStopTimesOfTrip");
        query.setParameter("agency_id", agency_id);
        query.setParameter("trip_id", trip_id);
        List<StopTime> lstStopTime = query.getResultList();
        em.getTransaction().commit();
        em.close();
        return lstStopTime; 
	}
	
	//return all shapes
	@SuppressWarnings("unchecked")
	public static List<StopTime> getStopTimeList(String agency_id) {
        EntityManager em = factory.createEntityManager();
        em.getTransaction().begin();
        List<StopTime> lstStopTime = em.createNamedQuery("StopTime.getStopTimesByAgency").setParameter("agency_id", agency_id).getResultList();
        em.getTransaction().commit();
        em.close();
        return lstStopTime; 
	}
	
	//--------------------------------------- ShapeStop (not a GTFS) -----------------------------------------------
	public static void newShapeStop(List<ShapeStop> lstShapeStop) {
		if(lstShapeStop == null) {
			System.out.println("Error: [DataAccessUtil][newShapeStop]: invalid input params");
			return;
		} else if(lstShapeStop.size() == 0) {
			return;
		}
		ShapeStop shapeStop = lstShapeStop.get(0);
		deleteShapeStopByShapeId(shapeStop.getShape_id(), shapeStop.getAgency_id());
		EntityManager em = factory.createEntityManager();
	    em.getTransaction().begin();
	    for(ShapeStop shape_stop : lstShapeStop)
	    	em.persist(shape_stop);
	    em.getTransaction().commit();
	    em.close();
	}

	public static void deleteShapeStopByShapeId(String shape_id, String agency_id) {
		// TODO Auto-generated method stub
		if(shape_id == null || agency_id == null) {
			System.out.println("Error: [DataAccessUtil][deleteStopTimes]: invalid input params");
			return;
		}
        EntityManager em = factory.createEntityManager();
        em.getTransaction().begin();
        Query query = em.createQuery("DELETE FROM ShapeStop ss WHERE ss.shape_id=:shape_id AND ss.agency_id=:agency_id");
        query.setParameter("shape_id", shape_id);
        query.setParameter("agency_id", agency_id);
        query.executeUpdate();
        em.getTransaction().commit();
        em.close();
	}

}

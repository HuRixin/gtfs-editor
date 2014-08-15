/*
 * GTFS ref: https://developers.google.com/transit/gtfs/reference#trips_fields
 */

package irma.rt.edit.bean;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "trip")
@IdClass(TripPK.class)
@NamedQueries ({
	@NamedQuery(name="Trip.getTripByRouteAndServiceId", query="SELECT t FROM Trip t WHERE t.agency_id=:agency_id AND t.route_id=:route_id AND t.service_id=:service_id"),
	@NamedQuery(name="Trip.getTripByRouteId", query="SELECT t FROM Trip t WHERE t.agency_id=:agency_id AND t.route_id = :route_id ORDER BY t.trip_id"),
	@NamedQuery(name="Trip.getTripByAgencyId", query="SELECT t FROM Trip t WHERE t.agency_id=:agency_id")
})
@XmlRootElement(name="Trip")
public class Trip {
	@Id
	private String trip_id;
	@Id
	private String agency_id;
	private String route_id;
	private String service_id;
	private String trip_headsign;
	private String trip_short_name;
	private int direction_id;
	private String block_id;
	private String shape_id;
	private int wheelchair_accessible;
	private int bikes_allowed;
	
	public String getRoute_id() {
		return route_id;
	}
	public void setRoute_id(String route_id) {
		this.route_id = route_id;
	}
	public String getAgency_id() {
		return agency_id;
	}
	public void setAgency_id(String agency_id) {
		this.agency_id = agency_id;
	}
	public String getService_id() {
		return service_id;
	}
	public void setService_id(String service_id) {
		this.service_id = service_id;
	}
	@Id
	public String getTrip_id() {
		return trip_id;
	}
	public void setTrip_id(String trip_id) {
		this.trip_id = trip_id;
	}
	public String getTrip_headsign() {
		return trip_headsign;
	}
	public void setTrip_headsign(String trip_headsign) {
		this.trip_headsign = trip_headsign;
	}
	public String getTrip_short_name() {
		return trip_short_name;
	}
	public void setTrip_short_name(String trip_short_name) {
		this.trip_short_name = trip_short_name;
	}
	public int getDirection_id() {
		return direction_id;
	}
	public void setDirection_id(int direction_id) {
		this.direction_id = direction_id;
	}
	public String getBlock_id() {
		return block_id;
	}
	public void setBlock_id(String block_id) {
		this.block_id = block_id;
	}
	public String getShape_id() {
		return shape_id;
	}
	public void setShape_id(String shape_id) {
		this.shape_id = shape_id;
	}
	public int getWheelchair_accessible() {
		return wheelchair_accessible;
	}
	public void setWheelchair_accessible(int wheelchair_accessible) {
		this.wheelchair_accessible = wheelchair_accessible;
	}
	public int getBikes_allowed() {
		return bikes_allowed;
	}
	public void setBikes_allowed(int bikes_allowed) {
		this.bikes_allowed = bikes_allowed;
	}
	
	//Update: reset all fields (except PK: agency_id+trip_id) with the input parameter 'trip'
	public void update(Trip trip) {
		if(trip == null)
			return;
		this.route_id = trip.route_id;
		this.service_id = trip.service_id;
		this.trip_headsign = trip.trip_headsign;
		this.trip_short_name = trip.trip_short_name;
		this.direction_id  = trip.direction_id;
		this.block_id = trip.block_id;
		this.shape_id = trip.shape_id;
		this.wheelchair_accessible = trip.wheelchair_accessible;
		this.bikes_allowed = trip.bikes_allowed;
	}
}

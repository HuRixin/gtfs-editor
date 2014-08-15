/*
 *  GTFS ref: https://developers.google.com/transit/gtfs/reference#stops_fields
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
@Table(name = "stop")
@IdClass(StopPK.class)
@NamedQueries ({
	@NamedQuery(name="Stop.getStopByAgencyId", query="SELECT s FROM Stop s WHERE s.agency_id=:agency_id"),
	@NamedQuery(name="Stop.getStopByTripId", 
	query="SELECT s FROM Stop s WHERE s.agency_id=:agency_id AND s.stop_id IN "
			+ "(SELECT stop_id FROM ShapeStop ss "
			+ "WHERE ss.agency_id=:agency_id AND ss.shape_id=(SELECT t.shape_id FROM Trip t WHERE t.trip_id=:trip_id AND t.agency_id=:agency_id))"),
	@NamedQuery(name="Stop.getStopByShapeId", 
	query="SELECT s FROM Stop s WHERE s.agency_id=:agency_id AND s.stop_id IN "
			+ "(SELECT stop_id FROM ShapeStop ss "
			+ "WHERE ss.agency_id=:agency_id AND ss.shape_id=:shape_id)")		
})
@XmlRootElement(name="Stop")
	public class Stop {
	@Id
	private String stop_id;
	@Id
	private String agency_id;
	private String stop_code;
	private String stop_name;
	private String stop_desc;
	private double stop_lat;
	private double stop_lon;
	private String zone_id;
	private String stop_url;
	private int location_type;
	private int parent_station;
	private String stop_timezone;
	private int wheelchair_boarding;
	
	@Id
	public String getStop_id() {
		return stop_id;
	}
	public void setStop_id(String stop_id) {
		this.stop_id = stop_id;
	}
	public String getAgency_id() {
		return agency_id;
	}
	public void setAgency_id(String agency_id) {
		this.agency_id = agency_id;
	}
	public String getStop_code() {
		return stop_code;
	}
	public void setStop_code(String stop_code) {
		this.stop_code = stop_code;
	}
	public String getStop_name() {
		return stop_name;
	}
	public void setStop_name(String stop_name) {
		this.stop_name = stop_name;
	}
	public String getStop_desc() {
		return stop_desc;
	}
	public void setStop_desc(String stop_desc) {
		this.stop_desc = stop_desc;
	}
	public double getStop_lat() {
		return stop_lat;
	}
	public void setStop_lat(double stop_lat) {
		this.stop_lat = stop_lat;
	}
	public double getStop_lon() {
		return stop_lon;
	}
	public void setStop_lon(double stop_lon) {
		this.stop_lon = stop_lon;
	}
	public String getZone_id() {
		return zone_id;
	}
	public void setZone_id(String zone_id) {
		this.zone_id = zone_id;
	}
	public String getStop_url() {
		return stop_url;
	}
	public void setStop_url(String stop_url) {
		this.stop_url = stop_url;
	}
	public int getLocation_type() {
		return location_type;
	}
	public void setLocation_type(int location_type) {
		this.location_type = location_type;
	}
	public int getParent_station() {
		return parent_station;
	}
	public void setParent_station(int parent_station) {
		this.parent_station = parent_station;
	}
	public String getStop_timezone() {
		return stop_timezone;
	}
	public void setStop_timezone(String stop_timezone) {
		this.stop_timezone = stop_timezone;
	}
	public int getWheelchair_boarding() {
		return wheelchair_boarding;
	}
	public void setWheelchair_boarding(int wheelchair_boarding) {
		this.wheelchair_boarding = wheelchair_boarding;
	}
	
	//Update: reset all fields (except PK: agency_id+stop_id) with the input parameter 'stop'
	public void update(Stop stop) {
		if(stop == null) return;
		this.stop_code = stop.stop_code;
		this.stop_name = stop.stop_name;
		this.stop_desc = stop.stop_desc;
		this.stop_lat = stop.stop_lat;
		this.stop_lon = stop.stop_lon;
		this.zone_id = stop.zone_id;
		this.stop_url = stop.stop_url;
		this.location_type = stop.location_type;
		this.parent_station = stop.parent_station;
		this.stop_timezone = stop.stop_timezone;
		this.wheelchair_boarding = stop.wheelchair_boarding;
	}
}

/*
 * GTFS ref: https://developers.google.com/transit/gtfs/reference#stop_times_fields
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
@Table(name="stop_time")
@IdClass(StopTimePK.class)
@NamedQueries({
	@NamedQuery(name="StopTime.getStopTimesByAgency", query="SELECT st FROM StopTime st WHERE st.agency_id=:agency_id"),
	@NamedQuery(name="StopTime.getStopTimesOfTrip", query="SELECT st FROM StopTime st WHERE st.trip_id=:trip_id AND st.agency_id=:agency_id ORDER BY st.stop_sequence"),
})
@XmlRootElement(name="StopTime")
public class StopTime {
	
	@Id
	private String agency_id;
	@Id
	private String trip_id;
	@Id
	private String stop_id;
	private String arrival_time;
	private String departure_time;
	private int stop_sequence;
	private String stop_headsign;
	private int pickup_type;
	private int drop_off_type;
	private int shape_dist_traveled;
	
	public String getAgency_id() {
		return agency_id;
	}
	public void setAgency_id(String agency_id) {
		this.agency_id = agency_id;
	}
	public String getTrip_id() {
		return trip_id;
	}
	public void setTrip_id(String trip_id) {
		this.trip_id = trip_id;
	}
	public String getArrival_time() {
		return arrival_time;
	}
	public void setArrival_time(String arrival_time) {
		this.arrival_time = arrival_time;
	}
	public String getDeparture_time() {
		return departure_time;
	}
	public void setDeparture_time(String departure_time) {
		this.departure_time = departure_time;
	}
	public String getStop_id() {
		return stop_id;
	}
	public void setStop_id(String stop_id) {
		this.stop_id = stop_id;
	}
	public int getStop_sequence() {
		return stop_sequence;
	}
	public void setStop_sequence(int stop_sequence) {
		this.stop_sequence = stop_sequence;
	}
	public String getStop_headsign() {
		return stop_headsign;
	}
	public void setStop_headsign(String stop_headsign) {
		this.stop_headsign = stop_headsign;
	}
	public int getPickup_type() {
		return pickup_type;
	}
	public void setPickup_type(int pickup_type) {
		this.pickup_type = pickup_type;
	}
	public int getDrop_off_type() {
		return drop_off_type;
	}
	public void setDrop_off_type(int drop_off_type) {
		this.drop_off_type = drop_off_type;
	}
	public int getShape_dist_traveled() {
		return shape_dist_traveled;
	}
	public void setShape_dist_traveled(int shape_dist_traveled) {
		this.shape_dist_traveled = shape_dist_traveled;
	}
	
	//Update: reset all fields (except PK: agency_id+trip_id+stop_id) with the input parameter 'stop_time'
		public void update(StopTime stop_time) {
			if(stop_time == null) return;
			this.arrival_time = stop_time.arrival_time;
			this.departure_time = stop_time.departure_time;
			this.stop_sequence = stop_time.stop_sequence;
			this.stop_headsign = stop_time.stop_headsign;
			this.pickup_type = stop_time.pickup_type;
			this.drop_off_type = stop_time.drop_off_type;
			this.shape_dist_traveled = stop_time.shape_dist_traveled;
		}

}

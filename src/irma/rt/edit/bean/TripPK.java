package irma.rt.edit.bean;

import java.io.Serializable;

public class TripPK implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String trip_id;
	private String agency_id;

	public String getTrip_id() {
		return trip_id;
	}

	public void setTrip_id(String trip_id) {
		this.trip_id = trip_id;
	}

	public String getAgency_id() {
		return agency_id;
	}

	public void setAgency_id(String agency_id) {
		this.agency_id = agency_id;
	}

	public TripPK() {}
	
	@Override
	public int hashCode() {
		return super.hashCode();
	}
	
	@Override
	public boolean equals(Object obj) {
		return super.equals(obj);
	}
}

package irma.rt.edit.bean;

import java.io.Serializable;

public class RoutePK implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String route_id;
	private String agency_id;

	public String getAgency_id() {
		return agency_id;
	}

	public void setAgency_id(String agency_id) {
		this.agency_id = agency_id;
	}
	
	@Override
	public int hashCode() {
		return super.hashCode();
	}
	
	@Override
	public boolean equals(Object obj) {
		return super.equals(obj);
	}

	public String getRoute_id() {
		return route_id;
	}

	public void setRoute_id(String route_id) {
		this.route_id = route_id;
	}
}

package irma.rt.edit.bean;

import java.io.Serializable;

public class CalendarPK implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String service_id;
	private String agency_id;

	public String getService_id() {
		return service_id;
	}

	public void setService_id(String service_id) {
		this.service_id = service_id;
	}

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
}

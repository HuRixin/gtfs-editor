package irma.rt.edit.bean;

import java.io.Serializable;

public class StopPK implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String stop_id;
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

	public String getStop_id() {
		return stop_id;
	}

	public void setStop_id(String stop_id) {
		this.stop_id = stop_id;
	}

}

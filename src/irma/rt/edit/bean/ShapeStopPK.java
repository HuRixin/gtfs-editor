package irma.rt.edit.bean;

import java.io.Serializable;

public class ShapeStopPK implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String shape_id;
	private String stop_id;
	private String agency_id;
	
	public String getShape_id() {
		return shape_id;
	}

	public void setShape_id(String shape_id) {
		this.shape_id = shape_id;
	}

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

	public ShapeStopPK() {}
	
	@Override
	public int hashCode() {
		return super.hashCode();
	}
	
	@Override
	public boolean equals(Object obj) {
		return super.equals(obj);
	}
}

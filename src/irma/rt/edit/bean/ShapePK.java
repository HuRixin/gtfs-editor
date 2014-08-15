package irma.rt.edit.bean;

import java.io.Serializable;

public class ShapePK implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String shape_id;
	private String agency_id;
	private int shape_pt_sequence;

	public String getShape_id() {
		return shape_id;
	}

	public void setShape_id(String shape_id) {
		this.shape_id = shape_id;
	}

	public String getAgency_id() {
		return agency_id;
	}

	public void setAgency_id(String agency_id) {
		this.agency_id = agency_id;
	}

	public int getShape_pt_sequence() {
		return shape_pt_sequence;
	}

	public void setShape_pt_sequence(int shape_pt_sequence) {
		this.shape_pt_sequence = shape_pt_sequence;
	}

	public ShapePK() {}
	
	@Override
	public int hashCode() {
		return super.hashCode();
	}
	
	@Override
	public boolean equals(Object obj) {
		return super.equals(obj);
	}
}

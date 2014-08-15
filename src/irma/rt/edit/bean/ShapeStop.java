/*
  * This table is not one of GTFS files, just to indicate the relationships between SHAPE and STOPS
  */

package irma.rt.edit.bean;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@IdClass(ShapeStopPK.class)
@Table(name = "shape_stop")
public class ShapeStop {
	@Id
	private String shape_id;
	@Id
	private String stop_id;
	@Id
	private String agency_id;
	
	public String getAgency_id() {
		return agency_id;
	}
	public void setAgency_id(String agency_id) {
		this.agency_id = agency_id;
	}
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
	
}

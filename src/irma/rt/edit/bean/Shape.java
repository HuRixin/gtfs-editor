/*
 * GTFS ref: https://developers.google.com/transit/gtfs/reference#shapes_fields
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
@Table(name = "shape")
@IdClass(ShapePK.class)
@NamedQueries ({
	@NamedQuery(name="Shape.getShapeByShapeId", query="SELECT s FROM Shape s WHERE s.agency_id=:agency_id AND s.shape_id=:shape_id"),
	@NamedQuery(name="Shape.getShapeByAgencyId", query="SELECT s FROM Shape s WHERE s.agency_id=:agency_id"),
	//@NamedQuery(name="Shape.deleteShapesByShapeId", query="DELETE FROM Shape s WHERE shape_id=:shape_id")
})
@XmlRootElement(name="Shape")
public class Shape {
	@Id
	private String shape_id;
	@Id
	private String agency_id;
	@Id
	private int shape_pt_sequence;
	private double shape_pt_lat;
	private double shape_pt_lon;
	private int shape_dist_traveled;
	
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
	public double getShape_pt_lat() {
		return shape_pt_lat;
	}
	public void setShape_pt_lat(double shape_pt_lat) {
		this.shape_pt_lat = shape_pt_lat;
	}
	public double getShape_pt_lon() {
		return shape_pt_lon;
	}
	public void setShape_pt_lon(double shape_pt_lon) {
		this.shape_pt_lon = shape_pt_lon;
	}
	public int getShape_pt_sequence() {
		return shape_pt_sequence;
	}
	public void setShape_pt_sequence(int shape_pt_sequence) {
		this.shape_pt_sequence = shape_pt_sequence;
	}
	public int getShape_dist_traveled() {
		return shape_dist_traveled;
	}
	public void setShape_dist_traveled(int shape_dist_traveled) {
		this.shape_dist_traveled = shape_dist_traveled;
	}
	  
}

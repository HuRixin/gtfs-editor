/*
 * GTFS ref: https://developers.google.com/transit/gtfs/reference#routes_fields
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
@Table(name = "route")
@IdClass(RoutePK.class)
@NamedQueries ({
	@NamedQuery(name="Route.getRouteByAgencyId", query="SELECT r FROM Route r WHERE r.agency_id=:agency_id")
})
@XmlRootElement(name="Route")
public class Route {
	@Id
	private String route_id;
	@Id
	private String agency_id;
	private String route_short_name;
	private String route_long_name;
	private String route_desc;
	private int route_type;
	private String route_url;
	private String route_color;
	private String route_text_color;
	
	@Id
	public String getRoute_id() {
		return route_id;
	}
	public void setRoute_id(String route_id) {
		this.route_id = route_id;
	}
	public String getAgency_id() {
		return agency_id;
	}
	public void setAgency_id(String agency_id) {
		this.agency_id = agency_id;
	}
	public String getRoute_short_name() {
		return route_short_name;
	}
	public void setRoute_short_name(String route_short_name) {
		this.route_short_name = route_short_name;
	}
	public String getRoute_long_name() {
		return route_long_name;
	}
	public void setRoute_long_name(String route_long_name) {
		this.route_long_name = route_long_name;
	}
	public String getRoute_desc() {
		return route_desc;
	}
	public void setRoute_desc(String route_desc) {
		this.route_desc = route_desc;
	}
	public int getRoute_type() {
		return route_type;
	}
	public void setRoute_type(int route_type) {
		this.route_type = route_type;
	}
	public String getRoute_url() {
		return route_url;
	}
	public void setRoute_url(String route_url) {
		this.route_url = route_url;
	}
	public String getRoute_color() {
		return route_color;
	}
	public void setRoute_color(String route_color) {
		this.route_color = route_color;
	}
	public String getRoute_text_color() {
		return route_text_color;
	}
	public void setRoute_text_color(String route_text_color) {
		this.route_text_color = route_text_color;
	}
	
	//Update: reset all fields (except PK: agency_id+route_id) with the input parameter 'route'
	public void update(Route route) {
		if(route == null) return;
			this.route_short_name = route.route_short_name;
			this.route_long_name = route.route_long_name;
			this.route_desc = route.route_desc;
			this.route_type = route.route_type;
			this.route_url = route.route_url;
			this.route_color = route.route_color;
			this.route_text_color = route.route_text_color;
	}
}

/*
 * GTFS ref: https://developers.google.com/transit/gtfs/reference#calendar_fields
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
@Table(name = "calendar")
@IdClass(CalendarPK.class)
@NamedQueries ({
	@NamedQuery(name="Calendar.getCalendarByAgencyId", query="SELECT c FROM Calendar c WHERE c.agency_id=:agency_id"),
})
@XmlRootElement(name="Calendar")
public class Calendar {
	@Id
	private String service_id;
	private String monday;
	private String tuesday;
	private String wednesday;
	private String thursday;
	private String friday;
	private String saturday;
	private String sunday; 
	private String start_date; 
	private String end_date; 
	@Id
	private String agency_id;
	
	//Update: reset all fields (except PK: agency_id+service_id) with the input parameter 'calendar'
	public void update(Calendar calendar) {
		if(calendar == null) return;
		this.start_date = calendar.start_date;
		this.end_date = calendar.end_date;
		this.monday = calendar.monday;
		this.tuesday = calendar.tuesday;
		this.wednesday = calendar.wednesday;
		this.thursday = calendar.thursday;
		this.friday = calendar.friday;
		this.saturday = calendar.saturday;
		this.sunday = calendar.sunday;
	}
	
	public String getService_id() {
		return service_id;
	}
	public void setService_id(String service_id) {
		this.service_id = service_id;
	}
	public String getMonday() {
		return monday;
	}
	public void setMonday(String monday) {
		this.monday = monday;
	}
	public String getAgency_id() {
		return agency_id;
	}
	public void setAgency_id(String agency_id) {
		this.agency_id = agency_id;
	}
	public String getTuesday() {
		return tuesday;
	}
	public void setTuesday(String tuesday) {
		this.tuesday = tuesday;
	}
	public String getWednesday() {
		return wednesday;
	}
	public void setWednesday(String wednesday) {
		this.wednesday = wednesday;
	}
	public String getThursday() {
		return thursday;
	}
	public void setThursday(String thursday) {
		this.thursday = thursday;
	}
	public String getFriday() {
		return friday;
	}
	public void setFriday(String friday) {
		this.friday = friday;
	}
	public String getSaturday() {
		return saturday;
	}
	public void setSaturday(String saturday) {
		this.saturday = saturday;
	}
	public String getSunday() {
		return sunday;
	}
	public void setSunday(String sunday) {
		this.sunday = sunday;
	}
	public String getStart_date() {
		return start_date;
	}
	public void setStart_date(String start_date) {
		this.start_date = start_date;
	}
	public String getEnd_date() {
		return end_date;
	}
	public void setEnd_date(String end_date) {
		this.end_date = end_date;
	}
}

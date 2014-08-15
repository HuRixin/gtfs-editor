package irma.rt.edit.bean;
import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "targets")
@NamedQueries ({
	@NamedQuery(name="Targets.getTargets", query="SELECT c FROM Targets c"),
})
public class Targets {
	@Id
	private long uid;
	private long eid;
	private String code;
	private String description;
	private String shortdescription;
	private String longdescription;
	private String address;
	private double latitude;
	private double longitude;
	private String notes;
	private String vocalmessagecode;
	private String externalcode;
	private int direction;
	private int directiondelta;
	private int radius;
	private int radiusunit;
	private int radiusdelta;
	private int maintarget;
	private String visibleinsl;
	private int transit;
	private int enabled;
	private int vocalmessageenabled;
	private String boldinsl;
	private long targettypeuid;
	private Timestamp lastupdate;
	@Id
	public long getUid() {
		return uid;
	}
	public void setUid(long uid) {
		this.uid = uid;
	}
	public long getEid() {
		return eid;
	}
	public void setEid(long eid) {
		this.eid = eid;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getShortdescription() {
		return shortdescription;
	}
	public void setShortdescription(String shortdescription) {
		this.shortdescription = shortdescription;
	}
	public String getLongdescription() {
		return longdescription;
	}
	public void setLongdescription(String longdescription) {
		this.longdescription = longdescription;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public String getVocalmessagecode() {
		return vocalmessagecode;
	}
	public void setVocalmessagecode(String vocalmessagecode) {
		this.vocalmessagecode = vocalmessagecode;
	}
	public String getExternalcode() {
		return externalcode;
	}
	public void setExternalcode(String externalcode) {
		this.externalcode = externalcode;
	}
	public int getDirection() {
		return direction;
	}
	public void setDirection(int direction) {
		this.direction = direction;
	}
	public int getDirectiondelta() {
		return directiondelta;
	}
	public void setDirectiondelta(int directiondelta) {
		this.directiondelta = directiondelta;
	}
	public int getRadius() {
		return radius;
	}
	public void setRadius(int radius) {
		this.radius = radius;
	}
	public int getRadiusunit() {
		return radiusunit;
	}
	public void setRadiusunit(int radiusunit) {
		this.radiusunit = radiusunit;
	}
	public int getRadiusdelta() {
		return radiusdelta;
	}
	public void setRadiusdelta(int radiusdelta) {
		this.radiusdelta = radiusdelta;
	}
	public int getMaintarget() {
		return maintarget;
	}
	public void setMaintarget(int maintarget) {
		this.maintarget = maintarget;
	}
	public String getVisibleinsl() {
		return visibleinsl;
	}
	public void setVisibleinsl(String visibleinsl) {
		this.visibleinsl = visibleinsl;
	}
	public int getTransit() {
		return transit;
	}
	public void setTransit(int transit) {
		this.transit = transit;
	}
	public int getEnabled() {
		return enabled;
	}
	public void setEnabled(int enabled) {
		this.enabled = enabled;
	}
	public int getVocalmessageenabled() {
		return vocalmessageenabled;
	}
	public void setVocalmessageenabled(int vocalmessageenabled) {
		this.vocalmessageenabled = vocalmessageenabled;
	}
	public String getBoldinsl() {
		return boldinsl;
	}
	public void setBoldinsl(String boldinsl) {
		this.boldinsl = boldinsl;
	}
	public long getTargettypeuid() {
		return targettypeuid;
	}
	public void setTargettypeuid(long targettypeuid) {
		this.targettypeuid = targettypeuid;
	}
	public Timestamp getLastupdate() {
		return lastupdate;
	}
	public void setLastupdate(Timestamp lastupdate) {
		this.lastupdate = lastupdate;
	}
}

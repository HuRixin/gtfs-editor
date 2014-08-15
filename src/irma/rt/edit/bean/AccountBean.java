package irma.rt.edit.bean;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="Account")
@Entity
@Table(name = "account")
public class AccountBean {
	@Id
	private String username;	//an email as username
	private String password;
	private String country;		//the agent is in which country
	private String city;			//the agent manages which city's public transit
	private double city_center_lat;	//latitude of the city
	private double city_center_lon;	//longitude of the city
	private String agency_id;	//the agent represent which agency
	
	public String getAgency_id() {
		return agency_id;
	}
	public void setAgency_id(String agency_id) {
		this.agency_id = agency_id;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public double getCity_center_lat() {
		return city_center_lat;
	}
	public void setCity_center_lat(double city_center_lat) {
		this.city_center_lat = city_center_lat;
	}
	public double getCity_center_lon() {
		return city_center_lon;
	}
	public void setCity_center_lon(double city_center_lon) {
		this.city_center_lon = city_center_lon;
	}
	
	public void update(AccountBean account) {
		if(account == null)
			return;
		this.country = account.country;
		this.city = account.city;
		this.city_center_lat = account.city_center_lat;
		this.city_center_lon = account.city_center_lon;
		this.password = account.password;
	}
}

package irma.rt.edit.bean;

import java.text.DecimalFormat;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class Load {
	private static EntityManagerFactory factory = Persistence.createEntityManagerFactory("irmaPU");
	public static void main(String[] args) {
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		List<Targets> targets = (List<Targets>)em.createNamedQuery("Targets.getTargets").getResultList();
		for(Targets target : targets) {
			Stop stop = new Stop();
			stop.setAgency_id("lineservizi");
			stop.setStop_id(target.getCode());
			stop.setLocation_type(0);
			stop.setParent_station(0);
			stop.setStop_code(String.valueOf(target.getUid()));
			stop.setStop_desc(target.getDescription());
			stop.setStop_lat((double)(Math.round(target.getLatitude()*100000))/100000);
			stop.setStop_lon((double)(Math.round(target.getLongitude()*100000))/100000);
			stop.setStop_name(target.getDescription());
			stop.setStop_timezone("Europe/Rome");
			stop.setWheelchair_boarding(0);
			stop.setZone_id("");
			stop.setStop_url("");
			em.persist(stop);
		}
		em.getTransaction().commit();
		em.close();
		factory.close();
	}
}

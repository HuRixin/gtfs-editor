package irma.rt.edit.servlet;

import irma.rt.edit.bean.AccountBean;
import irma.rt.edit.bean.Agency;
import irma.rt.edit.bean.Calendar;
import irma.rt.edit.bean.Route;
import irma.rt.edit.bean.Shape;
import irma.rt.edit.bean.Stop;
import irma.rt.edit.bean.StopTime;
import irma.rt.edit.bean.Trip;
import irma.rt.edit.dao.DataAccessUtil;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.zip.*;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class GtfsExportServlet
 */
@WebServlet("/GtfsExportServlet")
public class GtfsExportServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GtfsExportServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//get account information from session
	    HttpSession session = request.getSession(true);
	    AccountBean account = (AccountBean) session.getAttribute("account");
	    String agency_id = "";
	    if(account == null) {
	    	System.out.println("Error: [GtfsExportServlet][doPost]: session error");
	    	return;
	    } else {
	    	agency_id = account.getAgency_id();
	    }
	    Agency agency = DataAccessUtil.getAgency(agency_id);
	    List<Calendar> lstCalendar = DataAccessUtil.getCalendarList(agency_id);
	    List<Route> lstRoute = DataAccessUtil.getRouteList(agency_id);
	    List<Stop> lstStop = DataAccessUtil.getStopList(agency_id);
	    List<Shape> lstShape = DataAccessUtil.getAllShapeList(agency_id);
	    List<Trip> lstTrip = DataAccessUtil.getTripList(agency_id);
	    List<StopTime> lstStopTime = DataAccessUtil.getStopTimeList(agency_id);
	    
		//2. generate GTFS files
	    //String dirPath = getServletContext().getRealPath("/") + "GtfsFiles\\" + agency_id;
	    String dirPath = "D:\\Project\\IRMA\\GtfsExport\\" + agency_id;
	    File dirGtfs = new File(dirPath);
	    if(dirGtfs.exists() && dirGtfs.isDirectory()) {
	    	for(File file : dirGtfs.listFiles())
	    		file.delete();
	    	dirGtfs.delete();
	    }
	    dirGtfs.mkdir();
	    String[] strGtfsFiles = {
	    		"agency.txt",
	    		"calendar.txt",
	    		"routes.txt",
	    		"stops.txt",
	    		"shapes.txt",
	    		"trips.txt",
	    		"stop_times.txt",	    		
	    };
	    
	    //2.0 agency
	    FileWriter fw = null;
	    fw = new FileWriter(dirPath + "\\" + strGtfsFiles[0]);
	    fw.write("agency_id,agency_name,agency_url,agency_timezone,agency_lang,agency_phone,agency_fare_url\n");
	    if(agency != null) {
		    fw.write(agency.getAgency_id() + ",");
	    	fw.write(agency.getAgency_name() + ",");
	    	fw.write(agency.getAgency_url() + ",");
	    	fw.write(agency.getAgency_timezone() + ",");
	    	fw.write(agency.getAgency_lang() + ",");
	    	fw.write(agency.getAgency_phone() + ",");
	    	fw.write(agency.getAgency_fare_url() + "\n");
	    }
	    fw.close();

	  //2.1 calendar
	    fw = new FileWriter(dirPath + "\\" + strGtfsFiles[1]);
	    fw.write("service_id,monday,tuesday,wednesday,thursday,friday,saturday,sunday,start_date,end_date\n");
	    if(lstCalendar != null) {
		    for(Calendar calendar : lstCalendar) {
		    	fw.write(calendar.getService_id() + ",");
		    	fw.write(calendar.getMonday() + ",");
		    	fw.write(calendar.getThursday() + ",");
		    	fw.write(calendar.getWednesday() + ",");
		    	fw.write(calendar.getThursday() + ",");
		    	fw.write(calendar.getFriday() + ",");
		    	fw.write(calendar.getSaturday() + ",");
		    	fw.write(calendar.getSunday() + ",");
		    	fw.write(calendar.getStart_date() + ",");
		    	fw.write(calendar.getEnd_date() + "\n");
		    }
	    }
	    fw.close();
	    
	  //2.2 route
	   fw = new FileWriter(dirPath + "\\" + strGtfsFiles[2]);
	   fw.write("route_id,agency_id,route_short_name,route_long_name,route_desc,route_type,route_url,route_color,route_text_color\n");
	   if(lstRoute != null) {
		   for(Route route : lstRoute) {
			   fw.write(route.getRoute_id() + ",");
		    	fw.write(route.getAgency_id() + ",");
		    	fw.write(route.getRoute_short_name() + ",");
		    	fw.write(route.getRoute_long_name() + ",");
		    	fw.write(route.getRoute_desc() + ",");
		    	fw.write(route.getRoute_type() + ",");
		    	fw.write(route.getRoute_url() + ",");
		    	fw.write(route.getRoute_color() + ",");
		    	fw.write(route.getRoute_text_color() + "\n");
		   }
	   }
	   fw.close();
	    
	 //2.3 stop
	    fw = new FileWriter(dirPath + "\\" + strGtfsFiles[3]);
	    fw.write("stop_id,stop_code,stop_name,stop_desc,stop_lat,stop_lon,zone_id,stop_url,location_type,parent_station,stop_timezone,wheelchair_boarding\n");
	    if(lstStop != null) {
		    for(Stop stop : lstStop) {
		    	fw.write(stop.getStop_id() + ",");
		    	fw.write(stop.getStop_code() + ",");
		    	fw.write(stop.getStop_name() + ",");
		    	fw.write(stop.getStop_desc() + ",");
		    	fw.write(stop.getStop_lat() + ",");
		    	fw.write(stop.getStop_lon() + ",");
		    	fw.write(stop.getZone_id() + ",");
		    	fw.write(stop.getStop_url() + ",");
		    	fw.write(stop.getLocation_type() + ",");
		    	fw.write(stop.getParent_station() + ",");
		    	fw.write(stop.getStop_timezone() + ",");
		    	fw.write(stop.getWheelchair_boarding() + "\n");
		    }
	    }
	    fw.close();
	    
	  //2.4 shape
	    fw = new FileWriter(dirPath + "\\" + strGtfsFiles[4]);
	    fw.write("shape_id,shape_pt_lat,shape_pt_lon,shape_pt_sequence,shape_dist_traveled\n");
	    if(lstShape != null) {
		    for(Shape shape : lstShape) {
		    	fw.write(shape.getShape_id() + ",");
		    	fw.write(shape.getShape_pt_lat() + ",");
		    	fw.write(shape.getShape_pt_lon() + ",");
		    	fw.write(shape.getShape_pt_sequence()  + ",");
		    	fw.write(shape.getShape_dist_traveled() + "\n");
		    }
	    }
	    fw.close();
	    
	  //2.5 trip
	    fw = new FileWriter(dirPath + "\\" + strGtfsFiles[5]);
	    fw.write("route_id,service_id,trip_id,trip_headsign,trip_short_name,direction_id,block_id,shape_id,wheelchair_accessible,bikes_allowed\n");
	    if(lstTrip != null) {
		    for(Trip trip : lstTrip) {
		    	fw.write(trip.getRoute_id() + ",");
		    	fw.write(trip.getService_id() + ",");
		    	fw.write(trip.getTrip_id() + ",");
		    	fw.write(trip.getTrip_headsign() + ",");
		    	fw.write(trip.getTrip_short_name() + ",");
		    	fw.write(trip.getDirection_id() + ",");
		    	fw.write(trip.getBlock_id() + ",");
		    	fw.write(trip.getShape_id() + ",");
		    	fw.write(trip.getWheelchair_accessible() + ",");
		    	fw.write(trip.getBikes_allowed() + "\n");
		    }
	    }
	    fw.close();
	    
	//2.6 stop_time
	    fw = new FileWriter(dirPath + "\\" + strGtfsFiles[6]);
	    fw.write("trip_id,arrival_time,departure_time,stop_id,stop_sequence,stop_headsign,pickup_type,drop_off_type,shape_dist_traveled\n");
	    if(lstStopTime != null) {
		    for(StopTime stop_time : lstStopTime) {
		    	fw.write(stop_time.getTrip_id() + ",");
		    	fw.write(stop_time.getArrival_time() + ",");
		    	fw.write(stop_time.getDeparture_time() + ",");
		    	fw.write(stop_time.getStop_id() + ",");
		    	fw.write(stop_time.getStop_sequence() + ",");
		    	fw.write(stop_time.getStop_headsign() + ",");
		    	fw.write(stop_time.getPickup_type() + ",");
		    	fw.write(stop_time.getDrop_off_type() + ",");
		    	fw.write(stop_time.getShape_dist_traveled() + "\n");
		    }
	    }
	    fw.close();
	    
		//3. package files to zip format
	    String strZip = dirPath + "\\" + agency_id + ".zip";
	    // input file 
	    FileInputStream in = null;
        // out put file 
        ZipOutputStream out = new ZipOutputStream(new FileOutputStream(strZip));
	    for(int i=0; i<strGtfsFiles.length; i++) {
	        in = new FileInputStream(dirPath + "\\" + strGtfsFiles[i]);
	        // name the file inside the zip  file 
	        out.putNextEntry(new ZipEntry(strGtfsFiles[i]));
	        // buffer size
	        byte[] b = new byte[1024];
	        int count;
	        while ((count = in.read(b)) > 0) {
	            out.write(b, 0, count);
	        }
	    }
        out.close();
        in.close();
        
		//4. write to client
		  try {
	            // path是指欲下载的文件的路径。
	            File file = new File(strZip);
	            // 取得文件名。
	            String filename = file.getName();
	            // 取得文件的后缀名。
	            //String ext = filename.substring(filename.lastIndexOf(".") + 1).toUpperCase();

	            // 以流的形式下载文件。
	            InputStream fis = new BufferedInputStream(new FileInputStream(file));
	            byte[] buffer = new byte[fis.available()];
	            fis.read(buffer);
	            fis.close();
	            // 清空response
	            response.reset();
	            // 设置response的Header
	            response.addHeader("Content-Disposition", "attachment;filename=" + new String(filename.getBytes("utf-8"),"ISO-8859-1"));
	            response.addHeader("Content-Length", "" + file.length());
	            OutputStream toClient = new BufferedOutputStream(response.getOutputStream());
	            response.setContentType("application/octet-stream");
	            toClient.write(buffer);
	            toClient.flush();
	            toClient.close();
	        } catch (IOException ex) {
	            ex.printStackTrace();
	        }
	} 

}

package webPushAction;

import java.io.DataOutputStream;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.sql.Date;
import java.sql.Time;

public class Utils {
	
	// For running on localhost
//	public static String logFilePath = "/home/nitronik/DATA/Workspaces/Eclipse/WARs/TSR test/webPushLogs.txt";
//	public static String url = "http://localhost:8080/webPushTrigger/log";
//	public static String errorLogFilePath = "/home/nitronik/DATA/Workspaces/Eclipse/WARs/TSR test/webPushErrors.txt";
	
	// For running on Server
	public static String logFilePath = "/opt/logs/tomcat/tsrrnd/webPushLogs.txt";
	public static String url = "https://topstockresearch.com/webPushTrigger/log";
//	public static String errorLogFilePath = "/opt/logs/tomcat/tsrrnd/webPushErrors.txt";

	// create a log file here, empty contents if it already exists
//	public static void createLogFile() {
//		try {
//			File myObj = new File(logFilePath);
//
//			if (myObj.createNewFile()) {
//				System.out.println("Log file created: " + myObj.getName());
//			} else {
//				System.out.println("Log file exists: " + myObj.getName());
//				PrintWriter writer = new PrintWriter(logFilePath);
//				writer.print(java.time.LocalDateTime.now() + "\n");
//				writer.close();
//			}
//		} catch (IOException e) {
//			e.printStackTrace();
//		}

//		try {
//			File myObj = new File(errorLogFilePath);
//
//			if (myObj.createNewFile()) {
//				System.out.println("Error log file created: " + myObj.getName());
//			} else {
//				System.out.println("Error log file exists: " + myObj.getName());
//				PrintWriter writer = new PrintWriter(errorLogFilePath);
//				writer.print("");
//				writer.close();
//			}
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//	}

	// write logs
	public static void writeToLogFile(String log) {
		FileWriter myWriter;
		try {
			myWriter = new FileWriter(logFilePath, true);
			myWriter.write(log + "\n");
			myWriter.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void logErrors(Exception e) {
		try {
			PrintWriter writer = new PrintWriter(new FileWriter(logFilePath, true));
			
			e.printStackTrace(writer);
			writer.close();	
		} catch (IOException exception) {
			exception.printStackTrace();
		}
	}
	
//	public static void logErrors(String error) {
//		FileWriter myWriter;
//		try {
//			myWriter = new FileWriter(errorLogFilePath, true);
//			myWriter.write(error + "\n");
//			myWriter.close();
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//	}

	public static void doPost(String payload) {
		try {
			URL urlObject = new URI(url).toURL();
			HttpURLConnection conn = (HttpURLConnection) urlObject.openConnection();
			conn.setRequestMethod("POST");
			conn.setDoOutput(true);

			conn.setRequestProperty("Content-Type", "application/json");
			DataOutputStream os = new DataOutputStream(conn.getOutputStream());
			os.writeBytes(payload);

			int responseCode = conn.getResponseCode();
						
			if(responseCode != 200 && responseCode != 201 && responseCode != 202) {
				Utils.writeToLogFile("\n\nError " + responseCode + " while POSTing to " + url);
			}
			
		} catch (IOException | URISyntaxException e) {
			// TODO Auto-generated catch block
			Utils.logErrors(e);
		}
	}
}

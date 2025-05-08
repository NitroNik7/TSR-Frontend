package webPushAction;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URISyntaxException;
import java.security.GeneralSecurityException;
import java.util.concurrent.ExecutionException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jose4j.lang.JoseException;

@WebServlet(urlPatterns = "/api")
public class Api extends HttpServlet {
	// For testing WAR deployment
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
		
		res.setContentType("text/plain");
		try {
			PrintWriter out = res.getWriter();
			out.println("Get req works!");
			out.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {

		Utils.writeToLogFile("Entered webPushAction/Api");

		StringBuilder sb = new StringBuilder();
		BufferedReader br = new BufferedReader(req.getReader());
		String line;

		// Reading subscription data received from POST
		while ((line = br.readLine()) != null) {
			sb.append(line);
		}

		Action action = new Action();

		try {
			action.forwardtoPushServer(sb.toString());
		} catch (GeneralSecurityException | IOException | JoseException | ExecutionException | InterruptedException
				| URISyntaxException e) {
			Utils.logErrors(e);
		}
	}
}

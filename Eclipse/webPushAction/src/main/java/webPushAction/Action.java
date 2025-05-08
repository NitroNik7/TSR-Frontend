package webPushAction;

import java.io.IOException;
import java.net.URISyntaxException;
import java.security.GeneralSecurityException;
import java.util.Base64;
import java.util.concurrent.ExecutionException;

import org.apache.http.Header;
import org.apache.http.HttpResponse;
import org.jose4j.lang.JoseException;
import org.json.JSONObject;

import nl.martijndwars.webpush.Encoding;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;

public class Action {
	public int TTL = 300; // Time to live in seconds

	public void forwardtoPushServer(String data) throws GeneralSecurityException, IOException, JoseException,
			ExecutionException, InterruptedException, URISyntaxException {

		Utils.writeToLogFile("Entered webPushAction/Action");

		JSONObject json = new JSONObject(data);

		Subscription sub = new Subscription();
		sub.setEndpoint(json.getString("endpoint"));
		sub.setAuth(json.getString("auth"));
		sub.setKey(json.getString("key"));

		json.remove("endpoint");
		json.remove("auth");
		json.remove("key");

		String payload = json.toString();

		Notification notification;
		PushService pushService;

		notification = new Notification(sub.getEndpoint(), sub.getUserPublicKey(), sub.getAuthAsBytes(),
				payload.getBytes(), TTL);

		// Below keys are VAPID (Voluntary Application Server Identification) keys
		String publicKey = "BPD2PwzUfZPwlPIir1BJEhRv+gJwAGWzx449EdpE5gfSR37EObROsKMNrYrj3KH25/LKTnyI6gffthtB+m4GAkk=";
		String privateKey = "5+lxCaW8mwxsLjZU96CvlnmDHFuvJMMzFZe62LPS1Yo=";

		// Convert to URL-safe Base64 (without padding)
        publicKey = Base64.getUrlEncoder().withoutPadding().encodeToString(Base64.getDecoder().decode(publicKey));
        privateKey = Base64.getUrlEncoder().withoutPadding().encodeToString(Base64.getDecoder().decode(privateKey));
		
        // Can be a mail id or url at which Push server can contact us
		String subject = "mailto:nikhil.harpale.edu@gmail.com";

		pushService = new PushService(publicKey, privateKey, subject);
		// Sending the notification
		HttpResponse response = pushService.send(notification, Encoding.AES128GCM);

		json.clear();
		for (Header header : response.getAllHeaders()) {
			json.put(header.getName(), header.getValue());
		}
		json.put("Status-Line", response.getStatusLine());

		// Sending response from push server to webPushTrigger/log
		Utils.doPost(json.toString());

	}
}

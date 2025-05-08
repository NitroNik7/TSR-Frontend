package webPushAction;

import java.io.Serializable;
import java.util.HashMap;

public class CustomResponse implements Serializable {
	private HashMap<String, String> headers;
	
	private String statusLine;
	
	public HashMap<String, String> getHeaders() {
		return headers;
	}
	public void setHeaders(HashMap<String, String> headers) {
		this.headers = headers;
	}
	
	public String getStatusLine() {
		return statusLine;
	}
	public void setStatusLine(String statusLine) {
		this.statusLine = statusLine;
	}
}

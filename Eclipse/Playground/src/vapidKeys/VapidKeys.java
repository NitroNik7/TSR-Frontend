package vapidKeys;

import java.util.Base64;

public class VapidKeys {
	public static void main(String args[]) {
		// Key in Colon seperated HEX format
		String publicKeyHex = "04:0c:33:7f:ea:be:ef:35:42:52:21:c4:5a:aa:f0:\r\n"
				+ "b2:0f:56:ef:81:58:17:00:a2:22:66:7c:a6:dc:c9:\r\n"
				+ "a2:47:e2:43:c5:4f:0c:99:c6:d0:7f:d1:fc:1b:02:\r\n"
				+ "c2:7b:87:7f:44:6f:a7:e2:18:7c:0b:77:08:f8:ad:\r\n" + "21:b3:6d:7d:68";
		
		String privateKeyHex = "98:4a:48:11:4f:1e:1f:d7:8c:84:51:b0:4e:4c:b6:\r\n"
				+ "    1a:58:3a:9b:e7:09:54:ee:85:e2:0f:9f:b6:38:94:\r\n"
				+ "    b5:ed\r\n";

		// Key in HEX format
		publicKeyHex = publicKeyHex.replaceAll("[^0-9a-fA-F]", "");
		privateKeyHex = privateKeyHex.replaceAll("[^0-9a-fA-F]", "");

		// Converting Key to Base64 encoded string format for use on server side
		byte[] publicKeyBytes = hexStringToByteArray(publicKeyHex);
		byte[] privateKeyBytes = hexStringToByteArray(privateKeyHex);

		// convert byte array to Base64 string
		String base64PublicKey = Base64.getEncoder().encodeToString(publicKeyBytes);
		String base64PrivateKey = Base64.getEncoder().encodeToString(privateKeyBytes);

		System.out.println("Base64 Encoded Public Key: " + base64PublicKey);
		System.out.println("Base64 Encoded Private Key: " + base64PrivateKey);
	}

	public static byte[] hexStringToByteArray(String hexKey) {
		int len = hexKey.length();
		byte[] data = new byte[len / 2];

		for (int i = 0; i < len; i += 2) {
			data[i / 2] = (byte) ((Character.digit(hexKey.charAt(i), 16) << 4)
					+ Character.digit(hexKey.charAt(i + 1), 16));
		}

		return data;
	}
	
	
}

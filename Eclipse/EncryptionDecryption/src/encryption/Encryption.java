package encryption;

import java.util.Scanner;

public class Encryption {
	public static void main(String[] args) {
		String plainText = "Date,Open,High,Low,Close,Volume,\r\n"
				+ "22-Mar-19,168.6,178.7,165.0,166.1,32744,\r\n"
				+ "25-Mar-19,168.9,168.9,158.8,160.65,43245,\r\n"
				+ "26-Mar-19,160.0,169.8,154.35,165.4,157992,\r\n"
				+ "27-Mar-19,165.45,172.0,160.95,170.1,108166,\r\n"
				+ "28-Mar-19,170.65,171.7,166.35,168.9,44179,\r\n"
				+ "29-Mar-19,168.9,174.0,168.5,169.85,145327,\r\n"
				+ "01-Apr-19,169.9,173.25,169.85,171.1,60072,\r\n"
				+ "02-Apr-19,172.75,172.75,164.3,169.0,239933,\r\n"
				+ "03-Apr-19,170.0,172.9,166.15,168.4,48683,\r\n"
				+ "04-Apr-19,170.4,170.9,166.3,168.25,108216,\r\n"
				+ "05-Apr-19,168.45,172.4,166.5,169.95,59130,\r\n"
				+ "08-Apr-19,171.55,176.0,169.8,174.9,111421,\r\n"
				+ "09-Apr-19,172.95,174.85,170.85,172.5,26224,\r\n"
				+ "10-Apr-19,171.0,184.85,169.0,183.4,269355,\r\n"
				+ "11-Apr-19,183.05,195.4,182.55,189.95,528836,\r\n";

		Scanner sc = new Scanner(System.in);
		System.out.println("Enter number of keys:");
		int n = sc.nextInt();

		int[] key = new int[n];
		System.out.println("Enter keys:");
		for (int i = 0; i < n; i++) {
			key[i] = sc.nextInt();
		}
		System.out.println("Enter blocksize:");
		int blockSize = sc.nextInt();

		String cipherText = encrypt(plainText, key, blockSize);
		System.out.println(decrypt(cipherText, key, blockSize));

	}

	public static String encrypt(String plainText, int key[], int blockSize) {
		String cipherText = "";
		int j = 0; // represents index of the key to be used from key[]
		int asciiCode = 0;

		for (int i = 0; i < plainText.length(); i++) {

			j = (i / blockSize) % key.length;
			asciiCode = (int) plainText.charAt(i) + key[j];
			cipherText += (char) asciiCode;
		}

		return cipherText;
	}

	public static String decrypt(String cipherText, int key[], int blockSize) {
		String plainText = "";
		int j = 0; // represents index of the key to be used from key[]
		int asciiCode = 0;

		for (int i = 0; i < cipherText.length(); i++) {

			j = (i / blockSize) % key.length;
			asciiCode = (int) cipherText.charAt(i) - key[j];
			plainText += (char) asciiCode;
		}

		return plainText;
	}
}

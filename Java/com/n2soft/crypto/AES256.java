package com.n2soft.crypto;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.AlgorithmParameterSpec;
import java.util.Arrays;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import com.n2soft.common.Env;
import com.n2soft.common.UtilMgr;

public class AES256 {

	private static final String CIPHER = "AES";
	private static final String TRANSFORM = "AES/CBC/PKCS5Padding";
	private static final int BLOCK_SIZE = 1024 * 1024;

	private static String DEFAULT_KEY = Env.get("cipher.aes256.key", "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456");
	private static String DEFAULT_IV = Env.get("cipher.aes256.iv", "1234567890ABCDEF");

	// Encrypt for bytes
	public static byte[] encrypt(byte[] srcBytes) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
		return encrypt(srcBytes, DEFAULT_KEY, DEFAULT_IV);
	}

	// Encrypt for bytes
	public static byte[] encrypt(byte[] srcBytes, String key) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
		return encrypt(srcBytes, key, DEFAULT_IV);
	}

	// Encrypt for bytes
	public static byte[] encrypt(byte[] srcBytes, String key, String iv) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {

		if( key == null || key.length() == 0 )
			key = DEFAULT_KEY;

		AlgorithmParameterSpec ivSpec = new IvParameterSpec(iv.getBytes());
		SecretKeySpec newKey = new SecretKeySpec(key.getBytes(), CIPHER);
		Cipher cipher = Cipher.getInstance(TRANSFORM);
		cipher.init(Cipher.ENCRYPT_MODE, newKey, ivSpec);

		return cipher.doFinal(srcBytes);
	}


	// Encrypt for String (to BASE64)
	public static String encrypt(String srcText) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
		return encrypt(srcText, DEFAULT_KEY, DEFAULT_IV);
	}

	// Encrypt for String (to BASE64)
	public static String encrypt(String srcText, String key) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
		return encrypt(srcText, key, DEFAULT_IV);
	}

	// Encrypt for String (to BASE64)
	public static String encrypt(String srcText, String key, String iv) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {

		byte[] srcBytes = srcText.getBytes();

		return BASE64.encode(encrypt(srcBytes, key, iv));
	}


	public static long encrypt(InputStream is, OutputStream os) {
		byte[] buffer = new byte[BLOCK_SIZE];
		int nread = 0;
		long total_len = 0;

		try {

			while( (nread = is.read(buffer)) != -1 ) {
				byte[] encBytes = encrypt(nread < BLOCK_SIZE ? Arrays.copyOf(buffer, nread) : buffer);
				os.write(encBytes);
				total_len += encBytes.length;
			}

			os.flush();
		}
		catch( Exception e ) {
			e.printStackTrace();
		}

		return total_len;
	}

	public static int encrypt(byte[] srcBytes, OutputStream os) {
		int nread = 0;
		int src_len = srcBytes.length;
		int total_len = 0;

		try {

			for(int i = 0; i < src_len; i += BLOCK_SIZE) {
				nread = ((src_len - i) < BLOCK_SIZE) ? (src_len - i) : BLOCK_SIZE;
				byte[] encBytes = encrypt(Arrays.copyOfRange(srcBytes, i, i + nread));
				os.write(encBytes);
				total_len += encBytes.length;
			}

			os.flush();
		}
		catch( Exception e ) {
			e.printStackTrace();
		}

		return total_len;
	}

	public static byte[] encrypt(InputStream is) {
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		byte[] buffer = new byte[BLOCK_SIZE];
		int nread = 0;

		try {

			while( (nread = is.read(buffer)) != -1 ) {
				byte[] encBytes = decrypt(nread == BLOCK_SIZE ? buffer : Arrays.copyOf(buffer, nread));
				baos.write(encBytes);
			}

		}
		catch( Exception e ) {
			e.printStackTrace();
		}

		return baos.toByteArray();
	}


	// Decrypt for bytes
	public static byte[] decrypt(byte[] encBytes) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
		return decrypt(encBytes, DEFAULT_KEY, DEFAULT_IV);
	}

	// Decrypt for bytes
	public static byte[] decrypt(byte[] encBytes, String key) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
		return decrypt(encBytes, key, DEFAULT_IV);
	}

	// Decrypt for bytes
	public static byte[] decrypt(byte[] encBytes, String key, String iv) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {

		if( key == null || key.length() == 0 )
			key = DEFAULT_KEY;

		AlgorithmParameterSpec ivSpec = new IvParameterSpec(iv.getBytes());
		SecretKeySpec newKey = new SecretKeySpec(key.getBytes(), CIPHER);
		Cipher cipher = Cipher.getInstance(TRANSFORM);
		cipher.init(Cipher.DECRYPT_MODE, newKey, ivSpec);

		return cipher.doFinal(encBytes);
	}

	// Decryption for String (from BASE64)
	public static String decrypt(String encText) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
		return decrypt(encText, DEFAULT_KEY, DEFAULT_IV);
	}

	public static String decrypt(String encText, String key) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
		return decrypt(encText, key, DEFAULT_IV);
	}

	// Decryption for String (from BASE64)
	public static String decrypt(String encText, String key, String iv) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {

		if( key == null || key.length() == 0 )
			key = DEFAULT_KEY;

		byte[] encBytes = BASE64.decode(encText);

		return new String(decrypt(encBytes, key, iv));
	}


	public static long decrypt(InputStream is, OutputStream os) {
		byte[] buffer = new byte[BLOCK_SIZE + 16];
		int nread = 0;
		long total_len = 0;

		try {

			while( (nread = is.read(buffer)) != -1 ) {
				byte[] decBytes = decrypt(nread == (BLOCK_SIZE + 16) ? buffer : Arrays.copyOf(buffer, nread));
				os.write(decBytes);
				total_len += decBytes.length;
			}

			os.flush();
		}
		catch( Exception e ) {
			e.printStackTrace();
		}

		return total_len;
	}

	public static long decrypt(byte[] encBytes, OutputStream os) {
		int nread = 0;
		int src_len = encBytes.length;
		int total_len = 0;

		try {

			for(int i = 0; i < src_len; i += (BLOCK_SIZE + 16)) {
				nread = ((src_len - i) < (BLOCK_SIZE + 16)) ? (src_len - i) : (BLOCK_SIZE + 16);
				byte[] decBytes = decrypt(Arrays.copyOfRange(encBytes, i, i + nread));
				os.write(decBytes);
				total_len += decBytes.length;
			}

			os.flush();
		}
		catch( Exception e ) {
			e.printStackTrace();
		}

		return total_len;
	}

	public static byte[] decrypt(InputStream is) {
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		byte[] buffer = new byte[BLOCK_SIZE + 16];
		int nread = 0;

		try {

			while( (nread = is.read(buffer)) != -1 ) {
				byte[] decBytes = decrypt(nread == (BLOCK_SIZE + 16) ? buffer : Arrays.copyOf(buffer, nread));
				baos.write(decBytes);
			}

		}
		catch( Exception e ) {
			e.printStackTrace();
		}

		return baos.toByteArray();
	}

	public static String toString(byte[] bytes) {
		return new String(bytes);
	}

	public static byte[] toBytes(String text) {
		return text.getBytes();
	}

	public static void main(String[] args) throws Exception {

		try {

			File d = new File("C:/nTreeWorks64/src");
			File[] fl = d.listFiles();

			long tm0 = System.currentTimeMillis();

			for(int i = 0; i < fl.length; i++) {
				File f = fl[i];
				FileOutputStream fos = new FileOutputStream("C:/nTreeWorks64/dest/" + f.getName());

				encrypt(new FileInputStream(f), fos);

				fos.close();
			}

			System.out.println("1: " + (System.currentTimeMillis() - tm0) + "");

			tm0 = System.currentTimeMillis();

			for(int i = 0; i < fl.length; i++) {
				File f = fl[i];

				byte[] bt = UtilMgr.readFileBytes(f);
				byte[] enc = encrypt(bt);

				FileOutputStream fos = new FileOutputStream("C:/nTreeWorks64/dest2/" + f.getName());
				fos.write(enc);
				fos.flush();
				fos.close();
			}

			System.out.println("2: " + (System.currentTimeMillis() - tm0) + "");

		}
		catch( Exception e ) {
			e.printStackTrace();
		}

	}
}

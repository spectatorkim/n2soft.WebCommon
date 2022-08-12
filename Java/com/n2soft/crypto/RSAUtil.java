package com.n2soft.crypto;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.Key;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

import javax.crypto.Cipher;


public class RSAUtil {

	public RSAUtil() {
	}


	public KeyPair genRSAKeyPair() throws NoSuchAlgorithmException {
    	return genRSAKeyPair(2048);
    }

    public KeyPair genRSAKeyPair(int keySize) throws NoSuchAlgorithmException {
        KeyPairGenerator gen = KeyPairGenerator.getInstance("RSA");
        gen.initialize(keySize, new SecureRandom());

        return gen.genKeyPair();
    }


    public PublicKey getPublicKeyFromBase64Encoded(String base64PublicKey)  throws NoSuchAlgorithmException, InvalidKeySpecException {
        byte[] decodedBase64PubKey = Base64.getDecoder().decode(base64PublicKey);

        return KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(decodedBase64PubKey));
    }

    public PrivateKey getPrivateKeyFromBase64Encoded(String base64PrivateKey)  throws NoSuchAlgorithmException, InvalidKeySpecException {
        byte[] decodedBase64PrivateKey = Base64.getDecoder().decode(base64PrivateKey);

        return KeyFactory.getInstance("RSA").generatePrivate(new PKCS8EncodedKeySpec(decodedBase64PrivateKey));
    }



	public String publicKeyEncrypt(String plainData, String base64PublicKey) throws GeneralSecurityException, IOException {
	    PublicKey publicKey = getPublicKeyFromBase64Encoded(base64PublicKey);

	    return encrypt(plainData, publicKey);
	}

	public String publicKeyDecrypt(String encryptData, String base64PublicKey) throws GeneralSecurityException, IOException {
	    PublicKey publicKey = getPublicKeyFromBase64Encoded(base64PublicKey);

	    return decrypt(encryptData, publicKey);
	}

	public String privateKeyEncrypt(String plainData, String base64PrivateKey) throws GeneralSecurityException, IOException {
	    PrivateKey privateKey = getPrivateKeyFromBase64Encoded(base64PrivateKey);

	    return encrypt(plainData, privateKey);
	}

	public String privateKeyDecrypt(String encryptData, String base64PrivateKey) throws GeneralSecurityException, IOException {
	    PrivateKey privateKey = getPrivateKeyFromBase64Encoded(base64PrivateKey);

	    return decrypt(encryptData, privateKey);
	}



	public String decrypt(String encryptData, Key key) throws GeneralSecurityException, IOException {

		byte[] encryptDataByteArr = Base64.getDecoder().decode(encryptData);

	    Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
	    cipher.init(Cipher.DECRYPT_MODE, key);

	    int chunkSize = 256; // 2048 / 8 = 256
	    int index = 0;

	    ByteArrayOutputStream baos = new ByteArrayOutputStream();

	    while (index < encryptDataByteArr.length) {
	        int len = Math.min(encryptDataByteArr.length - index, chunkSize);
	        byte[] chunk = cipher.doFinal(encryptDataByteArr, index, len);
	        baos.write(chunk);
	        index += len;
	    } 

	    byte[] decryptedData = baos.toByteArray();

	    String ret = new String(decryptedData, StandardCharsets.UTF_8);
	    decryptedData = null;

	    return ret;
	}

	public String encrypt(String plainData, Key key) throws GeneralSecurityException, IOException {

		byte[] plainDataByteArr = plainData.getBytes(StandardCharsets.UTF_8);

	    Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
	    cipher.init(Cipher.ENCRYPT_MODE, key);

	    int chunkSize = 245; // 2048 / 8 - 11(padding) = 245
	    int index = 0; 

	    ByteArrayOutputStream baos = new ByteArrayOutputStream();

	    while (index < plainDataByteArr.length) {
	        int len = Math.min(plainDataByteArr.length - index, chunkSize);
	        byte[] encChunk = cipher.doFinal(plainDataByteArr, index, len);
	        baos.write(encChunk);
	        index += len;
	    }

	    byte[] encryptedData = baos.toByteArray();

	    String ret = Base64.getEncoder().withoutPadding().encodeToString(encryptedData);
	    
	    encryptedData = null;

	    return ret;
	}


    public String makePem(String s) {
		if( s == null || s.length() == 0 )
			return s;

		StringBuffer sb = new StringBuffer("-----BEGIN PUBLIC-----\n");
		int sl = s.length();
		for(int i=0; i < sl; i+=64) {
			if( i+64 > sl )
				sb.append(s.substring(i)).append("\n");
			else
				sb.append(s.substring(i,i+64)).append("\n");
		}
		sb.append("-----END PUBLIC-----\n");
		
		return sb.toString();
	}

}

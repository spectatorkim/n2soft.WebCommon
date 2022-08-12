package com.n2soft.crypto;

import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Base64.Encoder;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class AES256Util {
	private String iv;
	private Key keySpec;

	public AES256Util(String key) throws UnsupportedEncodingException {
		
		this.iv = key.substring(0, 16);
		SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), "AES");
		this.keySpec = keySpec;
	}

	// 암호화
	public String aesEncode(String str)
			throws java.io.UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException,
			InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
		Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
		c.init(Cipher.ENCRYPT_MODE, keySpec, new IvParameterSpec(iv.getBytes()));

		byte[] encrypted = c.doFinal(str.getBytes("UTF-8"));

		Encoder encoder = Base64.getEncoder();
		byte[] base64Encode = encoder.encode(encrypted);
		String encStr = new String(base64Encode);

		return encStr;
	}

	// 복호화
	public String aesDecode(String str)
			throws java.io.UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException,
			InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
		Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
		c.init(Cipher.DECRYPT_MODE, keySpec, new IvParameterSpec(iv.getBytes("UTF-8")));

		Decoder decoder = Base64.getDecoder();
		byte[] base64Decode = decoder.decode(str.getBytes());
		String decStr = new String(c.doFinal(base64Decode), "UTF-8"); 

		return decStr;
	}

        // 암호화
        public String aesEncode(String str, String charSet)
                        throws java.io.UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException,
                        InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
                Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
                c.init(Cipher.ENCRYPT_MODE, keySpec, new IvParameterSpec(iv.getBytes()));

                byte[] encrypted = c.doFinal(str.getBytes(charSet));

                Encoder encoder = Base64.getEncoder();
                byte[] base64Encode = encoder.encode(encrypted);
                String encStr = new String(base64Encode);

                return encStr;
        }

        // 복호화
        public String aesDecode(String str, String charSet)
                        throws java.io.UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException,
                        InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
                Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
                c.init(Cipher.DECRYPT_MODE, keySpec, new IvParameterSpec(iv.getBytes(charSet)));

                Decoder decoder = Base64.getDecoder();
                byte[] base64Decode = decoder.decode(str.getBytes());
                String decStr = new String(c.doFinal(base64Decode),charSet); 

                return decStr;
        }

}
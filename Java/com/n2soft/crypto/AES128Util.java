package com.n2soft.crypto;

import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Base64.Encoder;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

public class AES128Util {
	private static String DEFAULT_KEY = "LWJZFKEQYBKCADOP";

        public static String encrypt(String input, String key) {
                byte[] crypted = null;
                try {

                        SecretKeySpec skey = new SecretKeySpec(key.getBytes(), "AES");

                        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
                        cipher.init(Cipher.ENCRYPT_MODE, skey);
                        crypted = cipher.doFinal(input.getBytes());
                } catch (Exception e) {
                        System.out.println(e.toString());
                }

                Encoder encoder = Base64.getEncoder();

                String str = encoder.encodeToString(crypted);

                return new String(str);
        }

        public static String decrypt(String input, String key) {
                byte[] output = null;
                try {
                        Decoder decoder = Base64.getDecoder();

                        SecretKeySpec skey = new SecretKeySpec(key.getBytes(), "AES");

                        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
                        cipher.init(Cipher.DECRYPT_MODE, skey);
                        output = cipher.doFinal(decoder.decode(input));

                } catch (Exception e) {
                        System.out.println(e.toString());
                }
                return new String(output);
        }
        
        public static String encrypt(String input) {
                byte[] crypted = null;
                try {

                        String key = DEFAULT_KEY;
                        SecretKeySpec skey = new SecretKeySpec(key.getBytes(), "AES");

                        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
                        cipher.init(Cipher.ENCRYPT_MODE, skey);
                        crypted = cipher.doFinal(input.getBytes());
                } catch (Exception e) {
                        System.out.println(e.toString());
                }

                Encoder encoder = Base64.getEncoder();

                String str = encoder.encodeToString(crypted);

                return new String(str);
        }

        public static String decrypt(String input) {
                byte[] output = null;
                try {
	                    Decoder decoder = Base64.getDecoder();

                        String key = DEFAULT_KEY;
                        SecretKeySpec skey = new SecretKeySpec(key.getBytes(), "AES");

                        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
                        cipher.init(Cipher.DECRYPT_MODE, skey);
                        output = cipher.doFinal(decoder.decode(input));

                } catch (Exception e) {
                        System.out.println(e.toString());
                }
                return new String(output);
        }        

        public static String decryptKr(String input) throws UnsupportedEncodingException {
                byte[] output = null;
                try {
                    	Decoder decoder = Base64.getDecoder();

                        String key = DEFAULT_KEY;
                        SecretKeySpec skey = new SecretKeySpec(key.getBytes(), "AES");

                        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
                        cipher.init(Cipher.DECRYPT_MODE, skey);
                        output = cipher.doFinal(decoder.decode(input));

                } catch (Exception e) {
                        System.out.println(e.toString());
                }
                
                return new String(output, "EUC-KR");
        }    
        
        public static String encryptKr(String input) {
                byte[] crypted = null;
                try {

                        String key = DEFAULT_KEY;
                        SecretKeySpec skey = new SecretKeySpec(key.getBytes(), "AES");

                        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
                        cipher.init(Cipher.ENCRYPT_MODE, skey);
                        crypted = cipher.doFinal(input.getBytes("EUC-KR"));
                } catch (Exception e) {
                        System.out.println(e.toString());
                }

                Encoder encoder = Base64.getEncoder();
                String str = encoder.encodeToString(crypted);

                return new String(str);
        }
        

}
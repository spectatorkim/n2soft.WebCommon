package test;

import java.util.Base64;

import com.n2soft.common.UtilMgr;

public class Test01 {

	public static void main(String[] args) throws Exception {

		String key = "LJf34hcZPgtLED2TCPvZJI3r4Qfp54P0DykmeEENvOU=";
		System.out.println(UtilMgr.toHexString(Base64.getUrlDecoder().decode(key)));

		String iv = "2ghbPhRkvKmT3NM09qu-iQ==";
		System.out.println(UtilMgr.toHexString(Base64.getUrlDecoder().decode(iv)));
	}

}

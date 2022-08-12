package test;

import com.n2soft.util.HttpConnection;

public class Test05 {

	public static String[] names = { "엔에이웰 KF94 대형 10매", };
	public static String[] urls = { "https://smartstore.naver.com/pyeongpyoen/products/4751210548", };
	public static String[] checks = { "구매하실 수 없는", };
	public static int[] counts = { 0, }; 


	public static void main(String[] args) throws Exception {

		while( true ) {
			for(int i=0; i < names.length; i++) {
				if( doCheck(urls[i], checks[i]) ) {
					counts[i] ++;
					if( counts[i] > 2 ) {
						sendSMS("01049204000", "[마스크입고알림] " + names[i]);
						counts[i] = 0;
					}
				}					
			}
		}
	}


	public static boolean doCheck(String url, String check_str) {

		try {
			HttpConnection hc = new HttpConnection(url);
			String s = hc.get();
			if( s == null || s.length() == 0 )
				return false;
			if( s.indexOf(check_str) == -1 )
				return true;
		}
		catch( Exception e ) {
			e.printStackTrace();
		}

		return false;
	}

	public static void sendSMS(String hp_no, String msg) {
		try {
			HttpConnection hc = new HttpConnection("https://www.yeolimprinting.co.kr/_system/_sms.jsp");
			hc.add("phone", hp_no);
			hc.add("msg", msg);
			hc.post();
		}
		catch( Exception e ) {
			e.printStackTrace();
		}
	}

}

package test;

import com.n2soft.common.UtilMgr;
import com.n2soft.util.HttpConnection;

public class CheckMask2 {

	public static void main(String[] args) throws Exception {
		
		while( true ) {

			String url = doCheck("https://smartstore.naver.com/desind/category/ALL?page=1&st=RECENT&dt=LIST&size=40&free=false&cp=1");

			if( url != null && url.length() > 0 && !url.equals("/desind/products/4851370673") ) {
				sendSMS("01049204000", "[MaskAlarm] https://smartstore.naver.com" + url);
				System.out.print(" Ok");
				return;
			}

			UtilMgr.sleep(5000);
		}
	}


	public static String doCheck(String url) {

		String r = "";

		try {
			HttpConnection hc = new HttpConnection(url);
			String s = hc.get();
			if( s == null || s.length() == 0 )
				return "";
			r = UtilMgr.doScrap(s, "\" class=", "module_list_product_listview", "<a href=\"");
			System.out.println(r);
		}
		catch( Exception e ) {
			e.printStackTrace();
		}

		return r;
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

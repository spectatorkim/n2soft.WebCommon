package test;

import com.n2soft.util.HttpConnection;

public class Test03 {

	public static void main(String[] args) {
		try {
			HttpConnection hc = new HttpConnection("https://www.naver.com/");

			String src = hc.post();
			System.out.println(src);
			
			System.out.println(hc.getHeaders());
		}
		catch( Exception e ) {
			e.printStackTrace();
		}
	}

}

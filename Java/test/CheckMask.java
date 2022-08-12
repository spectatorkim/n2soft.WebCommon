package test;

import java.util.Random;

import com.n2soft.common.UtilMgr;
import com.n2soft.util.HttpConnection;

public class CheckMask {

	public static String[] names = {
			"엔에이웰 10매",
			"엔에이웰 대형 실속 20매",
//			"숨프리 웰퓨어 대/소 5매",
//			"라오메뜨 중형 5매",
//			"닥터퓨리 끈조절 20매",
//			"닥터퓨리 번들형 30매",
//			"위케어 블랙 10매",
//			"위케어 성인 화이트 10매"
	};
	public static String[] urls = {
			"https://smartstore.naver.com/pyeongpyoen/products/4751210548",
			"https://smartstore.naver.com/pyeongpyoen/products/4690028600",
//			"https://smartstore.naver.com/desind/products/4844267787",
//			"https://store.kakao.com/laomete/products/55563134",
//			"https://smartstore.naver.com/mfbshop/products/4735160554",
//			"https://smartstore.naver.com/mfbshop/products/4072573492",
//			"https://smartstore.naver.com/wiicare/products/4242262742",
//			"https://smartstore.naver.com/wiicare/products/3922699232"
	};
	public static String[] checks = {
			"구매하실 수 없는,품절되었습니다,구매가 어렵습니다",
			"구매하실 수 없는,품절되었습니다,구매가 어렵습니다",
//			"구매하실 수 없는",
//			"구매하실 수 없는",
//			"이 상품은 현재 일시품절입니다",
//			"구매하실 수 없는",
//			"구매하실 수 없는",
//			"구매하실 수 없는",
//			"구매하실 수 없는,품절되었습니다",
//			"구매하실 수 없는,품절되었습니다"
	};

	public static int[] counts = { 0, 0, 0, 0, 0, 0, 0 }; 


	public static void main(String[] args) throws Exception {
		
		Random r = new Random();

		while( true ) {
			for(int i=0; i < names.length; i++) {
				System.out.print("Checking " + names[i] + "...");

				if( doCheck(urls[i], checks[i]) ) {
					counts[i] ++;

					if( counts[i] == 3 ) {
						sendSMS("01049204000", "[MaskAlarm] " + urls[i]);
						System.out.print(" Ok");
					}

					if( counts[i] == 30 )
						counts[i] = 0;
				}
				else
					counts[i] = 0;

				System.out.println("");
			}

			UtilMgr.sleep(2000 + r.nextInt(50)*100);
		}
	}


	public static boolean doCheck(String url, String check_str) {

		try {
			HttpConnection hc = new HttpConnection(url);
			hc.addHeader("cookie", "wcs_bt=s_26989d4c02dc:1584936867; NNB=NZDZSKV7PVUV2; ASID=77c08b6b0000016d16a61c57000085f6; NID_JKL=Ltsm3hSvNnL3XYPRGw0w6PmPdcF99jCNptwdTIHO8sc=; NRTK=ag#40s_gr#1_ma#-2_si#0_en#0_sp#0; NID_AUT=vcPxIL57/ktkUiWxqDP+Jj9HuEMu1Br6DDKv1L+YOSp9Xf6Mo7hNTirDNiBxCPti; MM_NEW=1; NFS=2; nx_ssl=2; _fbp=fb.1.1584205507868.778484249; _gid=GA1.2.858445070.1584889815; _ga=GA1.1.1447507255.1567196131; _ga_4BKHBFKFK0=GS1.1.1584891790.52.0.1584891790.60; NID_SES=AAABrvxpzL11BggV5APX0+GS34optWOtmB5Utd+o6MNUadWzb8j0TJlRzfluQGiYkL2F9b6IBfbcTnRRg2Ysi3brOT1CxmUqc/xiO4djxho+W1aeOc8YVkiTg/nwAHdKRW1cd2fLCGba+WnrtJ2ySNcxy3A05fYA1uDU9mHP/4YmODLkZptK/+R7m2joTj/dH0BlLYrqNi+nGh7VO8nhn+ZbPIhsA+cTc9TlxwkqeuQhl0UvuXMInVO/b3090ewiX5X4AstY7wQ6N/H4N4o/W4tfrcsNEsX8JaCQUIO0xLXoeka5kcscDJS2W0iekug77HQDi551ETJi7IaWuwWLKsMwP7E0j45BcwYaMYbnAVijHc0oPcXjInG7jg7DTlgcK0xCr768ZuFnkWLay3mCKMgv6sVkSW6dQAH3/d+S1LEz35SaIda9/YZTsA0NgR2RhICV4Lvah8Pjhn0U40C1X+ibRpe6OggeECQTLb5PSoD5LR/wFJ5ppv/9O6gwmNEG7mG34SCrbrT/njiXL7K3zTQOrr8IQN8WPbVT8NHR6BcxVwalciyqOJfnLuIuuAkpSh4nUA==; sshop_popup_notice=2001280633");
			String s = hc.get();
			if( s == null || s.length() == 0 )
				return false;
			String[] cs = UtilMgr.split(check_str, ",");
			int b_find = 0;
			for(int i=0; i < cs.length; i++) {
				if( s.indexOf(cs[i]) > 0 )
					b_find ++;
			}
			
//			System.out.println(s);
			if( b_find == 0 ) {
				System.out.println(s);
				return true;
			}
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

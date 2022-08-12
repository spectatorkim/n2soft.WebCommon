package test;

import com.n2soft.util.HttpConnection;

public class Download01 {

	public static void main(String[] args) throws Exception {

		String url = "https://m129.az-cdn.com/20220729/NOMO/FC2PPV-3049163.mp4";

		if( url.contains("avsee.in") )
			doDownload1(url);
		else
			doDownload2(url);
	}

	static void doDownload1(String url) throws Exception {
		HttpConnection hc = new HttpConnection(url);

		hc.addHeader("authority", url.substring(0, url.indexOf("/key")));
		hc.addHeader("method", "GET");
		hc.addHeader("path", url.substring(url.indexOf("/key")));
		hc.addHeader("scheme", "https");
		hc.addHeader("accept", "*/*");
		hc.addHeader("accept-encoding", "identity;q=1, *;q=0");
		hc.addHeader("accept-language", "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7");
		hc.addHeader("cache-control", "no-cache");
		hc.addHeader("cookie", "_ga=GA1.2.1118417461.1593194014; _ym_d=1593194016; _ym_uid=1593194016824786591");
		hc.addHeader("pragma", "no-cache");
		hc.addHeader("referer", "https://avsee.in/");
		hc.addHeader("sec-fetch-dest", "video");
		hc.addHeader("sec-fetch-mode", "no-cors");
		hc.addHeader("sec-fetch-site", "cross-site");
		hc.addHeader("user-agent",
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Whale/2.8.105.22 Safari/537.36");

		hc.toFile("F:/Backup/job/　　/temp" + url.substring(url.lastIndexOf("/")));
	}

	static void doDownload2(String url) throws Exception {
		HttpConnection hc = new HttpConnection(url);

		hc.addHeader("authority", url.substring(8, url.indexOf("/202")));
		hc.addHeader("method", "GET");
		hc.addHeader("path", url.substring(url.indexOf("/202")));
		hc.addHeader("scheme", "https");
		hc.addHeader("accept", "*/*");
		hc.addHeader("accept-encoding", "identity;q=1, *;q=0");
		hc.addHeader("accept-language", "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6");
		hc.addHeader("cache-control", "no-cache");
		hc.addHeader("pragma", "no-cache");
		hc.addHeader("range", "bytes=0-");
		hc.addHeader("referer", "https://kr8.topgirl.co/");

		hc.addHeader("sec-ch-mobile", "?0");
		hc.addHeader("sec-fetch-dest", "video");
		hc.addHeader("sec-fetch-mode", "no-cors");
		hc.addHeader("sec-fetch-site", "cross-site");
		hc.addHeader("user-agent",
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.232 Whale/2.10.124.26 Safari/537.36");

//		System.out.println(hc.getHeaders(true).toString());

		hc.toFile("F:/Backup/job/　　/temp" + url.substring(url.lastIndexOf("/")));
	}
}

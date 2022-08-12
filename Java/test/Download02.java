package test;

import java.io.File;

import com.n2soft.common.DataMap;
import com.n2soft.common.DataMapList;
import com.n2soft.common.UtilMgr;
import com.n2soft.util.HttpConnection;
import com.n2soft.util.JSONUtil;

public class Download02 {
	public static void main(String[] args) throws Exception {
		String json = UtilMgr.readFile("D:/Temp/harem.json");
		DataMap data = JSONUtil.toMap(json);
		DataMap chapters = (DataMap)data.get("chapters");
		DataMapList dml = (DataMapList)chapters.get("chapters");
		for(int i=dml.size()-1; i >= 0; i--) {
			DataMap dm = dml.get(i);
			String url = "https://mangamiso.net/manga/read-0d4aab-a50021/" + dm.get("pathName");
//			System.out.println("[" + i + "] " + dm.toString());
			System.out.println("[" + i + "] " + url);
			doDownload(62-i, url);
		}
	}

	static void doDownload(int p, String url) throws Exception {
		HttpConnection hc = new HttpConnection(url);

		hc.addHeader("method", "GET");
		hc.addHeader("scheme", "https");
		hc.addHeader("accept", "*/*");
		hc.addHeader("accept-encoding", "identity;q=1, *;q=0");
		hc.addHeader("accept-language", "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6");
		hc.addHeader("cache-control", "no-cache");
		hc.addHeader("pragma", "no-cache");
		hc.addHeader("range", "bytes=0-");
		hc.addHeader("referer", "https://mangamiso.net");

		hc.addHeader("sec-ch-mobile", "?0");
		hc.addHeader("sec-fetch-dest", "video");
		hc.addHeader("sec-fetch-mode", "no-cors");
		hc.addHeader("sec-fetch-site", "cross-site");
		hc.addHeader("user-agent",
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.232 Whale/2.10.124.26 Safari/537.36");

		String html = hc.get();

		String json = "{\"pages\":[" + UtilMgr.doScrap(html, "],", "pages:[") + "]}";
		json = json.replaceAll("name", "\"name\"");
		json = json.replaceAll("path", "\"path\"");
//		System.out.println(json);

		String path = "F:/Temp/Haram/" + UtilMgr.msg_int(p, 3, true, true) + "/";
		File fp = new File(path);
		if( !fp.exists() )
			fp.mkdirs();

		DataMap data = JSONUtil.toMap(json);
		DataMapList dml = (DataMapList)data.get("pages");
		for(int i=0; i < dml.size(); i++) {
			DataMap dm = dml.get(i);
			System.out.println(dm.get("path"));
			downFile(i+1, path + UtilMgr.msg_int(i+1, 3, true, true) + ".webp", "https://mangamiso.net" + dm.getString("path"));
		}
	}

	static void downFile(int p, String filepath, String url) throws Exception {
		
		HttpConnection hc = new HttpConnection(url);

		hc.addHeader("method", "GET");
		hc.addHeader("scheme", "https");
		hc.addHeader("accept", "*/*");
		hc.addHeader("accept-encoding", "identity;q=1, *;q=0");
		hc.addHeader("accept-language", "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6");
		hc.addHeader("cache-control", "no-cache");
		hc.addHeader("pragma", "no-cache");
		hc.addHeader("range", "bytes=0-");
		hc.addHeader("referer", "https://mangamiso.net");

		hc.addHeader("sec-ch-mobile", "?0");
		hc.addHeader("sec-fetch-dest", "video");
		hc.addHeader("sec-fetch-mode", "no-cors");
		hc.addHeader("sec-fetch-site", "cross-site");
		hc.addHeader("user-agent",
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.232 Whale/2.10.124.26 Safari/537.36");

		hc.toFile(filepath);
	}

}

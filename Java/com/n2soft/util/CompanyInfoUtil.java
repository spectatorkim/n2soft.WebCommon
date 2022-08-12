package com.n2soft.util;

import com.n2soft.common.StringMap;
import com.n2soft.common.UtilMgr;

public class CompanyInfoUtil {
	
	public CompanyInfoUtil() {}


	public StringMap getCompanyInfo(String tax_id) {
		StringMap data = new StringMap();
		String src = new String();

		try {
			HttpConnection hc = new HttpConnection("http://www.kreport.co.kr/ctcssr_a30s.do");

			hc.addHeader("Connection", "keep-alive");
			hc.addHeader("Cache-Control", "max-age=0");
			hc.addHeader("Origin", "http://www.kreport.co.kr");
			hc.addHeader("Upgrade-Insecure-Requests", "1");
			hc.addHeader("Content-Type", "application/x-www-form-urlencoded");
			hc.addHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36 Edg/80.0.361.50");
			hc.addHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9");
			hc.addHeader("Referer", "http://www.kreport.co.kr/ctcssr_a30s.do");
			hc.addHeader("Accept-Encoding", "gzip, deflate");
			hc.addHeader("Accept-Language", "ko,en;q=0.9,en-US;q=0.8");

			hc.add("cmQueryOption", "00");
			
			hc.add("cmPageNo", "1");
			hc.add("cmSortField", "ENP_SCD");
			hc.add("cmSortOption", "0");
			hc.add("cmRowCountPerPage", "10");
			hc.add("enpScdNormalYn", "Y");
			hc.add("cmQuery", tax_id);

			src = hc.post();

		} catch (Exception e) {
			e.printStackTrace();
		}

//		System.out.println(src);
		
		String src1 = UtilMgr.doScrap(src, "<!-- 리스트 네비 S -->", "<ul class=\"bizlist\">");

		String ked_cd = UtilMgr.doScrap(src1, "\">", "iKEDCD=");
		String co_nm = UtilMgr.doScrap(src1, "</a>", "iKEDCD=", "\">");
		String ceo_nm = UtilMgr.doScrap(src1, ")", "iKEDCD=", "(대표자:");
		String co_stat1 = UtilMgr.doScrap(src1, "\"/>", "<!--  기업상태  -->", "alt=\"");
		String co_stat2 = UtilMgr.doScrap(src1, "\"/>", "<!--  기업유형  -->", "\"/>", "alt=\"");
		String co_type1 = UtilMgr.doScrap(src1, "\"/>", "<!--  기업유형  -->", "alt=\"");
		String co_type2 = UtilMgr.doScrap(src1, "\"/>", "<!--  기업유형  -->", "\"/>", "alt=\"");
		String co_addr1 = UtilMgr.doScrap(src1, " \r\n", "<li class=\"add\">");
		String co_addr2 = UtilMgr.doScrap(src1, "</li>", "<li class=\"add\">", "													\r\n													");
		String co_industry = UtilMgr.doScrap(src1, "<span", "<span>산업</span> : ");

		data.put("tax_id", tax_id);
		data.put("ked_cd", ked_cd);
		data.put("co_nm", co_nm);
		data.put("ceo_nm", ceo_nm);
		data.put("co_stat1", co_stat1);
		if( co_stat2 != null )
			data.put("co_stat2", co_stat2);
		data.put("co_type1", co_type1);
		if( co_type2 != null )
			data.put("co_type2", co_type2);
		if( co_addr1 != null )
			data.put("co_addr", co_addr1 + ((co_addr2 != null)? (" " + co_addr2) : ""));
		data.put("co_industry", co_industry);

		if( ked_cd != null && ked_cd.length() > 0 )
			data.add(getCompanyInfo2(ked_cd));

		return data;
	}

	public StringMap getCompanyInfo2(String ked_cd) {
		StringMap data = new StringMap();
		String src = new String();

		try {
			HttpConnection hc = new HttpConnection("http://www.kreport.co.kr/ctcssr_b10g.do");

			hc.addHeader("Connection", "keep-alive");
			hc.addHeader("Cache-Control", "max-age=0");
			hc.addHeader("Origin", "http://www.kreport.co.kr");
			hc.addHeader("Upgrade-Insecure-Requests", "1");
			hc.addHeader("Content-Type", "application/x-www-form-urlencoded");
			hc.addHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36 Edg/80.0.361.50");
			hc.addHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9");
			hc.addHeader("Referer", "http://www.kreport.co.kr/ctcssr_a30s.do");
			hc.addHeader("Accept-Encoding", "gzip, deflate");
			hc.addHeader("Accept-Language", "ko,en;q=0.9,en-US;q=0.8");

			hc.add("iKEDCD", ked_cd);

			src = hc.get();

		} catch (Exception e) {
			e.printStackTrace();
		}

//		System.out.println(src);
		
		String src1 = UtilMgr.doScrap(src, "</div>", "<div class=\"businfo");
		if( src1 == null || src1.length() < 100 )
			return data;

		
//		String ceo_nm = UtilMgr.doScrap(src1, "</dd>", "대표자</dt>", "column1\">");
		String co_size = UtilMgr.doScrap(src1, "</dd>", "기업규모</dt>", "column2\">");
		String co_public = UtilMgr.doScrap(src1, "</dd>", "기업공개분류</dt>", "column2\">");
		String corp_no = UtilMgr.doScrap(src1, "</dd>", "법인번호</dt>", "column1\">");
//		String co_industry = UtilMgr.doScrap(src1, "</dd>", "산업분류</dt>", "column2\">");
//		String co_addr = UtilMgr.doScrap(src1, "</dd>", "본사주소</dt>", "column1\">");
		String co_dt = UtilMgr.doScrap(src1, "</dd>", "설립일</dt>", "column2\">");

		data.put("ked_cd", ked_cd);
//		data.put("ceo_nm", ceo_nm);
		data.put("co_size", co_size);
		data.put("co_public", co_public);
		data.put("corp_no", corp_no);
//		data.put("co_industry", co_industry);
//		data.put("co_addr", co_addr);
		data.put("co_dt", co_dt);

		return data;
	}

}

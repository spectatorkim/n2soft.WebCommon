<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%


	String ndepth = "_N";
	
	String result = "["+
		"{" + 
			"\"__HAS_CHILD__\" : \"true\","+
			"\"name\" : \"REPORT"+ndepth+"\","+
			"\"korname\" : \"레포트"+ndepth+"\""+
		"},{"+
			"\"__HAS_CHILD__\" : \"false\","+
			"\"name\" : \"DATA INTERFACE"+ndepth+"\","+
			"\"korname\" : \"인터페이스"+ndepth+"\""+
		"},{"+
			"\"__HAS_CHILD__\" : \"true\","+
			"\"name\" : \"MANAGEMENT"+ndepth+"\","+
			"\"korname\" : \"레포트관리"+ndepth+"\""+
		"},{"+
			"\"__HAS_CHILD__\" : \"false\","+
			"\"name\" : \"SETUP"+ndepth+"\","+
			"\"korname\" : \"설정"+ndepth+"\""+
		"},{"+
			"\"__HAS_CHILD__\" : \"true\","+
			"\"name\" : \"CMS"+ndepth+"\","+
			"\"korname\" : \"컨텐츠관리"+ndepth+"\""+
		"}"+
	"]";
	
	out.write(result);

%>
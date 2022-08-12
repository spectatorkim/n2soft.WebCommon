<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr" import="java.io.*,com.n2soft.common.*" %>
<%

	String pid = request.getParameter("pid");

	if( pid == null || pid.length() == 0 ) {
		out.println("PID가 지정되지 않았습니다.");
		return;
	}


	StringWriter sw = new StringWriter();
	String output = "";

	try {
		Process process = Runtime.getRuntime().exec("TASKKILL /F /PID " + pid);
		InputStream is = process.getInputStream();

		while( true ) {
			int imsi = is.read();
			if( imsi == -1 )
				break;
			sw.write((char)imsi);
		}
		
		output = new String(sw.toString().getBytes("8859_1"), "EUC-KR");
		
	} catch( Exception e) {
		output = e.getMessage();
	}

	if( output.length() == 0 )
		output = "프로세스가 정상적으로 종료되었습니다.";

	out.println("<script> alert('" + output + "'); parent.location.reload(); </script>");

%>
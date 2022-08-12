<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr" import="java.util.*,com.n2soft.common.*,com.n2soft.msg.MsgBase" %>
<%
	String refresh = request.getParameter("refresh");
	if( refresh != null && refresh.equals("Y") ) {
		Env.reset();
		MsgBase.reset();
	}

%>
<html>

<head>
<title>nTree 환경</title>
<LINK href="table.css" type="text/css" rel="STYLESHEET"></LINK>
<script language="javascript">

function goEnc() {
	var frm = document.encForm;
	if( frm.ps.value == "" ) {
		alert("암호화할 문자열을 입력하세요.  ");
		frm.ps.focus();
		return;
	}

	frm.mode.value = "enc";
	frm.action = "env_enc.jsp";
	frm.target = "hidden_frm";
	frm.submit();
}

function goDec() {
	var frm = document.encForm;
	if( frm.ps.value == "" ) {
		alert("복호화할 문자열을 입력하세요.  ");
		frm.ps.focus();
		return;
	}

	frm.mode.value = "dec";
	frm.action = "env_enc.jsp";
	frm.target = "hidden_frm";
	frm.submit();
}

function setEnc(es) {
	document.encForm.es.value = es;
}

</script>
</head>

<body topmargin="4" marginheight="4">

<table width="100%" cellpadding="2" cellspacing="0" border="0">
<form name="encForm" method="post">
<input type="hidden" name="mode" />
	<tr>
    	<td class="title">[Env Values]</td>
    	<td align="right"><input type="text" name="ps" style="width:120px; font-size:8pt; font-family:돋움체;"><input type="button" value="암호화" onclick="goEnc()" style="font-size:9pt;"><input type="button" value="복호화" onclick="goDec()" style="font-size:9pt;">
    		☞ <input type="text" name="es" style="width:500px; font-size:8pt; font-family:돋움체;">
	</tr>
</form>
</table>
<%

	StringMap envMap = Env.getMap();
	String[] envKeys = envMap.getKeys();
	Arrays.sort(envKeys);

	out.println("<table width=100% =0 cellpadding=0 border=0><tr><td bgcolor=#808080>");
	out.println("<table width=100% cellspacing=1 cellpadding=2 border=0>");
	out.println("  <tr bgcolor=#FFFFFF><th width='30%'>Name</th><th>Value</th></tr>");
	out.println("  <tr bgcolor=\"#F6F6F6\" onMouseOver=\"this.style.backgroundColor='#FFE8C0';\" onMouseOut=\"this.style.backgroundColor='#F6F6F6'\"><td style='word-break:break-all;'>system.hostid</td><td style='word-break:break-all;'>" + UtilMgr.getHostID() + "</td></tr>");
	for(int i=0, cnt=0; i < envKeys.length; i++) {
		if( envKeys[i].indexOf(".#count") >= 0 )
			continue;
		String bgcolor = (cnt%2 == 0) ? "#E8EEFF" : "#FFFFFF";
		out.println("  <tr bgcolor=\"" + bgcolor + "\" onMouseOver=\"this.style.backgroundColor='#FFE8C0';\" onMouseOut=\"this.style.backgroundColor='" + bgcolor + "'\"><td style='word-break:break-all;'>" + envKeys[i] + "</td><td style='word-break:break-all;'>" + Env.get(envKeys[i]) + "</td></tr>");
		cnt ++;
	}

	out.println("</table></td></tr></table><br>");

%>

<table width="100%" cellpadding="2" cellspacing="0" border="0">
	<tr>
    	<td class="title">[System Environments]</td>
	</tr>
</table>
<%

	Map<String,String> env = System.getenv();
	Set<String> keyset = env.keySet();
	Object[] keys = keyset.toArray();
	Arrays.sort(keys);

	out.println("<table width=100% cellspacing=0 cellpadding=0 border=0><tr><td bgcolor=#808080>");
	out.println("<table width=100% cellspacing=1 cellpadding=2 border=0>");
	out.println("  <tr bgcolor=#FFFFFF><th width='30%'>Name</th><th>Value</th></tr>");
	for(int i=0; i < keys.length; i++) {
		String bgcolor = (i%2 == 0) ? "#E8EEFF" : "#FFFFFF";
		out.println("  <tr bgcolor=\"" + bgcolor + "\" onMouseOver=\"this.style.backgroundColor='#FFE8C0';\" onMouseOut=\"this.style.backgroundColor='" + bgcolor + "'\"><td style='word-break:break-all;'>" + keys[i] + "</td><td style='word-break:break-all;'>" + env.get(keys[i]) + "</td></tr>");
	}
	out.println("</table></td></tr></table><br>");
%>

<table width="100%" cellpadding="2" cellspacing="0" border="0">
	<tr>
    	<td class="title">[System Properties]</td>
	</tr>
</table>
<%

	Properties prop = System.getProperties();
	Enumeration<?> e = prop.propertyNames();

	out.println("<table width=100% cellspacing=0 cellpadding=0 border=0><tr><td bgcolor=#808080>");
	out.println("<table width=100% cellspacing=1 cellpadding=2 border=0>");
	out.println("  <tr bgcolor=#FFFFFF><th width='30%'>Name</th><th>Value</th></tr>");
	for(int i=0; e.hasMoreElements(); i++) {
		String key = (String)e.nextElement();
		String bgcolor = (i%2 == 0) ? "#E8EEFF" : "#FFFFFF";
		out.println("  <tr bgcolor=\"" + bgcolor + "\" onMouseOver=\"this.style.backgroundColor='#FFE8C0';\" onMouseOut=\"this.style.backgroundColor='" + bgcolor + "'\"><td style='word-break:break-all;'>" + key + "</td><td style='word-break:break-all;'>" + prop.getProperty(key) + "</td></tr>");
	}
	out.println("</table></td></tr></table><br>");

%>

<table width="100%" cellpadding="2" cellspacing="0" border="0">
	<tr>
    	<td class="title">[HTTP Headers]</td>
	</tr>
</table>
<%

	Enumeration<?> headers = request.getHeaderNames();

	out.println("<table width=100% cellspacing=0 cellpadding=0 border=0><tr><td bgcolor=#808080>");
	out.println("<table width=100% cellspacing=1 cellpadding=2 border=0>");
	out.println("  <tr bgcolor=#FFFFFF><th width='30%'>Name</th><th>Value</th></tr>");
	for(int i=0; headers.hasMoreElements(); i++) {
		String name = (String)headers.nextElement();
		String bgcolor = (i%2 == 0) ? "#E8EEFF" : "#FFFFFF";
		out.println("  <tr bgcolor=\"" + bgcolor + "\" onMouseOver=\"this.style.backgroundColor='#FFE8C0';\" onMouseOut=\"this.style.backgroundColor='" + bgcolor + "'\"><td style='word-break:break-all;'>" + name + "</td><td style='word-break:break-all;'>" + request.getHeader(name) + "</td></tr>");
	}
	out.println("</table></td></tr></table><br>");

%>

<iframe name="hidden_frm" src="about:blank" width="0" height="0" border="0"></iframe>

</body>

</html>
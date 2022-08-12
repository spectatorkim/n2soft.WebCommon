<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr" import="java.io.*,java.util.*,com.n2soft.common.*" %>
<html>

<head>
<title>Java 프로세스 관리</title>
<LINK href="table.css" type="text/css" rel="STYLESHEET"></LINK>
<script language="javascript">

function doKill(pid) {
	if( confirm("해당 프로세스를 강제종료하시겠습니까?") == false )
		return;

	hidden_frm.location.href = "jps_kill.jsp?pid=" + pid;
}

</script>
</head>

<body topmargin="4" marginheight="4">

<table width="100%" cellpadding="2" cellspacing="0" border="0">
	<tr>
    	<td class="title">[Java Process]</td>
	</tr>
</table>
<table width="100%" border="0" cellpadding="0" cellspacing="0">
	<tr>
    	<td bgcolor="#666666">
        	<table width="100%" border="0" cellpadding="2" cellspacing="1">
            	<tr bgcolor="#FFFFFF">
              		<td width="40" align="center">PID</td>
              		<td align="center">Process</td>
              		<td width="60" align="center">관리</td>
                </tr>
<%

	String result = "";
	StringWriter sw = new StringWriter();

	try {
		Process process = Runtime.getRuntime().exec("jps -v");
		InputStream is = process.getInputStream();

		while( true ) {
			int imsi = is.read();
			if( imsi == -1 )
				break;
			sw.write((char)imsi);
		}

		result = new String(sw.toString().getBytes("8859_1"), "EUC-KR");

	} catch( Exception e) {
		out.println(e.getMessage());
	}


	String[] ps = UtilMgr.split(result, "\r\n");
	
	Arrays.sort(ps);

	for(int i=0; i < ps.length; i++) {
		int pos = ps[i].indexOf(" ");
		String pid = ps[i].substring(0, pos);
		String pname = ps[i].substring(pos+1);
%>
				<tr bgcolor="#F6F6F6" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#F6F6F6'">
                	<td align="center"><a href="#" style="cursor:pointer;" onclick="doKill(<%= pid %>)">강제종료</a></td>
					<td align="center"><%= pid %></td>
                	<td style="color:#000080;"><%= pname %></td>
				</tr>
<%
	}
%>
			</table>
		</td>
	</tr>
</table>

<br /><br />

<form name="form1" method="post" action="jps_run.jsp" target="result_frm">
<table width="100%" cellpadding="2" cellspacing="0" border="0">
	<tr>
    	<td class="title">[Run Command]</td>
	</tr>
</table>
<input type="text" name="cmd" size="100" /><input type="submit" value="실행" />
<br />
<iframe name="result_frm" src="about:blank" width="100%" height="200"></iframe>
</form>


<iframe name="hidden_frm" src="about:blank" width="0" height="0" border="0"></iframe>

</body>

</html>
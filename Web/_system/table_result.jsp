<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*" %>
<%

	String sql = request.getParameter("sql");
	String[] data = null;
	String[] columns = null;

	if( sql == null || sql.length() == 0 )
		return;

	String cmd = sql.trim().toUpperCase().substring(0,6);

	if( cmd.equals("SELECT") ) {
		data = SqlMgr.getFieldList(sql);
		columns = SqlMgr.getLastMetaData();
	}

%>
<html>

<head>
<title>테이블 명세서</title>
<LINK href="table.css" type="text/css" rel="STYLESHEET"></LINK>
</head>

<body topmargin="10" marginheight="10">
<table width="100%" cellpadding="2" cellspacing="0" border="0" style="margin-bottom:5px;">
	<tr>
    	<td><font size="+1"><b>쿼리실행 결과</b></font></td>
	</tr>
    <tr>
    	<td height="30"><%= sql %></td>
	</tr>
</table>
<table width="100%" border="0" cellpadding="0" cellspacing="0">
	<tr>
    	<td bgcolor="#666666">
        	<table width="100%" border="0" cellpadding="2" cellspacing="1">
            	<tr bgcolor="#FFFFFF">
            		<td align="center">#</td>
<%
	for(int i=0; i < columns.length; i++) {
%>
                	<td align="center"><%= columns[i] %></td>
<%
	}
%>
				</tr>
<%
	for(int i=0; i < data.length; i+=columns.length) {
%>
				<tr bgcolor="#F6F6F6">
					<td align="center"><%= (i/columns.length)+1 %></td>
<%
		for(int j=0; j < columns.length; j++) {
%>
                	<td><nobr><%= data[i+j] == null ? "&nbsp;" : data[i+j] %></nobr></td>
<%
		}
%>
				</tr>
<%
	}
%>
			</table>
		</td>
	</tr>
</table>
</body>

</html>
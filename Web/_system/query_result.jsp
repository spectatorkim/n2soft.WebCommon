<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*" %>
<%

	String sql = request.getParameter("sql");
	String[] data = null;
	String[] columns = null;

	if( sql == null || sql.length() == 0 )
		return;

	String cmd = sql.trim().substring(0,6);
	boolean result = false;

	if( cmd.equalsIgnoreCase("SELECT") ) {
		data = SqlMgr.getFieldList(sql);
		columns = SqlMgr.getLastMetaData();
	}
	else
		result = SqlMgr.doQuery(sql);

%>
<html>

<head>
<title>테이블 명세서</title>
<LINK href="table.css" type="text/css" rel="STYLESHEET"></LINK>
</head>

<body topmargin="10" marginheight="10">
<%
if( data != null ) {
%>
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
				<tr bgcolor="#F6F6F6" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#F6F6F6'">
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
<%
}
else
	out.println("Query Result: " + result);
%>
</body>

</html>
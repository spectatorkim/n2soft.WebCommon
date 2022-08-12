<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*,java.sql.Connection" %>
<%

	String sql = request.getParameter("sql");
	String[] data = null;
	String[] columns = null;

	if( sql == null || sql.length() == 0 )
		return;

    String db_driver = Env.get("database2.driver", "");
    String db_url = Env.get("database2.url", "");
    String db_user = Env.get("database2.user", "");
    String db_pass = Env.get("database2.pass", "");
	
    Connection conn = SqlMgr.getDBConnection(db_driver, db_url, db_user, db_pass);


	String cmd = sql.trim().substring(0,6);
	boolean result = false;

	if( cmd.equalsIgnoreCase("SELECT") ) {
		data = SqlMgr.getFieldList(conn, sql);
		columns = SqlMgr.getLastMetaData();
	}
	else
		result = SqlMgr.doQuery(conn, sql);

	SqlMgr.close(conn);
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
<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*,java.sql.Connection" %>
<%

	String proc = request.getParameter("proc");
	String sql = request.getParameter("sql");

	if( proc == null || proc.length() == 0 || sql == null || sql.length() == 0 ) {
%>
<script language="javascript">
alert("입력값이 올바르지 않습니다.  ");
location.replace("about:blank");
</script>
<%
		return;
	}

	Connection conn = SqlMgr.getDBConnection();

	SqlMgr.doQuery(conn, sql);

	boolean result = SqlMgr.doQuery(conn, "ALTER PROCEDURE " + proc + " COMPILE");
	
	SqlMgr.close(conn);
%>
<script language="javascript">
alert("<%= result? "저장되었습니다.  " : "저장하는데 실패했습니다.  " %>");
parent.location.reload();
</script>
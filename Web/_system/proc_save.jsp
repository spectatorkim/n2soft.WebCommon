<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*,java.sql.Connection" %>
<%

	String proc = request.getParameter("proc");
	String sql = request.getParameter("sql");

	if( proc == null || proc.length() == 0 || sql == null || sql.length() == 0 ) {
%>
<script language="javascript">
alert("�Է°��� �ùٸ��� �ʽ��ϴ�.  ");
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
alert("<%= result? "����Ǿ����ϴ�.  " : "�����ϴµ� �����߽��ϴ�.  " %>");
parent.location.reload();
</script>
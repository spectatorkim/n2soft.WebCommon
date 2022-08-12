<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="com.n2soft.common.*" %>
<%

	String name = request.getParameter("name");
	String comment = request.getParameter("comment");

	System.out.print(comment);

	if( name == null || name.length() == 0 ) {
%>
<script language="javascript">
alert("올바른 접근이 아닙니다.  ");
location.replace("about:blank");
</script>
<%
		return;
	}

	String target = "column";
	if( name.indexOf(".") < 0 )
		target = "table";

	String db_type = Env.get("database.type","oracle");

	if( db_type.equals("oracle") )
		SqlMgr.doQuery("comment on " + target + " " + name + " is '" + comment + "'");
	else if( db_type.equals("mssql") ) {
		if( target.equals("table") ) {
			SqlMgr.doQuery("exec sp_dropextendedproperty 'MS_Description', 'user', 'dbo', 'table', '" + name + "'");
			SqlMgr.doQuery("exec sp_addextendedproperty 'MS_Description', '" + comment + "', 'user', 'dbo', 'table', '" + name + "'");
		}
		else {
			String table = name.substring(0, name.indexOf("."));
			String column = name.substring(name.indexOf(".")+1);
			SqlMgr.doQuery("exec sp_dropextendedproperty 'MS_Description', 'user', 'dbo', 'table', '" + table + "', 'column', '" + column + "'");
			SqlMgr.doQuery("exec sp_addextendedproperty 'MS_Description', '" + comment + "', 'user', 'dbo', 'table', '" + table + "', 'column', '" + column + "'");
		}
	}

	session.setAttribute("table", name);

%>
<script language="javascript">
//parent.location.reload();
</script>
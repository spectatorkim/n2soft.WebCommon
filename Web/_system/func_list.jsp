<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*" %>
<%

	String sql = "";

	String db_type = Env.get("database.type", "oracle");

	String func = (String)session.getAttribute("func");


	if( db_type.equals("oracle") )
		sql = "select"
			+ " object_name"
			+ " from user_objects"
			+ " where object_type = 'FUNCTION'"
			+ " order by object_name";
	else if( db_type.equals("mssql") )
		sql = "select"
			+ " t.name"
			+ ",isnull(cast(tc.value as varchar),' ')"
			+ " from sys.tables t"
			+ " left join fn_listextendedproperty('MS_Description','user','dbo','table',default,default,default) tc on t.name = tc.objname collate Korean_Wansung_CI_AS"
			+ " order by t.name";


	String[] funcs = SqlMgr.getFieldList(sql);

	if( func == null || func.length() == 0 )
		func = funcs[0];
	else
		session.removeAttribute("func");

%>
<html>

<head>
<title>nTree 함수 명세서</title>
<LINK href="table.css" type="text/css" rel="STYLESHEET"></LINK>
<script language="javascript">

function Go(func) {
	parent.mainFrame.location.href = "func_info.jsp?func=" + func;
}

</script>
</head>

<body topmargin="4" marginheight="4" onLoad="if( parent.mainFrame.location.href == 'about:blank') Go('<%= func %>');">
<table width="100%" cellpadding="2" cellspacing="0" border="0" style="margin-bottom:6px;">
	<tr>
    	<td class="title">함수 명세서</td>
	</tr>
</table>
<table width="100%" border="0" cellpadding="0" cellspacing="0">
	<tr>
    	<td bgcolor="#666666">
        	<table width="100%" border="0" cellpadding="2" cellspacing="1">
            	<tr bgcolor="#FFFFFF">
              		<td align="center">#</td>
              		<td align="center">함수</td>
                </tr>
<%
	for(int i=0; i < funcs.length; i++) {
		String bgcolor = (i%2 == 0) ? "#E8EEFF" : "#FFFFFF";
%>
				<tr bgcolor="<%= bgcolor %>" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='<%= bgcolor %>'" onClick="Go('<%= funcs[i] %>');" style="cursor:hand;">
					<td align="center"><%= i+1 %></td>
                	<td style="color:#000080;"><nobr><%= funcs[i] %></nobr></td>
				</tr>
<%
	}
%>
			</table>
		</td>
	</tr>
</table>
<iframe name="hiddenFrame" src="about:blank" width="0" height="0" border="0"></iframe>
</body>

</html>
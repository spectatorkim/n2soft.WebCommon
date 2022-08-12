<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*" %>
<%

	String filter = request.getParameter("filter");

	if( filter == null )
		filter = "";

	String sql = "select"
		+ " a.CD_KIND"
		+ ",NVL(b.CD_NM,' ')"
		+ " from CMC002TM a"
		+ " left join CMC001TM b on a.CD_KIND = b.CD_KIND"
		+ ((filter.length() > 0) ? " where b.CD_NM like '%" + filter + "%'" : "")
		+ " group by a.CD_KIND, b.CD_NM"
		+ " order by a.CD_KIND";

	String[] cd_kinds = SqlMgr.getFieldList(sql);

%>
<html>

<head>
<title>nTree �ڵ� ���</title>
<LINK href="table.css" type="text/css" rel="STYLESHEET"></LINK>
<script language="javascript">

function Go(cd_kind) {
	parent.mainFrame.location.href = "code_info.jsp?cd_kind=" + cd_kind;
}

</script>
</head>

<body topmargin="4" marginheight="4" onLoad="if( parent.mainFrame.location.href == 'about:blank') Go('<%= cd_kinds[0] %>');">
<table width="100%" cellpadding="2" cellspacing="0" border="0" style="margin-bottom:6px;">
<form name="form1" method="get">
	<tr>
    		<td class="title">�ڵ� ���</td>
    		<td align="right"><input type="text" name="filter" value="<%= filter %>" class="form2" size="12"><input type="submit" value="�˻�" class="form2"></td>
	</tr>
</form>
</table>
<table width="100%" border="0" cellpadding="0" cellspacing="0">
	<tr>
    	<td bgcolor="#666666">
        	<table width="100%" border="0" cellpadding="2" cellspacing="1">
            	<tr bgcolor="#FFFFFF">
              		<td align="center">#</td>
              		<td align="center">�ڵ�׷�</td>
              		<td align="center">�ڵ��</td>
                </tr>
<%
	for(int i=0; i < cd_kinds.length; i+=2) {
		String bgcolor = (i%4 == 2) ? "#FFFFFF" : "#E8EEFF";
%>
				<tr bgcolor="<%= bgcolor %>" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='<%= bgcolor %>';" onClick="Go('<%= cd_kinds[i] %>');" style="cursor:hand;">
					<td align="center"><%= (i/2)+1 %></td>
                	<td align="center" style="color:#000080;"><nobr><%= cd_kinds[i] %></nobr></td>
                	<td><nobr><%= cd_kinds[i+1] %></nobr></td>
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
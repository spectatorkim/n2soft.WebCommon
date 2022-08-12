<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*" %>
<%

	String sql = "select"
			+ " m1.sys_cd"
			+ ",m1.sys_nm"
			+ ",m2.grp_seq"
			+ ",m2.grp_nm"
			+ " from CMM002TM m2"
			+ " left join CMM001TM m1 on m1.sys_cd = m2.sys_cd"
			+ " where m2.use_yn = 'Y'"
			+ " and m1.use_yn = 'Y'"
			+ " order by m1.view_seq, m1.sys_cd, m2.view_seq, m2.grp_seq";

	StringMap list = SqlMgr.getGroupMap(sql);

%>
<html>

<head>
<title>nTree 코드 목록</title>
<LINK href="table.css" type="text/css" rel="STYLESHEET"></LINK>
<script language="javascript">

function Go(grp_seq, grp_nm, sys_nm) {
	parent.mainFrame.location.href = "menu_info.jsp?grp_seq=" + grp_seq + "&grp_nm=" + grp_nm + "&sys_nm=" + sys_nm;
}

</script>
</head>

<body topmargin="4" marginheight="4" onLoad="if( parent.mainFrame.location.href == 'about:blank') Go('<%= list.get("grp_seq",0,"") %>','<%= list.get("grp_nm",0,"") %>','<%= list.get("sys_nm",0,"") %>');">
<table width="100%" cellpadding="2" cellspacing="0" border="0" style="margin-bottom:6px;">
<form name="form1" method="get">
	<tr>
    		<td class="title">메뉴 목록</td>
	</tr>
</form>
</table>
<table width="100%" border="0" cellpadding="0" cellspacing="0">
	<tr>
    	<td bgcolor="#666666">
        	<table width="100%" border="0" cellpadding="2" cellspacing="1">
            	<tr bgcolor="#FFFFFF">
              		<td align="center">시스템코드</td>
              		<td align="center">시스템명</td>
              		<td align="center">#</td>
              		<td align="center">메뉴명</td>
                </tr>
<%
	int cnt = list.getInt("count");

	for(int i=0; i < cnt; i++) {
		String sys_cd = list.get("sys_cd", i, "");
		int grp_cnt = list.getInt(sys_cd + ".count");
		list.put(sys_cd + ".count", grp_cnt+1);
	}

	String prev_sys_cd = "";
	int sub_cnt = 1;

	for(int i=0; i < cnt; i++, sub_cnt++) {
		String sys_cd = list.get("sys_cd", i, "");
		String sys_nm = list.get("sys_nm", i, "");
		String grp_seq = list.get("grp_seq", i, "");
		String grp_nm = list.get("grp_nm", i, "");
		int grp_cnt = list.getInt(sys_cd + ".count");
%>
				<tr bgcolor="#F6F6F6" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#F6F6F6'" onClick="Go('<%= grp_seq %>','<%= grp_nm %>','<%= sys_nm %>');" style="cursor:hand;">
<%
		if( !sys_cd.equals(prev_sys_cd) ) {
			prev_sys_cd = sys_cd;
			sub_cnt = 1;
%>
                	<td align="center" style="color:#000080; white-space:nowrap;"<%= (grp_cnt > 1) ? " rowspan=" + grp_cnt : ""  %>><%= sys_cd %></td>
                	<td align="center" style="white-space:nowrap;"<%= (grp_cnt > 1) ? " rowspan=" + grp_cnt : ""  %>><%= sys_nm %></td>
<%
		}
%>
                	<td align="center"><%= sub_cnt %></td>
                	<td style="white-space:nowrap;"><%= grp_nm %></td>
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
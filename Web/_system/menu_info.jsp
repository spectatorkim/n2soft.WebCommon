<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*" %>
<%

	String grp_seq = request.getParameter("grp_seq");
	String grp_nm = request.getParameter("grp_nm");
	String sys_nm = request.getParameter("sys_nm");

	if( grp_seq == null || grp_seq.length() == 0 )
		return;

	if( grp_nm == null )
		grp_nm = "";

	if( sys_nm == null )
		sys_nm = "";


	String sql = "select"
			+ " prg_id"
			+ ",prg_nm"
			+ ",prg_url"
			+ ",prg_note"
			+ ",menu_yn"
			+ " from CMM003TM"
			+ " where grp_seq = " + grp_seq
			+ " order by prg_id";

	String[] prgs = SqlMgr.getFieldList(sql);

%>
<html>

<head>
<title>메뉴관리</title>
<LINK href="table.css" type="text/css" rel="STYLESHEET"></LINK>
</head>

<body topmargin="10" marginheight="10">
<table width="100%" cellpadding="2" cellspacing="0" border="0" style="margin-bottom:10px;">
	<tr>
    	<td class="title"><%= sys_nm %> - <%= grp_nm %></td>
	</tr>
</table>
<table width="100%" border="0" cellpadding="0" cellspacing="0">
	<tr>
    	<td bgcolor="#808080">
        	<table width="100%" border="0" cellpadding="2" cellspacing="1">
            	<tr bgcolor="#FFFFFF">
              		<td align="center"><nobr>#</nobr></td>
              		<td align="center"><nobr>프로그램ID</nobr></td>
              		<td align="center"><nobr>프로그램명</nobr></td>
              		<td align="center"><nobr>URL</nobr></td>
              		<td align="center"><nobr>설명</nobr></td>
              		<td align="center"><nobr>메뉴여부</nobr></td>
                </tr>
<%
	for(int i=0; i < prgs.length; i+=5) {
%>
				<tr bgcolor="#F6F6F6" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#F6F6F6'">
                	<td align="center"><%= (i/5+1) %></td>
                	<td align="center" style="color:#008000;"><%= prgs[i] %></td>
                	<td><nobr><%= prgs[i+1] == null ? " " : prgs[i+1] %></nobr></td>
                	<td><nobr><%= prgs[i+2] == null ? " " : prgs[i+2] %></nobr></td>
                	<td><nobr><%= prgs[i+3] == null ? " " : prgs[i+3] %></nobr></td>
                	<td align="center"><nobr><%= prgs[i+4] %></nobr></td>
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
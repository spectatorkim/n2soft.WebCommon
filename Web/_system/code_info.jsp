<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*" %>
<%

	String cd_kind = request.getParameter("cd_kind");

	if( cd_kind == null || cd_kind.length() == 0 )
		return;


	String sql = "";
	
	StringMap info = SqlMgr.getFieldMap("select CD_NM, RLNUM_1_NM, INT_1_NM, INT_2_NM, CHAR_1_NM, CHAR_2_NM, CHAR_3_NM, CHAR_4_NM, CHAR_5_NM from CMC001TM where CD_KIND = '" + cd_kind + "'");


	sql = "select"
		+ " CD"
		+ ",CD_NM"
		+ ",CD_SNM"
		+ ",CD_NOTE"
		+ ",CHAR_1"
		+ ",CHAR_2"
		+ ",CHAR_3"
		+ ",CHAR_4"
		+ ",CHAR_5"
		+ ",INT_1"
		+ ",INT_2"
		+ ",RLNUM_1"
		+ ",VIEW_SEQ"
		+ ",USE_YN"
		+ ",USE1_YN"
		+ ",USE2_YN"
		+ ",USE3_YN"
		+ " from CMC002TM"
		+ " where CD_KIND = '" + cd_kind + "'"
		+ " order by VIEW_SEQ, CD";

	String[] cds = SqlMgr.getFieldList(sql);

%>
<html>

<head>
<title>공통코드</title>
<LINK href="table.css" type="text/css" rel="STYLESHEET"></LINK>
</head>

<body topmargin="10" marginheight="10">
<table width="100%" cellpadding="2" cellspacing="0" border="0" style="margin-bottom:10px;">
	<tr>
    	<td class="title"><%= cd_kind %> (<%= info.get("CD_NM","") %>)</td>
    	<td align="right" style="padding-right:10px;"><a href="code_sql.jsp?cd_kind=<%= cd_kind %>">코드등록쿼리</a></td>
	</tr>
</table>
<table width="100%" border="0" cellpadding="0" cellspacing="0">
	<tr>
    	<td bgcolor="#808080">
        	<table width="100%" border="0" cellpadding="2" cellspacing="1">
            	<tr bgcolor="#FFFFFF">
              		<td align="center"><nobr>#</nobr></td>
              		<td align="center"><nobr>CD</nobr></td>
              		<td align="center"><nobr>CD_NM</nobr></td>
              		<td align="center"><nobr>CD_SNM</nobr></td>
              		<td align="center"><nobr>CD_NOTE</nobr></td>
              		<td align="center"><nobr><%= info.get("CHAR_1_NM", "C1") %></nobr></td>
              		<td align="center"><nobr><%= info.get("CHAR_2_NM", "C2") %></nobr></td>
              		<td align="center"><nobr><%= info.get("CHAR_3_NM", "C3") %></nobr></td>
              		<td align="center"><nobr><%= info.get("CHAR_4_NM", "C4") %></nobr></td>
              		<td align="center"><nobr><%= info.get("CHAR_5_NM", "C5") %></nobr></td>
              		<td align="center"><nobr><%= info.get("INT_1_NM", "N1") %></nobr></td>
              		<td align="center"><nobr><%= info.get("INT_2_NM", "N2") %></nobr></td>
              		<td align="center"><nobr><%= info.get("RLNUM_1_NM", "R1") %></nobr></td>
              		<td align="center"><nobr>!</nobr></td>
              		<td align="center"><nobr>Y</nobr></td>
              		<td align="center"><nobr>Y1</nobr></td>
              		<td align="center"><nobr>Y2</nobr></td>
              		<td align="center"><nobr>Y3</nobr></td>
                </tr>
<%
	for(int i=0; i < cds.length; i+=17) {
		String bgcolor = (i%34 == 17) ? "#FFFFFF" : "#E8EEFF";
%>
				<tr bgcolor="<%= bgcolor %>" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='<%= bgcolor %>';">
                	<td align="center"><%= (i/17+1) %></td>
                	<td align="center" style="color:#008000;"><%= cds[i] %></td>
                	<td><nobr><%= cds[i+1] == null ? " " : cds[i+1] %></nobr></td>
                	<td><nobr><%= cds[i+2] == null ? " " : cds[i+2] %></nobr></td>
                	<td><nobr><%= cds[i+3] == null ? " " : cds[i+3] %></nobr></td>
                	<td><nobr><%= cds[i+4] == null ? " " : cds[i+4] %></nobr></td>
                	<td><nobr><%= cds[i+5] == null ? " " : cds[i+5] %></nobr></td>
                	<td><nobr><%= cds[i+6] == null ? " " : cds[i+6] %></nobr></td>
                	<td><nobr><%= cds[i+7] == null ? " " : cds[i+7] %></nobr></td>
                	<td><nobr><%= cds[i+8] == null ? " " : cds[i+8] %></nobr></td>
                	<td><nobr><%= cds[i+9] == null ? " " : cds[i+9] %></nobr></td>
                	<td><nobr><%= cds[i+10] == null ? " " : cds[i+10] %></nobr></td>
                	<td><nobr><%= cds[i+11] == null ? " " : cds[i+11] %></nobr></td>
                	<td align="center"><nobr><%= cds[i+11] == null ? " " : cds[i+12] %></nobr></td>
                	<td><nobr><%= cds[i+13] == null ? " " : cds[i+13] %></nobr></td>
                	<td><nobr><%= cds[i+14] == null ? " " : cds[i+14] %></nobr></td>
                	<td><nobr><%= cds[i+15] == null ? " " : cds[i+15] %></nobr></td>
                	<td><nobr><%= cds[i+16] == null ? " " : cds[i+16] %></nobr></td>
				</tr>
<%
	}
%>
			</table>
		</td>
	</tr>
</table>

<iframe name="hiddenFrame" src="about:blank" width="0" height="0" frameborder="0"></iframe>

</body>

</html>
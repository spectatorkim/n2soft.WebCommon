<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*" %>
<%

	String filter = request.getParameter("filter");

	if( filter == null )
		filter = "";

	String sql = "select"
		+ " CD_DMN_ID"
		+ ",CD_DMN_NM"
		+ " from CBMM00001@BP2"
		+ " where 1=1"
		+ ((filter.length() > 0) ? " and CD_DMN_NM like '%" + filter + "%'" : "")
		+ " order by CD_DMN_NM";

	String[] cd_kinds = SqlMgr.getFieldList(sql);

%>
<html>

<head>
<title>중앙회 코드목록</title>
<LINK href="table.css" type="text/css" rel="STYLESHEET"></LINK>
<script language="javascript">

function Go(cd_kind,cd_nm) {
	parent.mainFrame.location.href = "fsb_code_info.jsp?cd_kind=" + cd_kind + "&cd_nm=" + cd_nm;
}

</script>
</head>

<body topmargin="4" marginheight="4"<% if( cd_kinds.length > 0 ) { %> onLoad="if( parent.mainFrame.location.href == 'about:blank') Go('<%= cd_kinds[0] %>','<%= cd_kinds[1] %>');"<% } %>>
<table width="100%" cellpadding="2" cellspacing="0" border="0" style="margin-bottom:6px;">
<form name="form1" method="get">
	<tr>
    		<td class="title">코드 목록</td>
    		<td align="right"><input type="text" name="filter" value="<%= filter %>" class="form2" size="12"><input type="submit" value="검색" class="form2"></td>
	</tr>
</form>
</table>
<table width="100%" border="0" cellpadding="0" cellspacing="0">
	<tr>
    	<td bgcolor="#666666">
        	<table width="100%" border="0" cellpadding="2" cellspacing="1">
            	<tr bgcolor="#FFFFFF">
              		<td align="center">#</td>
              		<td align="center">코드그룹</td>
              		<td align="center">코드명</td>
                </tr>
<%
	for(int i=0; i < cd_kinds.length; i+=2) {
		String bgcolor = (i%4 == 0) ? "#E8EEFF" : "#FFFFFF";
%>
				<tr bgcolor="<%= bgcolor %>" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='<%= bgcolor %>'" onClick="Go('<%= cd_kinds[i] %>','<%= cd_kinds[i+1] %>');" style="cursor:hand;">
					<td align="center"><%= (i/2)+1 %></td>
                	<td style="color:#000080;"><nobr><%= cd_kinds[i] %></nobr></td>
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
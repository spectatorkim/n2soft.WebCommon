<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*" %>
<%

String cd_kind = request.getParameter("cd_kind");
String cd_nm = request.getParameter("cd_nm");

	if( cd_kind == null || cd_kind.length() == 0 )
		return;


	String sql = "";
	
	sql = "select"
		+ " CD_DMN_VLD_VAL"
		+ ",CD_DMN_VLD_VAL_NM"
		+ ",DEL_YN"
		+ " from CBMI00002@BP2"
		+ " where CD_DMN_ID = '" + cd_kind + "'"
		+ " order by CD_DMN_VLD_VAL";

	String[] cds = SqlMgr.getFieldList(sql);

%>
<html>

<head>
<title>중앙회 공통코드</title>
<LINK href="table.css" type="text/css" rel="STYLESHEET"></LINK>
<script language="javascript">
function doImport() {
	with( document.form1 ) {
		if( cd_kind.value == "" || cd_kind.value.length != 3 ) {
			alert("코드그룹 3자리를 올바르게 입력하세요.  ");
			cd_kind.focus();
			return;
		}

		if( confirm("해당 중앙회코드를 공통코드로 등록하시겠습니까?  ") == false )
			return;

		action = "fsb_code_import.jsp";
		target = "hiddenFrame";
		submit();
	}
}
</script>
</head>

<body topmargin="10" marginheight="10">
<table width="100%" cellpadding="2" cellspacing="0" border="0" style="margin-bottom:10px;">
<form name="form1" method="post">
<input type="hidden" name="fsb_cd_kind" value="<%= cd_kind %>" />
<input type="hidden" name="cd_lngt" />
	<tr>
    	<td class="title"><%= cd_kind %> (<%= cd_nm %>)</td>
    	<td align="right" style="padding-right:10px;"><input type="text" name="cd_kind" size="3" title="코드그룹" /><input type="text" name="cd_nm" size="30" title="코드그룹명" value="<%= cd_nm %>" /> <input type="button" value="공통코드등록" onclick="doImport()" /></td>
	</tr>
</form>
</table>
<table width="100%" border="0" cellpadding="0" cellspacing="0">
	<tr>
    	<td bgcolor="#808080">
        	<table width="100%" border="0" cellpadding="2" cellspacing="1">
            	<tr bgcolor="#FFFFFF">
              		<td align="center"><nobr>#</nobr></td>
              		<td align="center"><nobr>CD</nobr></td>
              		<td align="center"><nobr>CD_NM</nobr></td>
              		<td align="center"><nobr>DEL</nobr></td>
                </tr>
<%
	for(int i=0; i < cds.length; i+=3) {
		String bgcolor = (i%6 == 0) ? "#E8EEFF" : "#FFFFFF";
%>
				<tr bgcolor="<%= bgcolor %>" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='<%= bgcolor %>'">
                	<td align="center"><%= (i/3+1) %></td>
                	<td style="color:#008000;"><nobr><%= cds[i] == null ? " " : cds[i] %></nobr></td>
                	<td><nobr><%= cds[i+1] == null ? " " : cds[i+1] %></nobr></td>
                	<td align="center"><nobr><%= cds[i+2] == null ? " " : cds[i+2] %></nobr></td>
				</tr>
<%
		if( i == 0 )
			out.println("<script> document.form1.cd_lngt.value = " + cds[i].length() + "; </script>");
	}
%>
			</table>
		</td>
	</tr>
</table>
<iframe name="hiddenFrame" src="about:blank" width="0" height="0" border="0"></iframe>
</body>

</html>
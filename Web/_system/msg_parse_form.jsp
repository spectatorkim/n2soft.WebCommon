<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*,com.n2soft.msg.*" %>
<%

	String msg_id = request.getParameter("msg");
	if( msg_id == null || msg_id.length() == 0 )
		return;

	String mode = request.getParameter("mode");
	if( mode == null || mode.length() == 0 )
		mode = "INPUT";

	MsgBase._msg msg = MsgBase.getMsg(msg_id);

%>
<html>

<head>
<title>전문 테스트</title>
<LINK href="table.css" type="text/css" rel="STYLESHEET"></LINK>
</head>

<body topmargin="4" marginheight="4">
<form name="form1" method="post" action="msg_parse.jsp">
<input type="hidden" name="mode" value="<%= mode %>" />
<input type="hidden" name="msg_id" value="<%= msg_id %>" />
<table width="100%" cellpadding="2" cellspacing="0" border="0" style="margin-bottom:6px;">
	<tr>
    	<td class="title"><%= msg.name %> [<%= msg_id %>] - <%= mode %></td>
    	<td align="right"><a href="msg_parse_form.jsp?msg=<%= msg_id %>&mode=<%= mode %>">PARSE</a>
<% if( mode.equals("INPUT") ) { %>
		| <a href="msg_xml.jsp?msg_id=<%= msg_id %>" target="msg_xml">XML</a>
		| <a href="msg_test_input.jsp?msg=<%= msg_id %>">TEST</a>
<% } %>
		| <a href="msg_sql.jsp?msg_id=<%= msg_id %>" target="msg_sql">SQL</a>
		</td>
	</tr>
</table>
<table width="100%" border="0" cellpadding="0" cellspacing="0">
	<tr>
    	<td bgcolor="#666666">
        	<table width="100%" border="0" cellpadding="2" cellspacing="1">
            	<tr bgcolor="#FFFFFF">
                	<td align="center"><textarea name="msg" style="width:96%; height:250px; font-size:8pt; white-space:normal;" wrap="soft"></textarea></td>
				</tr>
			</table>
		</td>
	</tr>
</table>
<table width="100%" cellpadding="2" cellspacing="0" border="0" style="margin-top: 6px; margin-bottom:6px;">
	<tr>
    	<td class="title" align="right"><input type="submit" value="  전 송  " /></td>
	</tr>
</table>

</form>
</body>

</html>
<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*,com.n2soft.msg.*" %>
<%

	String msg_id = request.getParameter("msg");

	if( msg_id == null || msg_id.length() == 0 )
		return;


	StringMap data = null;

	String use_session = request.getParameter("use_session");
	if( use_session != null && use_session.equalsIgnoreCase("Y") )
		data = (StringMap)session.getAttribute("__MSG_DATA__");

	if( data == null )
		data = new StringMap();
	
	MsgBase._msg body = MsgBase.getMsg(msg_id);

	String head_id = body.head_id;
	if( head_id == null || head_id.length() == 0 )
		head_id = msg_id.substring(0,msg_id.indexOf(".")) + ".HEAD";

	MsgBase._msg head = MsgBase.getMsg(head_id);

%>
<html>

<head>
<title>전문 테스트</title>
<LINK href="table.css" type="text/css" rel="STYLESHEET"></LINK>
<script language="javascript">

var add_items = 0;

function AddItem() {
	add_items ++;
	
	var src = add_item.innerHTML;

	src += "<table width=\"100%\" border=\"0\" cellpadding=\"2\" cellspacing=\"1\">\n<tr bgcolor=\"#DDDDDD\" onMouseOver=\"this.style.backgroundColor='#FFE8C0';\" onMouseOut=\"this.style.backgroundColor='#E2F2E2'\">\n    	<td align=\"center\" width=\"5%\">" + add_items + "</td>\n    	<td align=\"center\" width=\"65%\"><input type=\"text\" name=\"items\" style=\"width:96%; font-size:8pt;\" /></td>\n    	<td align=\"center\" width=\"30%\"><input type=\"text\" name=\"values\" style=\"width:96%; font-size:8pt;\" /></td>\n	</tr>\n</table>\n";

	add_item.innerHTML = src;
}

</script>
</head>

<body topmargin="4" marginheight="4">
<form name="form1" method="post" action="msg_test_output.jsp" target="outFrame">
<input type="hidden" name="msg_id" value="<%= msg_id %>" />
<input type="hidden" name="use_session" />
<table width="100%" cellpadding="2" cellspacing="0" border="0" style="margin-bottom:6px;">
	<tr>
    	<td class="title"><%= body.name %> [<%= msg_id %>] - INPUT</td>
    	<td align="right"><a href="msg_parse_form.jsp?msg=<%= msg_id %>&mode=INPUT">PARSE</a>
		| <a href="msg_sql.jsp?msg_id=<%= msg_id %>" target="msg_sql">SQL</a>
		| <a href="msg_xml.jsp?msg_id=<%= msg_id %>" target="msg_xml">XML</a>
		| <a href="msg_test_input.jsp?msg=<%= msg_id %>">TEST</a>
    	&nbsp; <input type="button" value="세션값 사용" onclick="location.href='msg_test_input.jsp?msg=<%= msg_id %>&use_session=Y';" />
    		<input type="submit" value="  전 송  " /></td>
	</tr>
</table>
<table width="100%" border="0" cellpadding="0" cellspacing="0">
	<tr>
    	<td bgcolor="#666666">
        	<table width="100%" border="0" cellpadding="2" cellspacing="1">
            	<tr bgcolor="#FFFFFF">
              		<td align="center">#</td>
              		<td align="center">ID</td>
              		<td align="center">NAME</td>
              		<td align="center">LENGTH</td>
              		<td align="center">TYPE</td>
              		<td align="center">DEFAULT</td>
              		<td align="center" width="30%">VALUE</td>
                </tr>
				<tr bgcolor="#F2E2E2" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#F2E2E2'">
                	<td align="center">&nbsp;</td>
                	<td style="color:#008000;">REQ_ID</td>
                	<td colspan="3">요청아이디</td>
                	<td align="center">&nbsp;</td>
                	<td align="center"><input type="text" name="REQ_ID" style="width:96%; font-size:8pt;" value="1111111111111" /></td>
				</tr>
				<tr bgcolor="#F2E2E2" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#F2E2E2'">
                	<td align="center">&nbsp;</td>
                	<td style="color:#008000;">RESID_NO</td>
                	<td colspan="3">주민등록번호</td>
                	<td align="center">&nbsp;</td>
                	<td align="center"><input type="text" name="RESID_NO" style="width:96%; font-size:8pt;" value="1111111111111" /></td>
				</tr>
				<tr bgcolor="#F2E2E2" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#F2E2E2'">
                	<td align="center">&nbsp;</td>
                	<td style="color:#008000;">ADMIN_ID</td>
                	<td colspan="3">조회자아이디</td>
                	<td align="center">&nbsp;</td>
                	<td align="center"><input type="text" name="ADMIN_ID" style="width:96%; font-size:8pt;" value="" /></td>
				</tr>
				<tr bgcolor="#F2E2E2" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#F2E2E2'">
                	<td align="center">&nbsp;</td>
                	<td style="color:#008000;">INQ_MODE</td>
                	<td colspan="3">조회모드</td>
                	<td align="center">&nbsp;</td>
                	<td align="center"><select name="INQ_MODE" style="width:96%; font-size:8pt;">
                		<option value="">DEFAULT</option>
                		<option value="1">REAL</option>
                		<option value="2">TEST</option>
                		<option value="3">DEV</option>
                		</select></td>
				</tr>
				<tr bgcolor="#F2E2E2" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#F2E2E2'">
                	<td align="center">&nbsp;</td>
                	<td style="color:#008000;">SERVER.IP</td>
                	<td colspan="3">서버IP</td>
                	<td align="center">&nbsp;</td>
                	<td align="center"><input type="text" name="SERVER.IP" style="width:96%; font-size:8pt;" value="" /></td>
				</tr>
				<tr bgcolor="#F2E2E2" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#F2E2E2'">
                	<td align="center">&nbsp;</td>
                	<td style="color:#008000;">SERVER.PORT</td>
                	<td colspan="3">서버PORT</td>
                	<td align="center">&nbsp;</td>
                	<td align="center"><input type="text" name="SERVER.PORT" style="width:96%; font-size:8pt;" value="" /></td>
				</tr>
				<tr bgcolor="#CCCCCC">
                	<td align="center" colspan="7" height="1"></td>
				</tr>
<%
	if( head != null ) {

		MsgBase._unit head_unit = head.unit[MsgBase.RequestMode.REQUEST.ordinal()];

		for(int i=0; i < head_unit.items; i++) {
			MsgBase._item item = head_unit.item[i];

			if( item.is_group )
				continue;
%>
				<tr bgcolor="#E2E2F2" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#E2E2F2'">
                	<td align="center"><%= i+1 %></td>
                	<td style="color:#008000;"><%= item.id %></td>
                	<td><%= item.name %></td>
                	<td align="center"><%= item.length %></td>
                	<td align="center"><%= item.type.equalsIgnoreCase("N") ? "NUM" : "CHAR" %></td>
                	<td align="center"><%= item.value == null ? "&nbsp;" : item.value %></td>
                	<td align="center"><input type="text" name="<%= item.id %>" style="width:96%; font-size:8pt;" /></td>
				</tr>
<%
		}
%>
				<tr bgcolor="#CCCCCC">
                	<td align="center" colspan="7" height="1"></td>
				</tr>
<%
	}


MsgBase._unit body_unit = body.unit[MsgBase.RequestMode.REQUEST.ordinal()];

	for(int i=0; i < body_unit.items; i++) {
		MsgBase._item item = body_unit.item[i];

		if( item.is_group )
			continue;
%>
				<tr bgcolor="#E2F2E2" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#E2F2E2'">
                	<td align="center"><%= i+1 %></td>
                	<td style="color:#008000;"><%= item.id %></td>
                	<td><%= item.name %></td>
                	<td align="center"><%= item.length %></td>
                	<td align="center"><%= item.type.equalsIgnoreCase("N") ? "NUM" : "CHAR" %></td>
                	<td align="center"><%= item.value == null ? "&nbsp;" : item.value %></td>
                	<td align="center"><input type="text" name="<%= item.id %>" value="<%= data.get(item.id,"") %>" style="width:96%; font-size:8pt;" /></td>
				</tr>
<%
	}
%>
			</table>

			<span id="add_item"></span>


		</td>
	</tr>
</table>

<table width="100%" cellpadding="2" cellspacing="0" border="0" style="margin-bottom:6px;">
	<tr>
    	<td class="title" height="30"><input type="button" value="필드추가" onclick="AddItem()" /></td>
    	<td class="form2" align="right" height="30">
    	&nbsp; <input type="button" value="세션값 사용" onclick="location.href='msg_test_input.jsp?msg=<%= msg_id %>&use_session=Y';" />
    	<input type="submit" value="  전 송  " /></td>
	</tr>
</table>

</form>
</body>

</html>
<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*,com.n2soft.msg.*" %>
<%

	String msg_id = request.getParameter("msg");
	String mode = request.getParameter("mode");

	if( msg_id == null || msg_id.length() == 0 )
		return;

	if( mode == null || mode.length() == 0 )
		mode = "INPUT";

	MsgBase._msg msg = MsgBase.getMsg(msg_id);
	MsgMgr mgr = new MsgMgr(msg_id);

%>
<html>

<head>
<title>전문 명세서</title>
<LINK href="table.css" type="text/css" rel="STYLESHEET"></LINK>
<script language="javascript">
var popup = window.createPopup();
var popupBody = popup.document.body;
popupBody.style.backgroundColor = "#EEEEEE";
popupBody.style.border = "solid black 1px";
popupBody.style.margin = "10px";
str = "<form name=form1><textarea name='sql' style='width:100%; height:300; font-family:돋움체; font-size:9pt;'></textarea>";
str += "<center><input type='button' value='전체선택' style='margin-top:5px;' onclick='parent.selectAll()' /> <input type='button' value='닫기' style='margin-top:5px;' onclick='parent.popup.hide()' /></center></form>";
popupBody.innerHTML = str;

function showSql(msg_id) {
	popup.document.form1.sql.value = document.form1.sql.value;
	popup.document.form1.sql.style.height = document.body.clientHeight - 90;
	popup.show(20, 20, document.body.clientWidth - 40, document.body.clientHeight - 40, document.body);
}

function selectAll() {
	popup.document.form1.sql.focus();
	popup.document.form1.sql.select();
}

</script>
</head>

<body topmargin="4" marginheight="4">
<table width="100%" cellpadding="2" cellspacing="0" border="0" style="margin-bottom:6px;">
	<tr>
    	<td class="title"><%= msg.name %> [<%= msg_id %>] - <%= mode %></td>
    	<td align="right"><a href="msg_parse_form.jsp?msg=<%= msg_id %>&mode=<%= mode %>">PARSE</a>
		| <a href="msg_sql.jsp?msg_id=<%= msg_id %>" target="msg_sql">SQL</a>
<% if( mode.equals("INPUT") ) { %>
		| <a href="msg_xml.jsp?msg_id=<%= msg_id %>" target="msg_xml">XML</a>
		| <a href="msg_test_input.jsp?msg=<%= msg_id %>">TEST</a>
<% } %>
		</td>
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
              		<td align="center">#</td>
              		<td align="center">ID</td>
              		<td align="center">NAME</td>
              		<td align="center">#</td>
              		<td align="center">ID</td>
              		<td align="center">NAME</td>
              		<td align="center">LENGTH</td>
              		<td align="center">TYPE</td>
              		<td align="center">VALUE</td>
              		<td align="center">TABLE.FIELD</td>
                </tr>
<%
	MsgBase._unit unit = mode.equals("INPUT") ? msg.unit[MsgBase.RequestMode.REQUEST.ordinal()] : msg.unit[MsgBase.RequestMode.RESPONSE.ordinal()];
	int items = unit.items;

	for(int i=0; i < items; i++) {
		MsgBase._item item = mode.equals("INPUT") ? msg.unit[MsgBase.RequestMode.REQUEST.ordinal()].item[i] : msg.unit[MsgBase.RequestMode.RESPONSE.ordinal()].item[i];

		String bgcolor = (i%2 == 1) ? "#FFFFFF" : "#E8EEFF";

		if( item.is_group ) {

			int rowspan = item.items;
			for(int j=0; j < item.items; j++) {
				MsgBase._item item1 = item.item[j];
				if( item1.is_group )
					rowspan += item1.items - 1;
			}

			for(int j=0; j < item.items; j++) {
				MsgBase._item item1 = item.item[j];
				bgcolor = (j%2 == 1) ? "#FFFFFF" : "#E8EEFF";
%>
				<tr bgcolor="<%= bgcolor %>" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='<%= bgcolor %>'">
<%
				if( j == 0 ) {
%>
                	<td rowspan="<%= rowspan %>" align="center"><%= i+1 %></td>
                	<td rowspan="<%= rowspan %>" style="color:#008000;"><%= item.id %></td>
                	<td rowspan="<%= rowspan %>"><%= item.name %></td>
<%
				}

				if( item1.is_group ) {
					
					for(int k=0; k < item1.items; k++) {
						MsgBase._item item2 = item1.item[k];
						bgcolor = (k%2 == 1) ? "#FFFFFF" : "#E8EEFF";

						if( k == 0 ) {
%>
		                	<td rowspan="<%= item1.items %>" align="center"><%= j+1 %></td>
		                	<td rowspan="<%= item1.items %>" style="color:#008000;"><%= item1.id %></td>
		                	<td rowspan="<%= item1.items %>"><%= item1.name %></td>
<%
						}
						else {
%>
				<tr bgcolor="<%= bgcolor %>" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='<%= bgcolor %>'">
<%
						}
%>
                	<td align="center"><%= k+1 %></td>
                	<td style="color:#008000;"><%= item2.id %></td>
                	<td><%= item2.name %></td>
                	<td align="center"><%= item2.length %></td>
                	<td align="center"><%= item2.type.equals("N") ? "NUM" : (item2.type.equals("S") ? "ENC" : "CHAR") %></td>
                	<td align="center"><%= item2.value == null ? "&nbsp;" : item2.value %></td>
              		<td align="center"><%= (item2.field == null || item2.field.length() == 0) ? "&nbsp;" : item1.table + "." + item2.field %></td>
              	</tr>
<%
					}
				}
				else {
%>
                	<td align="center"><%= j+1 %></td>
                	<td style="color:#008000;"><%= item1.id %></td>
                	<td><%= item1.name %></td>
					<td colspan="3">&nbsp;</td>
                	<td align="center"><%= item1.length %></td>
                	<td align="center"><%= item1.type.equals("N") ? "NUM" : (item1.type.equals("S") ? "ENC" : "CHAR") %></td>
                	<td align="center"><%= item1.value == null ? "&nbsp;" : item1.value %></td>
              		<td align="center"><%= (item1.field == null || item1.field.length() == 0) ? "&nbsp;" : item.table + "." + item1.field %></td>
				</tr>
<%
				}
			}
		}
		else {
%>
				<tr bgcolor="<%= bgcolor %>" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='<%= bgcolor %>'">
                	<td align="center"><%= i+1 %></td>
                	<td style="color:#008000;"><%= item.id %></td>
                	<td><%= item.name %></td>
					<td colspan="6">&nbsp;</td>
                	<td align="center"><%= item.length %></td>
                	<td align="center"><%= item.type.equals("N") ? "NUM" : (item.type.equals("S")? "ENC" : "CHAR") %></td>
                	<td align="center"><%= item.value == null ? "&nbsp;" : item.value %></td>
              		<td align="center"><%= (item.field == null || item.field.length() == 0) ? "&nbsp;" : unit.table + "." + item.field %></td>
				</tr>
<%
		}
	}
%>
			</table>
		</td>
	</tr>
</table>

<form name=form1><textarea name=sql style="display:none;"><%= mgr.toSql(false) %></textarea></form>

</body>

</html>
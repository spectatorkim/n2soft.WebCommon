<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*,com.n2soft.msg.*,java.util.*" %>
<%

	String msg_id = request.getParameter("msg_id");
	if( msg_id == null || msg_id.length() == 0 )
		return;

	String msg = request.getParameter("msg");
	if( msg == null || msg.length() == 0 )
		return;

	MsgBase.ServiceMode mode = MsgBase.ServiceMode.SERVER;
	String s_mode = request.getParameter("mode");
	if( s_mode != null && s_mode.equalsIgnoreCase("OUTPUT") )
		mode = MsgBase.ServiceMode.CLIENT;

	StringMap info = SqlMgr.getFieldMap("select HOST_ID, MSG_CD from CMN002TM where MSG_ID = '" + msg_id + "' order by MSG_CD");
	String host_id = info.get("HOST_ID","");
	String msg_cd = info.get("MSG_CD","");

	if( msg_cd.length() == 0 )
		return;


	MsgMgr body = new MsgMgr(msg_id, mode);

	String head_id = body.getHeadId();
	if( head_id.length() == 0 )
		head_id = host_id + ".HEAD";

	MsgMgr head = new MsgMgr(head_id, mode);


	int len_width = Env.getInt(host_id + ".len_width");
	boolean len_include = Env.get(host_id + ".len_include","").equalsIgnoreCase("Y");

	if( !len_include )
		msg = UtilMgr.substring(msg, len_width);


	StringMap data = new StringMap();

	head.setMsg(msg);
	head.get(data);

	if( data.get("BITMAP","").length() > 0 )
		body.setBitmap(data.get("BITMAP",""), mode == MsgBase.ServiceMode.SERVER ? MsgBase.RequestMode.REQUEST : MsgBase.RequestMode.RESPONSE);

	int head_len = head.getLength(mode == MsgBase.ServiceMode.SERVER ? MsgBase.RequestMode.REQUEST : MsgBase.RequestMode.RESPONSE);
	LogMgr.debug("head_len: " + head_len);
	body.setMsg(UtilMgr.substring(msg, head_len));
	body.get(data);

	
	session.setAttribute("__MSG_DATA__", data);

	MsgBase._msg head_msg = MsgBase.getMsg(head_id);

	MsgBase._msg body_msg = MsgBase.getMsg(msg_id);

%>
<html>

<head>
<title>전문 테스트</title>
<LINK href="table.css" type="text/css" rel="STYLESHEET"></LINK>
</head>

<body topmargin="4" marginheight="4">
<table width="100%" cellpadding="2" cellspacing="0" border="0" style="margin-bottom:6px;">
	<tr>
    	<td class="title"><%= body_msg.name %> [<%= msg_id %>] - <%= s_mode %></td>
    	<td align="right"><a href="msg_parse_form.jsp?msg=<%= msg_id %>&mode=<%= s_mode %>">PARSE</a>
		| <a href="msg_sql.jsp?msg_id=<%= msg_id %>" target="msg_sql">SQL</a>
<% if( s_mode.equalsIgnoreCase("INPUT") ) { %>
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
              		<td align="center" colspan="3">#</td>
              		<td align="center">ID</td>
              		<td align="center">NAME</td>
              		<td align="center">LENGTH</td>
              		<td align="center">TYPE</td>
              		<td align="center">VALUE</td>
                </tr>
<%
	if( head != null ) {
		MsgBase._unit head_unit = head_msg.unit[mode == MsgBase.ServiceMode.SERVER ? MsgBase.RequestMode.REQUEST.ordinal() : MsgBase.RequestMode.RESPONSE.ordinal()];
		for(int i=0; i < head_unit.items; i++) {
			MsgBase._item item1 = head_unit.item[i];

			if( item1.is_group ) {

				int cnt1 = data.getInt(item1.id + ".count");

%>
				<tr bgcolor="#F2F2F2" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#F2F2F2'">
                	<td align="center" colspan="3"><%= (i+1) %></td>
                	<td style="color:#008000;"><%= item1.id %></td>
                	<td><%= item1.name %></td>
                	<td align="center">[<%= cnt1 %>]</td>
                	<td align="center">GROUP</td>
                	<td>&nbsp;</td>
                </tr>
<%

				for(int n1=0; n1 < cnt1; n1++) {

					for(int j=0; j < item1.items; j++) {
						MsgBase._item item2 = item1.item[j];

						if( item2.is_group ) {

							int cnt2 = data.getInt(item1.id + "." + item2.id + "[" + n1 + "].count");

%>
				<tr bgcolor="#E2E2F2" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#E2E2F2'">
                	<td align="center"><%= (i+1) + "-" + (n1+1) %></td>
                	<td align="center" colspan="2"><%= (j+1) %></td>
                	<td style="color:#008000;"><%= item2.id %></td>
                	<td><%= item2.name %></td>
                	<td align="center">[<%= cnt2 %>]</td>
                	<td align="center">GROUP</td>
                	<td>&nbsp;</td>
                </tr>
<%
							for(int n2=0; n2 < cnt2; n2++) {

								for(int k=0; k < item2.items; k++) {
									MsgBase._item item3 = item2.item[k];
%>
				<tr bgcolor="#D2D2E2" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#D2D2E2'">
                	<td align="center"><%= (i+1) + "-" + (n1+1) %></td>
                	<td align="center"><%= (j+1) + "-" + (n2+1) %></td>
                	<td align="center"><%= (k+1) %></td>
                	<td style="color:#008000;"><%= item3.id %></td>
                	<td><%= item3.name %></td>
                	<td align="center"><%= item3.length %></td>
                	<td align="center"><%= item3.type.equalsIgnoreCase("N") ? "NUM" : "CHAR" %></td>
                	<td><%= data.get(item1.id + "." + item2.id + "[" + n1 + "]." + item3.id + "[" + n2 + "]", "&nbsp;") %></td>
                </tr>
<%
								}
							}
						}
						else {
%>
				<tr bgcolor="#E2E2F2" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#E2E2F2'">
                	<td align="center"><%= (i+1) + "-" + (n1+1) %></td>
                	<td align="center"colspan="2"><%= (j+1) %></td>
                	<td style="color:#008000;"><%= item2.id %></td>
                	<td><%= item2.name %></td>
                	<td align="center"><%= item2.length %></td>
                	<td align="center"><%= item2.type.equalsIgnoreCase("N") ? "NUM" : "CHAR" %></td>
                	<td><%= data.get(item1.id + "." + item2.id + "[" + n1 + "]", "&nbsp;") %></td>
                </tr>
<%
						}
					}
				}
				
			}
			else {
%>
				<tr bgcolor="#F2F2F2" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#F2F2F2'">
                	<td align="center" colspan="3"><%= i+1 %></td>
                	<td style="color:#008000;"><%= item1.id %></td>
                	<td><%= item1.name %></td>
                	<td align="center"><%= item1.length %></td>
                	<td align="center"><%= item1.type.equalsIgnoreCase("N") ? "NUM" : "CHAR" %></td>
                	<td><%= data.get(item1.id,"&nbsp;") %></td>
				</tr>
<%
			}
		}
	}


	MsgBase._unit body_unit = body_msg.unit[mode == MsgBase.ServiceMode.SERVER ? MsgBase.RequestMode.REQUEST.ordinal() : MsgBase.RequestMode.RESPONSE.ordinal()];
	for(int i=0; i < body_unit.items; i++) {
		MsgBase._item item1 = body_unit.item[i];

		if( item1.is_group ) {

			int cnt1 = data.getInt(item1.id + ".count");

%>
			<tr bgcolor="#FFFFFF" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
            	<td align="center" colspan="3"><%= (i+1) %></td>
            	<td style="color:#008000;"><%= item1.id %></td>
            	<td><%= item1.name %></td>
            	<td align="center">[<%= cnt1 %>]</td>
            	<td align="center">GROUP</td>
            	<td>&nbsp;</td>
            </tr>
<%

			for(int n1=0; n1 < cnt1; n1++) {

				for(int j=0; j < item1.items; j++) {
					MsgBase._item item2 = item1.item[j];

					if( item2.is_group ) {

						int cnt2 = data.getInt(item1.id + "." + item2.id + "[" + n1 + "].count");

%>
			<tr bgcolor="#F0F0FF" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#F0F0FF'">
            	<td align="center"><%= (i+1) + "-" + (n1+1) %></td>
            	<td align="center" colspan="2"><%= (j+1) %></td>
            	<td style="color:#008000;"><%= item2.id %></td>
            	<td><%= item2.name %></td>
            	<td align="center">[<%= cnt2 %>]</td>
            	<td align="center">GROUP</td>
            	<td>&nbsp;</td>
            </tr>
<%
						for(int n2=0; n2 < cnt2; n2++) {

							for(int k=0; k < item2.items; k++) {
								MsgBase._item item3 = item2.item[k];
%>
			<tr bgcolor="#E0E0F0" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#E0E0F0'">
            	<td align="center"><%= (i+1) + "-" + (n1+1) %></td>
            	<td align="center"><%= (j+1) + "-" + (n2+1) %></td>
            	<td align="center"><%= (k+1) %></td>
            	<td style="color:#008000;"><%= item3.id %></td>
            	<td><%= item3.name %></td>
            	<td align="center"><%= item3.length %></td>
            	<td align="center"><%= item3.type.equalsIgnoreCase("N") ? "NUM" : "CHAR" %></td>
            	<td><%= data.get(item1.id + "." + item2.id + "[" + n1 + "]." + item3.id + "[" + n2 + "]", "&nbsp;") %></td>
            </tr>
<%
							}
						}
					}
					else {
%>
			<tr bgcolor="#F0F0FF" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#F0F0FF'">
            	<td align="center"><%= (i+1) + "-" + (n1+1) %></td>
            	<td align="center"colspan="2"><%= (j+1) %></td>
            	<td style="color:#008000;"><%= item2.id %></td>
            	<td><%= item2.name %></td>
            	<td align="center"><%= item2.length %></td>
            	<td align="center"><%= item2.type.equalsIgnoreCase("N") ? "NUM" : "CHAR" %></td>
            	<td><%= data.get(item1.id + "." + item2.id + "[" + n1 + "]", "&nbsp;") %></td>
            </tr>
<%
					}
				}
			}
			
		}
		else {
%>
			<tr bgcolor="#FFFFFF" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
            	<td align="center" colspan="3"><%= i+1 %></td>
            	<td style="color:#008000;"><%= item1.id %></td>
            	<td><%= item1.name %></td>
            	<td align="center"><%= item1.length %></td>
            	<td align="center"><%= item1.type.equalsIgnoreCase("N") ? "NUM" : "CHAR" %></td>
            	<td><%= data.get(item1.id,"&nbsp;") %></td>
			</tr>
<%
		}
	}

%>
			</table>
		</td>
	</tr>
</table>

</body>

</html>
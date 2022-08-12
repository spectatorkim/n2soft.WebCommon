<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*,com.n2soft.msg.*,java.util.*" %>
<%!

	public StringMap requestToMap(HttpServletRequest req) {
		StringMap map = new StringMap();

		Enumeration e = req.getParameterNames();
		while( e.hasMoreElements() ) {
			String name = (String)e.nextElement(); 
			map.put(name, req.getParameter(name));
		}

		return map;
	}

%>
<%

	StringMap req = requestToMap(request);

	// 추가 필드
	String[] add_items = request.getParameterValues("items");
	String[] add_values = request.getParameterValues("values");

	if( add_items != null ) {
		for(int i=0; i < add_items.length; i++) {
			if( add_items[i] != null && add_items[i].length() > 0 && add_values[i] != null && add_values[i].length() > 0 )
				req.put(add_items[i], add_values[i]);
		}
	}

	String detail_yn = request.getParameter("detail_yn");
	if( detail_yn == null )
		detail_yn = "";

	String msg_id = req.get("msg_id","");
	if( msg_id.length() == 0 )
		return;

	String msg_cd = request.getParameter("MSG_CD");
	if( msg_cd == null || msg_cd.length() == 0 )
		msg_cd = SqlMgr.getFieldOne("select MSG_CD from CMN002TM where MSG_ID = '" + msg_id + "'");

	if( msg_cd == null || msg_cd.length() == 0 )
		return;

	CallMgr mgr = new CallMgr();

	StringMap res = mgr.doMsg(msg_cd, req);

	LogMgr.debug(res.toString(true));

	MsgBase._msg body = MsgBase.getMsg(msg_id);

	String head_id = body.head_id;
	if( head_id == null || head_id.length() == 0 )
		head_id = msg_id.substring(0,msg_id.indexOf(".")) + ".HEAD";

	MsgBase._msg head = MsgBase.getMsg(head_id);

	if( head_id.equals("FSB.HEAD") && !res.get("PROC_RESULT","").equals("0") )
		body = MsgBase.getMsg("FSB.ERROR");

%>
<html>

<head>
<title>전문 테스트</title>
<LINK href="table.css" type="text/css" rel="STYLESHEET"></LINK>
</head>

<body topmargin="4" marginheight="4">
<table width="100%" cellpadding="2" cellspacing="0" border="0" style="margin-bottom:6px;">
	<tr>
    	<td class="title"><%= body.name %> [<%= msg_id %>] - OUTPUT</td>
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
                </tr>
<%
	if( head != null ) {
		MsgBase._unit head_unit = head.unit[MsgBase._RESPONSE];
		for(int i=0; i < head_unit.items; i++) {
			MsgBase._item item1 = head_unit.item[i];

			if( item1.is_group ) {

				if( !detail_yn.equals("Y") )
					continue;

				int cnt1 = res.getInt(item1.id + ".count");
				for(int n1=0; n1 < cnt1; n1++) {

					for(int j=0; j < item1.items; j++) {
						MsgBase._item item2 = item1.item[j];

						if( item2.is_group ) {

							int cnt2 = res.getInt(item1.id + "." + item2.id + "[" + n1 + "].count");
							for(int n2=0; n2 < cnt2; n2++) {

								for(int k=0; k < item2.items; k++) {
									MsgBase._item item3 = item2.item[k];
%>
				<tr bgcolor="#F2F2F2" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#F2F2F2'">
                	<td align="center"><%= (i+1) + "-" + (n1+1) %></td>
                	<td style="color:#008000;"><%= item1.id %></td>
                	<td><%= item1.name %></td>
                	<td align="center"><%= (j+1) + "-" + (n2+1) %></td>
                	<td style="color:#008000;"><%= item2.id %></td>
                	<td><%= item2.name %></td>
                	<td align="center"><%= (k+1) %></td>
                	<td style="color:#008000;"><%= item3.id %></td>
                	<td><%= item3.name %></td>
                	<td align="center"><%= item3.length %></td>
                	<td align="center"><%= item3.type.equalsIgnoreCase("N") ? "NUM" : "CHAR" %></td>
                	<td><%= res.get(item1.id + "." + item2.id + "[" + n1 + "]." + item3.id + "[" + n2 + "]", "&nbsp;") %></td>
                </tr>
<%
								}
							}
						}
						else {
%>
				<tr bgcolor="#F2F2F2" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#F2F2F2'">
                	<td align="center"><%= (i+1) + "-" + (n1+1) %></td>
                	<td style="color:#008000;"><%= item1.id %></td>
                	<td><%= item1.name %></td>
                	<td align="center"><%= (j+1) %></td>
                	<td style="color:#008000;"><%= item2.id %></td>
                	<td colspan="4"><%= item2.name %></td>
                	<td align="center"><%= item2.length %></td>
                	<td align="center"><%= item2.type.equalsIgnoreCase("N") ? "NUM" : "CHAR" %></td>
                	<td><%= res.get(item1.id + "." + item2.id + "[" + n1 + "]", "&nbsp;") %></td>
                </tr>
<%
						}
					}
				}
				
			}
			else {
%>
				<tr bgcolor="#F2F2F2" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#F2F2F2'">
                	<td align="center"><%= i+1 %></td>
                	<td style="color:#008000;"><%= item1.id %></td>
                	<td colspan="7"><%= item1.name %></td>
                	<td align="center"><%= item1.length %></td>
                	<td align="center"><%= item1.type.equalsIgnoreCase("N") ? "NUM" : "CHAR" %></td>
                	<td><%= res.get(item1.id,"&nbsp;") %></td>
				</tr>
<%
			}
		}
	}


	MsgBase._unit body_unit = body.unit[MsgBase._RESPONSE];
	for(int i=0; i < body_unit.items; i++) {
		MsgBase._item item1 = body_unit.item[i];

		if( item1.is_group ) {

			if( !detail_yn.equals("Y") )
				continue;

			int cnt1 = res.getInt(item1.id + ".count");
			for(int n1=0; n1 < cnt1; n1++) {

				for(int j=0; j < item1.items; j++) {
					MsgBase._item item2 = item1.item[j];

					if( item2.is_group ) {
						int cnt2 = res.getInt(item1.id + "[" + n1 + "]." + item2.id + ".count");
						for(int n2=0; n2 < cnt2; n2++) {

							for(int k=0; k < item2.items; k++) {
								MsgBase._item item3 = item2.item[k];
%>
				<tr bgcolor="#F2F2F2" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#F2F2F2'">
                	<td align="center"><%= (i+1) + "-" + (n1+1) %></td>
                	<td style="color:#008000;"><%= item1.id %></td>
                	<td><%= item1.name %></td>
                	<td align="center"><%= (j+1) + "-" + (n2+1) %></td>
                	<td style="color:#008000;"><%= item2.id %></td>
                	<td><%= item2.name %></td>
                	<td align="center"><%= (k+1) %></td>
                	<td style="color:#008000;"><%= item3.id %></td>
                	<td><%= item3.name %></td>
                	<td align="center"><%= item3.length %></td>
                	<td align="center"><%= item3.type.equalsIgnoreCase("N") ? "NUM" : "CHAR" %></td>
                	<td><%= res.get(item1.id + "." + item2.id + "[" + n1 + "]." + item3.id + "[" + n2 + "]", "&nbsp;") %></td>
                </tr>
<%
								}
							}
						}
						else {
%>
				<tr bgcolor="#F2F2F2" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#F2F2F2'">
                	<td align="center"><%= (i+1) + "-" + (n1+1) %></td>
                	<td style="color:#008000;"><%= item1.id %></td>
                	<td><%= item1.name %></td>
                	<td align="center"><%= (j+1) %></td>
                	<td style="color:#008000;"><%= item2.id %></td>
                	<td colspan="4"><%= item2.name %></td>
                	<td align="center"><%= item2.length %></td>
                	<td align="center"><%= item2.type.equalsIgnoreCase("N") ? "NUM" : "CHAR" %></td>
                	<td><%= res.get(item1.id + "." + item2.id + "[" + n1 + "]", "&nbsp;") %></td>
                </tr>
<%
						}
					}
				}
				
			}
			else {
%>
				<tr bgcolor="#F2F2F2" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='#F2F2F2'">
                	<td align="center"><%= i+1 %></td>
                	<td style="color:#008000;"><%= item1.id %></td>
                	<td colspan="7"><%= item1.name %></td>
                	<td align="center"><%= item1.length %></td>
                	<td align="center"><%= item1.type.equalsIgnoreCase("N") ? "NUM" : "CHAR" %></td>
                	<td><%= res.get(item1.id,"&nbsp;") %></td>
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
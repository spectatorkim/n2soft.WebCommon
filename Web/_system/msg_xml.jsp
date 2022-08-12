<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*,com.n2soft.msg.*" %>
<html>
<body>
<textarea style="width: 100%; height: 100%; border: 0px; font-family: ³ª´®°íµñÄÚµù; font-size: 9pt;" readonly>
<%
	String msg_id = request.getParameter("msg_id");

	if( msg_id == null || msg_id.length() == 0 ) {
		String[] msg_ids = MsgBase.getMsgIds();
	
		for(int i=0; i < msg_ids.length; i++) {
			MsgMgr msg = new MsgMgr(msg_ids[i]);
			out.println(msg.toXml());
		}
	}
	else {
		MsgMgr msg = new MsgMgr(msg_id);
		out.println(msg.toXml());
	}

%>
</textarea>
</body>
</html>
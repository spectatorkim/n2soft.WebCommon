<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*,com.n2soft.msg.*" %>
<body style="padding:20;">
<pre>
<%
try{
    String msg_id = request.getParameter("msg_id");

//          out.println( "msg_id[" + msg_id + "]" );
//          out.println( "<hr>" );

    if( msg_id == null || msg_id.length() == 0 ) {
        String[] msg_ids = MsgBase.getMsgIds();
    
        for(int i=0; i < msg_ids.length; i++) {
            MsgMgr msg = new MsgMgr(msg_ids[i]);
            out.println(msg.toSql(false));
        }
    }
    else {
        MsgMgr msg = new MsgMgr(msg_id);
        out.println(msg.toSql(false));
    }
}catch(Exception e){
        out.println( e.getMessage() );
}
%>
</pre>
</body>
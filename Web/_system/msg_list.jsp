<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*,com.n2soft.msg.*" %>
<%

    String[] msg_ids = MsgBase.getMsgIds();

    String[] msgs = SqlMgr.getFieldList("select msg_cd, msg_id, inq_mode from CMN002TM where use_yn = 'Y' order by msg_cd");

    StringMap map = new StringMap();

    //String[] modes = { "DEFAULT", "REAL", "TEST", "DEV" };
    String[] modes = { "DEFAULT", "REAL", "TEST", "DEV", "", "SVC" };
    String host_id = request.getParameter("host_id");

    if( host_id == null ){
        host_id = "";
    }

    StringList host_list = new StringList();
    StringList host_list2 = new StringList();

    for(int i=0; msg_ids != null && msg_ids.length > 0 && i < msg_ids.length; i++) {
        if( msg_ids[i].endsWith(".HEAD") )
            host_list.add(msg_ids[i].substring(0, msg_ids[i].indexOf(".")));
    }

    for(int i=0; i < msgs.length; i+=3) {
        String msg_id = msgs[i+1];

        if( map.get(msg_id) != null ) {
            int count = map.getInt(msg_id + ".count", 1);
            map.put(msg_id + ".count", count+1);
            msg_id += "[" + count + "]";
        }

        map.put(msg_id, msgs[i]);
        map.put(msg_id + ".mode", modes[UtilMgr.to_int(msgs[i+2])]);
    }

%>
<html>

<head>
<title>nTree 전문 명세서</title>
<LINK href="table.css" type="text/css" rel="STYLESHEET"></LINK>
<script language="javascript">
function Go(msg_id) {
    parent.inFrame.location.href = "msg_info.jsp?msg=" + msg_id + "&mode=INPUT";
    parent.outFrame.location.href = "msg_info.jsp?msg=" + msg_id + "&mode=OUTPUT";
}
</script>
</head>

<body topmargin="4" marginheight="4" onLoad="Go('<%= msg_ids[0] %>');">
<table width="100%" cellpadding="2" cellspacing="0" border="0" style="margin-bottom:6px;">
    <tr>
        <td class="title">전문 명세서</td>
        <td align="right">
            <a href="msg_sql.jsp" target="msg_sql">SQL</a> |
            <a href="msg_xml.jsp<%="?host_id="+host_id%>" target="msg_xml">XML</a> |
            <a href="msg_list_insert.jsp<%="?host_id="+host_id%>" target="msg_xml">insert</a>
        </td>
        <td align="right">
            <select name="host" onchange="location.href='msg_list.jsp?host_id='+this.value;">
                <option value="">* 호스트</option>
                <%  for(int i=0; i < host_list.size(); i++) {
                        String msgName = "";
                            try{
                                msgName = MsgBase.getMsgName(host_list.get(i) + ".HEAD");
                                msgName = msgName.replaceAll(" 공통부", "");
                            }catch(Exception e){
                                //out.println(e.getMessage());
                            }
                %>
                <option value="<%= host_list.get(i) %>"<%= host_id.equalsIgnoreCase(host_list.get(i)) ? " selected" : "" %>><%= host_list.get(i) %> - <%=msgName%></option>
                <%  }//end for
%>
            </select>
        </td>
    </tr>
</table>
<table width="100%" border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td bgcolor="#666666">
            <table width="100%" border="0" cellpadding="2" cellspacing="1">
                <tr bgcolor="#FFFFFF">
                    <td align="center">#</td>
                    <td align="center">MSG_ID</td>
                    <td align="center">전문명</td>
                    <td align="center">MSG_CD</td>
                    <td align="center">MODE</td>
                </tr>
<%
    int seq_no = 0;
    for(int i=0; i < msg_ids.length; i++) {
        String msg_id = msg_ids[i];
        String msg_name = MsgBase.getMsgName(msg_id);
        String msg_cd = map.get(msg_id, "&nbsp;");
        String mode = map.get(msg_id + ".mode", "&nbsp;");
       String host = msg_id.substring(0, msg_id.indexOf("."));

        if( host_id != null && host_id.length() > 0 && !host_id.equalsIgnoreCase(host) )
            continue;

        int count = map.getInt(msg_id + ".count");
        for(int j=1; j < count; j++) {
            msg_cd += "<br />\n" + map.get(msg_id + "[" + j + "]", "");
            mode += "<br />\n" + map.get(msg_id + "[" + j + "].mode", "");
        }

        String bgcolor = (i%2 == 1) ? "#FFFFFF" : "#E8EEFF";
%>
                <tr bgcolor="<%= bgcolor %>" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='<%= bgcolor %>';" onClick="Go('<%= msg_id %>');" style="cursor:hand;">
                    <td align="center"><%= ++seq_no %></td>
                    <td style="color:#000080;"><nobr><%= msg_id %></nobr></td>
                    <td><nobr><%= msg_name %></nobr></td>
                    <td align="center"><nobr><%= msg_cd %></nobr></td>
                    <td align="center"><nobr><%= mode %></nobr></td>
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
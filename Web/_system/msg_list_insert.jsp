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
<title>nTree ���� ����</title>
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
        <td class="title">���� ����</td>
        <td align="right">
            <a href="msg_sql.jsp" target="msg_sql">SQL</a> |
            <a href="msg_xml.jsp<%="?host_id="+host_id%>" target="msg_xml">XML</a> |
            <a href="msg_list_insert.jsp<%="?host_id="+host_id%>" target="msg_xml">insert</a>
        </td>
        <td align="right">
            <select name="host" onchange="location.href='msg_list_insert.jsp?host_id='+this.value;">
                <option value="">* ȣ��Ʈ</option>
                <%  for(int i=0; i < host_list.size(); i++) {
                        String msgName = "";
                            try{
                                msgName = MsgBase.getMsgName(host_list.get(i) + ".HEAD");
                                msgName = msgName.replaceAll(" �����", "");
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
<PRE>
<textarea style="width: 100%; height: 100%; border: 0px; font-family: ��������ڵ�; font-size: 9pt;" readonly>
<%
    if( "IFS".equalsIgnoreCase(host_id) ){
        out.println( "/*******^*********^*********^*********^*********^*********^");
        out.println( "* 1.�̱�����ü���(����) TO-BE �ŷ��ڵ�(10)�ڸ� �������� ����");
        out.println( "* 2.��������(Y) ���� �� ����");
        out.println( "* 3.��������(��Ʈ)���� Ȯ�� - ��, ����");
        out.println( "* 4.���� ���� - ����");
        out.println( "* 8.����ä��� INQ_MODE �ʵ� Ȯ��");
        out.println( "* 9.ALTER TABLE KITS.CMN002TM MODIFY(MSG_NAME VARCHAR2(100 BYTE)); -- ������ ���� ����");
        out.println( "--------------------------------------------------------------------------------------");
        out.println( "2017.10.23���� 356��");
        out.println( "2017.11.08���� 360�� - CMC002TM.CD_KIND='IFS''�� ����� �ȵǾ� �ִ� ������ ����� �ȵȴ�.");
        out.println( "2017.11.21���� 361��");
        out.println( "* �������̾ƿ�(nTreeMsg_IFS.xml)�� ���� ��ϵ� ����(CMN002TM.HOST_ID='IFS')�� �Ǽ��� ���ؾ� �Ѵ�.");
        out.println( "********^*********^*********^*********^*********^*********^*/");
        out.println( "");
        out.println( "");
        out.println( "");
    }

    int seq_no = 0;
    for(int i=0; i < msg_ids.length; i++) {
        String msg_id = msg_ids[i];
        String msg_name = MsgBase.getMsgName(msg_id);
        String msg_cd = map.get(msg_id, "&nbsp;");
        String mode = map.get(msg_id + ".mode", "&nbsp;");
       String host = msg_id.substring(0, msg_id.indexOf("."));

        if( host_id != null && host_id.length() > 0 && !host_id.equalsIgnoreCase(host) )
            continue;

        String msg_id_org = msg_id.substring(msg_id.indexOf(".")+1);

        seq_no++;
//        String _insert_sql_pre = "INSERT INTO CMN002TM ( MSG_CD ,MSG_NAME ,MSG_ID ,HOST_ID ,PARAM1 ,PARAM2 ,INQ_MODE ,USE_YN ,VIEW_SEQ ,DESCRIPTION ,CRT_ID ,CRT_DTM ,CHG_ID ,CHG_DTM ,FEP_INTFC_ID ,FEP_USE_YN ,TELR_YN ,CLIENT_YN )VALUES(";

//        String str_MSG_CD   = " 'X'||LPAD('" + seq_no + "', 3,'0')";
//        String str_MSG_NAME = " ,'" + msg_name + "'";
        String str_MSG_ID   = " ,'" + msg_id + "'";
//        String str_HOST_ID  = " ,'IFS'";
//        String str_PARAM1   = " ,'" + msg_id_org + "'";
//        String str_mid      = " ,'' ,'0' ,'Y',2 ,'' ,'nTree' ,SYSDATE ,'nTree' ,SYSDATE";
        String str_FEP_INTFC_ID = "FSBNG2." + msg_id_org;

        String _insert_sql_pre = "";
        _insert_sql_pre += " INSERT INTO CMN002TM( ";
        _insert_sql_pre += " MSG_CD ,MSG_NAME ,MSG_ID ,HOST_ID, INQ_MODE ,USE_YN ";
        _insert_sql_pre += " ,CRT_ID ,CRT_DTM ,CHG_ID ,CHG_DTM ,FEP_INTFC_ID,FEP_USE_YN ,TELR_YN ,CLIENT_YN ";
        _insert_sql_pre += " )SELECT "; // �����ڵ忡 ������ ��ȸ �ȵȴ�.
        _insert_sql_pre += " CD, CD_NM, CD_SNM, 'IFS' HOST_ID, '0' INQ_MODE , 'Y' USE_YN ";
        _insert_sql_pre += " ,'nTree' ,SYSDATE ,'nTree' ,SYSDATE ,'"+str_FEP_INTFC_ID+"','Y' ,'N' ,'Y' ";
        _insert_sql_pre += " FROM CMC002TM WHERE CD_SNM = '"+msg_id+"'; ";

//        String _insert_sql_post = ",'Y' ,'N' ,'Y' ); ";


        out.println(      _insert_sql_pre   );
    
    }
%>
</textarea>
</PRE>
</body>

</html>
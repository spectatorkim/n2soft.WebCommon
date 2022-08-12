<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*,java.sql.Connection" %>
<%

    String sql = "";

    String db_type = Env.get("database2.type", "oracle");
    String db_driver = Env.get("database2.driver", "");
    String db_url = Env.get("database2.url", "");
    String db_user = Env.get("database2.user", "");
    String db_pass = Env.get("database2.pass", "");

    String table = (String)session.getAttribute("table");
    
    String table_name = request.getParameter("table_name")==null?"":(String)request.getParameter("table_name");
    
    
    Connection conn = SqlMgr.getDBConnection(db_driver, db_url, db_user, db_pass);


    if( db_type.equals("oracle") ){
        sql  = "select";
        sql += " t.table_name";
        sql += ",nvl(tc.comments,' ')";
        sql += " from user_tables t";
        sql += " left join user_tab_comments tc on t.table_name = tc.table_name";
        if(!"".equals(table_name)){
            sql += " where t.table_name like '%"+ table_name +"%' ";
        }
        sql += " order by t.table_name";
    }else if( db_type.equals("mssql") ){
        sql = "select"
            + " t.name"
            + ",isnull(cast(tc.value as varchar),' ')"
            + " from sys.tables t"
            + " left join fn_listextendedproperty('MS_Description','user','dbo','table',default,default,default) tc on t.name = tc.objname collate Korean_Wansung_CI_AS"
            + " order by t.name";
    }


    String[] tables = SqlMgr.getFieldList(conn, sql);
    
    if( table == null || table.length() == 0 )
        table = tables[0];
    else
        session.removeAttribute("table");

    SqlMgr.close(conn);

%>
<html>

<head>
<title>nTree 테이블 명세서</title>
<LINK href="table.css" type="text/css" rel="STYLESHEET"></LINK>
<script language="javascript">

function Go(table) {
    parent.mainFrame.location.href = "table_info2.jsp?table=" + table;
}

function fnPop(table) {
    window.open("table_info2.jsp?table=" + table, table, "width=700,height=800,resizable=yes,scrollbars=yes");
}

function fnSearch(schKey) {
    if( schKey != null && schKey != "undefined" ){
        document.frmSch.table_name.value = schKey;
    }
    document.frmSch.submit();
}

function editComment(obj, name, comment) {

    if( comment == ' ' )
        comment = '';

    var frm = document.frm;
    frm.name.value = name;
    frm.comment.value = comment;

    var rect = obj.getBoundingClientRect();

    var cellLeft = document.body.scrollLeft + rect.left;
    var cellTop = document.body.scrollTop + rect.top;
    var cellWidth = obj.offsetWidth;
    var cellHeight = obj.offsetHeight;

    with( document.all.shadow ) {
        style.left = cellLeft + 3;
        style.top = cellTop + 4;
        style.width = cellWidth;
        style.height = cellHeight;
        style.visibility = "visible";
    }

    with( frm.comment ) {
        style.left = cellLeft;
        style.top = cellTop;
        style.width = cellWidth;
        style.height = cellHeight;
        style.visibility = "visible";
        focus();
    }
}


function cancelComment() {
    document.frm.comment.style.visibility = "hidden";
    document.all.shadow.style.visibility = "hidden";
}

</script>
</head>

<body topmargin="4" marginheight="4" onLoad="if( parent.mainFrame.location.href == 'about:blank') Go('<%= table %>');">
<span id="shadow" style="visibility:hidden; position:absolute; left:0; top:0; width:500; height:70; z-index:999; filter:Alpha(Opacity=40); opacity:0.4; background-color:#404040;"></span>
<span id="edit" style="position:absolute; left:0; top:0; width:0; height:0;">
<form name="frm" method="post" target="hiddenFrame" action="comment_edit.jsp">
<input type="hidden" name="name">
<input type="text" size="45" name="comment" onblur="cancelComment()" style="visibility:hidden; position:absolute; z-index:1000; font-family:돋움체; font-size:11px; padding-left:2px; background-color:brown; color:white; border:0px;"></input>
<input type="submit" value="저장" style="visibility:hidden;" style="width:0px; height:0px; border:0px;"></input>
</form>
</span>
<table width="100%" cellpadding="2" cellspacing="0" border="0" style="margin-bottom:6px;">
    <tr>
        <td class="title" width="200px">테이블 명세서</td>
        <form name="frmSch" method="post" action="table_list2.jsp">
            <td class="title" align="right" style="white-space:nowrap;">
                <input type="button" value="ALL" onclick="fnSearch('')"><input type="button" value="FAC" onclick="fnSearch('FAC')"><input type="button" value="FND" onclick="fnSearch('FND')"><input type="button" value="LIM" onclick="fnSearch('LIM')"><input type="button" value="LAM" onclick="fnSearch('LAM')"><input type="button" value="LOM" onclick="fnSearch('LOM')">
                <input type="text" name="table_name" value="<%=table_name%>" style="width:60px;"><input type="button" value="검색" onclick="fnSearch()">
            </td>
        </form>
    </tr>
</table>
<table width="100%" border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td bgcolor="#666666">
            <table width="100%" border="0" cellpadding="2" cellspacing="1">
                <tr bgcolor="#FFFFFF">
                      <td align="center">#</td>
                      <td align="center" colspan="2">테이블</td>
                      <td align="center">테이블명</td>
                </tr>
<%
    for(int i=0; i < tables.length; i+=2) {
        String bgcolor = (i%4 == 2) ? "#FFFFFF" : "#E8EEFF";
        tables[i+1] = tables[i+1].replaceAll("\n", "").replaceAll("\r", "").replaceAll("'", "`");
%>
                <tr bgcolor="<%= bgcolor %>" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='<%= bgcolor %>'" style="cursor:hand;">
                    <td align="center"><%= (i/2)+1 %></td>
                    <td style="color:#000080; white-space:nowrap;" onClick="Go('<%= tables[i] %>');"><%= tables[i] %></td>
                    <td style="cursor:hand;" title="새 창에서 열기" width="16" align="center" onclick="fnPop('<%= tables[i] %>')">+</td>
                    <td style="cursor:hand; white-space:nowrap;" onClick="Go('<%= tables[i] %>');" onDblClick="editComment(this,'<%= tables[i] %>','<%= tables[i+1] %>');" title="더블클릭☞ 테이블명 수정"><%= tables[i+1] %></td>
                </tr>
<%
    }
%>
            </table>
        </td>
    </tr>
</table>
<iframe name="hiddenFrame" src="about:blank" width="0" height="0" border="0"></iframe>
</body>

</html>
<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*,java.sql.Connection" %>
<%

	String table = request.getParameter("table");

	if( table == null || table.length() == 0 )
		return;


	String sql = "";
    String db_type = Env.get("database2.type", "oracle");
    String db_driver = Env.get("database2.driver", "");
    String db_url = Env.get("database2.url", "");
    String db_user = Env.get("database2.user", "");
    String db_pass = Env.get("database2.pass", "");
	
    Connection conn = SqlMgr.getDBConnection(db_driver, db_url, db_user, db_pass);

    
    String table_name = "";
	
	if( db_type.equals("oracle") )
		table_name = SqlMgr.getFieldOne(conn, "select comments from user_tab_comments where table_name = '" + table + "'");
	else if( db_type.equals("mssql") )
		table_name = SqlMgr.getFieldOne(conn, "select CAST(value as VARCHAR)from fn_listextendedproperty('MS_Description','user','dbo','table','" + table + "',default,default)");

	if( table_name == null || table_name.equals("null") )
		table_name = "";

	if( db_type.equals("oracle") )
		sql = "select"
			+ " c.column_id"
			+ ",c.column_name"
			+ ",nvl(cc.comments,' ')"
			+ ",c.data_type ||"
			+ " (case when c.data_type = 'NUMBER' and c.data_precision > 0  and c.data_scale > 0 then '(' || c.data_precision || ',' || c.data_scale || ')'"
			+ " when c.data_type = 'NUMBER' and c.data_precision > 0 and c.data_scale = 0 then '(' || c.data_precision || ')'"
			+ " when c.data_type in ('CHAR','VARCHAR','VARCHAR2') then '(' || c.data_length || ')'"
			+ " else '' end)"
			+ ",nullable"
			+ ",data_default"
			+ " from user_tab_columns c"
			+ " left join user_col_comments cc on c.table_name = cc.table_name and c.column_name = cc.column_name"
			+ " where c.table_name = '" + table + "'"
			+ " order by c.column_id";
	else if( db_type.equals("mssql") )
		sql = "select"
			+ " c.ORDINAL_POSITION"
			+ ",c.COLUMN_NAME"
			+ ",isnull(cast(cc.value as varchar),' ')"
			+ ",c.DATA_TYPE +"
			+ " (case when c.DATA_TYPE = 'numeric' and c.NUMERIC_PRECISION > 0  and c.NUMERIC_SCALE > 0 then '(' + CAST(c.NUMERIC_PRECISION as VARCHAR) + ',' + CAST(c.NUMERIC_SCALE as VARCHAR) + ')'"
			+ "  when c.DATA_TYPE = 'numeric' and c.NUMERIC_PRECISION > 0 and c.NUMERIC_SCALE = 0 then '(' + CAST(c.NUMERIC_PRECISION as VARCHAR) + ')'"
			+ "  when c.DATA_TYPE in ('char','varchar') then '(' + CAST(c.CHARACTER_MAXIMUM_LENGTH as VARCHAR) + ')'"
			+ "  else '' end)"
			+ ",IS_NULLABLE"
			+ ",COLUMN_DEFAULT"
			+ " from INFORMATION_SCHEMA.COLUMNS c"
			+ " left join (select objname, value from ::fn_listextendedproperty('MS_Description','user','dbo','table','" + table + "','column',default)) cc on c.COLUMN_NAME = cc.objname collate Korean_Wansung_CI_AS"
			+ " where c.TABLE_NAME = '" + table + "'"
			+ " order by c.ORDINAL_POSITION";

	String[] columns = SqlMgr.getFieldList(conn, sql);

    SqlMgr.close(conn);

%>
<html>

<head>
<title>테이블 명세서</title>
<LINK href="table.css" type="text/css" rel="STYLESHEET"></LINK>
<script language="javascript">

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

<body topmargin="4" marginheight="4">
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
    	<td class="title"><%= table %> (<%= table_name %>)</td>
	</tr>
</table>
<table width="100%" border="0" cellpadding="0" cellspacing="0">
	<tr>
    	<td bgcolor="#808080">
        	<table width="100%" border="0" cellpadding="2" cellspacing="1">
            	<tr bgcolor="#FFFFFF">
              		<td align="center">#</td>
              		<td align="center">컬럼</td>
              		<td align="center">컬럼명</td>
              		<td align="center">데이타형</td>
              		<td align="center">NULL</td>
              		<td align="center">DEFAULT</td>
                </tr>
<%
	for(int i=0; i < columns.length; i+=6) {
		String bgcolor = (i%12 == 6) ? "#FFFFFF" : "#E8EEFF";
%>
				<tr bgcolor="<%= bgcolor %>" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='<%= bgcolor %>'">
                	<td align="center"><%= columns[i] %> </td>
                	<td style="color:#008000;"><%= columns[i+1] %> </td>
                	<td style="cursor:hand;" onDblClick="editComment(this,'<%= table %>.<%= columns[i+1] %>','<%= columns[i+2] %>');" title="더블클릭☞ 컬럼명 수정"><%= columns[i+2] %> </td>
                	<td><%= columns[i+3] %> </td>
                	<td align="center"><%= columns[i+4] %> </td>
                	<td align="center"><%= columns[i+5] == null ? " " : columns[i+5] %></td>
				</tr>
<%
	}
%>
			</table>
		</td>
	</tr>
</table>
<iframe name="hiddenFrame" src="about:blank" width="0" height="0" frameborder="0"></iframe>
</body>

</html>
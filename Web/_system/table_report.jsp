<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr" import="com.n2soft.common.*" %>
<%

    String sql  = "select";
    sql += " t.TABLE_NAME, t.TABLESPACE_NAME, TO_CHAR(t.LAST_ANALYZED, 'YYYY-MM-DD HH24:MI:SS') as TABLE_DATE";
    sql += ",nvl(tc.comments,' ') as TABLE_COMMENTS";
    sql += " from user_tables t";
    sql += " left join user_tab_comments tc on t.table_name = tc.table_name";
    sql += " order by t.table_name";

    StringMap tables = SqlMgr.getGroupMap(sql, true);

	String sql2 = "select"
			+ " c.column_id"
			+ ",c.column_name"
			+ ",nvl(cc.comments,' ') as column_comments"
			+ ",c.data_type ||"
			+ " (case when c.data_type = 'NUMBER' and c.data_precision > 0  and c.data_scale > 0 then '(' || c.data_precision || ',' || c.data_scale || ')'"
			+ " when c.data_type = 'NUMBER' and c.data_precision > 0 and c.data_scale = 0 then '(' || c.data_precision || ')'"
			+ " when c.data_type in ('CHAR','VARCHAR','VARCHAR2') then '(' || c.data_length || ')'"
			+ " else '' end) as data_type"
			+ ",nullable"
			+ ",data_default"
			+ " from user_tab_columns c"
			+ " left join user_col_comments cc on c.table_name = cc.table_name and c.column_name = cc.column_name"
			+ " where c.table_name = ? "
			+ " order by c.column_id";
    
%>
<html>

<head>
<title>nTree 테이블 명세서</title>
<LINK href="table.css" type="text/css" rel="STYLESHEET"></LINK>
</head>

<body topmargin="8" marginheight="8">
<table width="950" border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td bgcolor="#666666">
            <table width="100%" border="0" cellpadding="2" cellspacing="1">
<%
	int table_cnt = tables.getInt("count");
    for(int i=0; i < table_cnt; i++) {
%>
                <tr bgcolor="#DDDDDD">
                  <th>테이블</td>
                  <td><%= tables.get("TABLE_NAME",i,"") %></td>
                  <th>테이블명</td>
                  <td colspan="2"><%= tables.get("TABLE_COMMENTS",i,"") %></td>
                  <th>TABLESPACE</td>
                  <td><%= tables.get("TABLESPACE_NAME",i,"") %></td>
                </tr>
            	<tr bgcolor="#FFFFFF">
              		<th width="5%">#</td>
              		<th colspan="2" widht="12%">컬럼</td>
              		<th>컬럼명</td>
              		<th width="10%">데이타형</td>
              		<th width="5%">NULL</td>
              		<th width="15%">DEFAULT</td>
                </tr>
<%
		StringMap cols = SqlMgr.getGroupMap(sql2, true, tables.get("TABLE_NAME",i,""));
		int col_cnt = cols.getInt("count"); 
		for(int j=0; j < col_cnt; j++) {
%>
				<tr bgcolor="#FFFFFF">
                	<td align="center"><%= cols.get("COLUMN_ID",j,"") %></td>
                	<td colspan="2" style="color:#008000;"><%= cols.get("COLUMN_NAME",j,"") %></td>
                	<td><%= cols.get("COLUMN_COMMENTS",j,"").replaceAll("<br>"," ").replaceAll("<br />"," ") %> </td>
                	<td><%= cols.get("DATA_TYPE",j,"") %> </td>
                	<td align="center"><%= cols.get("NULLABLE",j,"") %> </td>
                	<td><%= cols.get("DATA_DEFAULT",j,"") %></td>
				</tr>
<%
		}
%>
                <tr bgcolor="#FFFFFF">
                	<td colspan="7" height="40">&nbsp;</td>
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
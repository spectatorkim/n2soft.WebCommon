<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*" %>
<%

	String sql = "";

	sql = "select"
		+ " c.table_name"
		+ ",nvl(tc.comments,' ')"
		+ ",count(*)"
		+ " from user_tab_columns c"
		+ " left join user_tab_comments tc on c.table_name= tc.table_name"
		+ " where substr(c.table_name,1,3) != 'BIN'"
		+ " group by tc.comments, c.table_name"
		+ " order by c.table_name";

	String[] tables = SqlMgr.getFieldList(sql);

	sql = "select"
		+ " c.table_name"
		+ ",c.column_id"
		+ ",nvl(cc.comments,' ')"
		+ ",c.column_name"
		+ ",c.data_type ||"
		+ " (case when c.data_type = 'NUMBER' and c.data_precision > 0  and c.data_scale > 0 then '(' || c.data_precision || ',' || c.data_scale || ')'"
		+ " when c.data_type = 'NUMBER' and c.data_precision > 0 and c.data_scale = 0 then '(' || c.data_precision || ')'"
		+ " when c.data_type in ('CHAR','VARCHAR','VARCHAR2') then '(' || c.data_length || ')'"
		+ " else '' end)"
		+ " from user_tab_columns c"
		+ " left join user_col_comments cc on c.table_name = cc.table_name and c.column_name = cc.column_name"
		+ " where substr(c.table_name,1,3) != 'BIN'"
		+ " order by c.table_name, c.column_id";

	String[] columns = SqlMgr.getFieldList(sql);

%>
<html>

<head>
<title>테이블 명세서</title>
<LINK href="table.css" type="text/css" rel="STYLESHEET"></LINK>
</head>

<body topmargin="10" marginheight="10">
<table width="100%" cellpadding="2" cellspacing="0" border="0" style="margin-bottom:10px;">
	<tr>
    	<td><font size="+1"><b>테이블 명세서</b></font></td>
        <td align="right"><a href="table.html" target="_top">목록보기</a></td>
	</tr>
</table>
<table width="100%" border="0" cellpadding="0" cellspacing="0">
	<tr>
    	<td bgcolor="#666666">
        	<table width="100%" border="0" cellpadding="2" cellspacing="1">
            	<tr bgcolor="#FFFFFF">
              		<td align="center">#</td>
              		<td align="center">테이블명</td>
              		<td align="center">테이블</td>
              		<td align="center">#</td>
              		<td align="center">컬럼명</td>
              		<td align="center">컬럼</td>
              		<td align="center">데이타형</td>
                </tr>
<%
	for(int i=0, j=0; j < columns.length; j+=5) {
%>
				<tr bgcolor="#F6F6F6">
<%
		if( j == 0 || !columns[j].equals(tables[i]) ) {
			if( j > 0 )
				i+=3;
%>
                	<td colspan="7" height="1" bgcolor="#FFFFFF"></td>
				</tr>
				<tr bgcolor="#F2F2F2">
					<td align="center" rowspan="<%= tables[i+2] %>"><%= (i/3)+1 %></td>
                	<td rowspan="<%= tables[i+2] %>"><%= tables[i] %></td>
                	<td rowspan="<%= tables[i+2] %>"><%= tables[i+1] %></td>
<%
		}
%>
                	<td align="center"><%= columns[j+1] %></td>
                	<td><%= columns[j+2] %></td>
                	<td><%= columns[j+3] %></td>
                	<td><%= columns[j+4] %></td>
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
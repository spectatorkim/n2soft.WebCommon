<%@ page language="java" contentType="text/json; charset=utf-8" pageEncoding="utf-8" import="com.n2soft.common.*" %><%

	String sql = request.getParameter("sql");
	String sql_id = request.getParameter("sql_id");

	if( sql == null && sql_id == null )
		return;
	
	System.out.println(sql_id);

	if( sql_id.equals("table_list") ) {
        sql  = "select";
        sql += " t.table_name as table_id";
        sql += ",nvl(tc.comments,' ') as table_name";
        sql += " from user_tables t";
        sql += " left join user_tab_comments tc on t.table_name = tc.table_name";
        sql += " order by t.table_name";
	}
	else if( sql_id.equals("table_info") ) {
		String table_id = request.getParameter("table_id");
		sql = "select"
				+ " c.column_id as column_idx"
				+ ",c.column_name as column_id"
				+ ",nvl(cc.comments,' ') as column_name"
				+ ",c.data_type ||"
				+ " (case when c.data_type = 'NUMBER' and c.data_precision > 0  and c.data_scale > 0 then '(' || c.data_precision || ',' || c.data_scale || ')'"
				+ " when c.data_type = 'NUMBER' and c.data_precision > 0 and c.data_scale = 0 then '(' || c.data_precision || ')'"
				+ " when c.data_type in ('CHAR','VARCHAR','VARCHAR2') then '(' || c.data_length || ')'"
				+ " else '' end) as data_type"
				+ ",nullable"
				+ ",data_default as default_value"
				+ " from user_tab_columns c"
				+ " left join user_col_comments cc on c.table_name = cc.table_name and c.column_name = cc.column_name"
				+ " where c.table_name = '" + table_id + "'"
				+ " order by c.column_id";
	}

	if( sql == null || sql.length() == 0 )
		return;

	System.out.println(sql);

	StringMap data = SqlMgr.getGroupMap(sql);
	String[] columns = SqlMgr.getLastMetaData();

	int cnt = data.getInt("count");
	if( cnt == 0 )
		return;

	out.println("[");
	for(int i=0; i < cnt; i++) {
		if( i > 0 )
			out.println(",");
		out.println("\t{");
		out.print("\t\t\"idx\": " + (i+1));
		for(int c=0; c < columns.length; c++)
			out.print(",\n\t\t\"" + columns[c] + "\": \"" + data.get(columns[c],i,"").replaceAll("\n","") + "\"");

		out.print("\n\t}");
	}
	out.println("\n]");

%>
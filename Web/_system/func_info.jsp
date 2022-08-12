<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*" %>
<%

	String func = request.getParameter("func");

	if( func == null || func.length() == 0 )
		return;


	String sql = "";
	String db_type = Env.get("database.type", "oracle");
	
	if( db_type.equals("oracle") )
		sql = "select"
			+ " position"
			+ ",argument_name"
			+ ",data_type ||"
			+ " (case when data_type = 'NUMBER' and data_precision > 0  and data_scale > 0 then '(' || data_precision || ',' || data_scale || ')'"
			+ " when data_type = 'NUMBER' and data_precision > 0 and data_scale = 0 then '(' || data_precision || ')'"
			+ " when data_type in ('CHAR','VARCHAR','VARCHAR2') and data_length > 0 then '(' || data_length || ')'"
			+ " else '' end)"
			+ ",in_out"
			+ ",default_value"
			+ " from user_arguments"
			+ " where object_name = '" + func + "'"
			+ " order by sequence";

	String[] params = SqlMgr.getFieldList(sql);
	

	if( db_type.equals("oracle") )
		sql = "select"
			+ " text"
			+ " from user_source"
			+ " where type='FUNCTION'"
			+ " and name = '" + func + "'"
			+ " order by line";

	String[] lines = SqlMgr.getFieldList(sql);

%>
<html>

<head>
<title>함수 명세서</title>
<LINK href="table.css" type="text/css" rel="STYLESHEET"></LINK>
<script language="javascript">
function goSave() {
	
}
</script>
</head>

<body topmargin="4" marginheight="4">
<table width="100%" cellpadding="2" cellspacing="0" border="0" style="margin-top:10px; margin-bottom:6px;">
	<tr>
    	<td class="title"><%= func %></td>
	</tr>
</table>

<table width="100%" border="0" cellpadding="0" cellspacing="0">
	<tr>
    	<td bgcolor="#808080">
        	<table width="100%" border="0" cellpadding="2" cellspacing="1">
            	<tr bgcolor="#FFFFFF">
              		<td align="center">#</td>
              		<td align="center">매개변수</td>
              		<td align="center">데이타형</td>
              		<td align="center">입출력</td>
              		<td align="center">기본값</td>
                </tr>
<%
	for(int i=0; i < params.length; i+=5) {
		String bgcolor = (i%10 == 0) ? "#E8EEFF" : "#FFFFFF";
%>
				<tr bgcolor="<%= bgcolor %>" onMouseOver="this.style.backgroundColor='#FFE8C0';" onMouseOut="this.style.backgroundColor='<%= bgcolor %>';">
                	<td align="center"><%= params[i] %></td>
                	<td style="color:#008000;"><%= params[i].equals("0") ? "&lt;Return Type&gt;" : params[i+1] %></td>
                	<td><%= params[i+2] %></td>
                	<td><%= params[i+3] %></td>
                	<td align="center"><%= params[i+4] == null ? " " : params[i+4] %></td>
				</tr>
<%
	}
%>
			</table>
		</td>
	</tr>
</table>

<pre style="width:100%; margin-top:15px; overflow:auto; font-family:돋움체; font-size:9pt; line-height:1.4em; border:1px solid #666666;">CREATE OR REPLACE <%
	for(int i=0; i < lines.length; i++)
		out.print(lines[i]);
%></pre>

<iframe name="hiddenFrame" src="about:blank" width="0" height="0" frameborder="0"></iframe>

</body>

</html>
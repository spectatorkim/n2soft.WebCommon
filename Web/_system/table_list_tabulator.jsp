<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="com.n2soft.common.*" %>
<%

    String sql = "";

    String db_type = Env.get("database.type", "oracle");

    String table = (String)session.getAttribute("table");

    String table_name = request.getParameter("table_name")==null?"":(String)request.getParameter("table_name");
    

%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>nTree 테이블 명세서</title>
<link href="table.css" rel="stylesheet">
<link href="/tabulator/css/tabulator.css" rel="stylesheet">
<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
<script type="text/javascript" src="/tabulator/js/tabulator.min.js"></script>
</head>

<body class="jui" topmargin="4" marginheight="4">
<table width="100%" height="30" cellpadding="2" cellspacing="0" border="0" style="margin-bottom:6px;">
    <tr>
        <td class="title" width="200px">테이블 명세서</td>
    </tr>
</table>

<div id="table1"></div>

<script type="text/javascript">

function Go(table_id) {
    parent.mainFrame.location.href = "table_info.jsp?table_id=" + table_id;
}

var table1;
function setTable(table_data) {
	table1 = new Tabulator("#table1", {
	    data: table_data,
	    layout: "fitColumns",
	    columns:[
	        { title:"#", field:"idx", width:"40", sorter:"number", align:"center" },
	        { title:"테이블", field:"table_id", width:"30%", sorter:"string" },
	        { title:"테이블명", field:"table_name", sorter:"string", editor:true }
		],
		cellClick: function(e, cell) {
		    console.log(e);
		    console.log(cell);
		    if( cell.getField() == "table_id" )
		    	Go(cell.getData().table_id);
		},
		rowClick: function(e, row) {
		    console.log(e);
		    console.log(row);
//		    if( cell.getField() == "table_id" )
//		    	Go(cell.getData().table_id);
		}
	});
}

$(document).ready(function() {
	$.ajax({
	    type: 'GET',
		dataType: 'JSON',
		url : '/_system/json_query.jsp?sql_id=table_list',
		success : function(json_data) {
		    setTable(json_data);
		},
		error : function(status, e) {
			alert("데이터 요청에 실패하였습니다.\r\n status : " + status);
		}
	});
});

</script>

<iframe name="hiddenFrame" src="about:blank" width="0" height="0" frameborder="0"></iframe>

<form name="frm" method="get" target="hiddenFrame" action="comment_edit.jsp">
<input type="hidden" name="name">
<input type="hidden" name="comment"/>
</form>

</body>

</html>
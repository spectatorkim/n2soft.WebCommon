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
<link rel="stylesheet" href="/jui/dist/jui-ui.classic.css" />
<link rel="stylesheet" href="/jui/dist/jui-grid.classic.css" />
<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
<script src="/jui/dist/jui-core.min.js"></script>
<script src="/jui/dist/jui-ui.min.js"></script>
<script src="/jui/dist/jui-grid.min.js"></script>
<script src="/jui/dist/jui-chart.min.js"></script>
<style type="text/css">
.lnk { cursor: pointer; color:green !important; }
</style>
</head>

<body class="jui" topmargin="4" marginheight="4">
<table width="100%" height="30" cellpadding="2" cellspacing="0" border="0" style="margin-bottom:6px;">
    <tr>
        <td class="title" width="200px">테이블 명세서</td>
    </tr>
</table>
<table id="table_1" class="table simple">
    <thead>
    <tr>
        <th width="30" style="text-align:center;">#</th>
        <th width="25%" style="text-align:center;">테이블</th>
        <th style="text-align:center;">테이블명</th>
    </tr>
    </thead>
    <tbody></tbody>
</table>

<script data-jui="#table_1" data-tpl="row" type="text/template">
    <tr>
        <td style="text-align: center;"><!= row.seq !></td>
        <td class="lnk" onclick="Go('<!= table_id !>');"><!= table_id !></td>
        <td><!= table_name !></td>
    </tr>
</script>

<script type="text/javascript">

function Go(table_id) {
    parent.mainFrame.location.href = "table_info.jsp?table_id=" + table_id;
}

var table_1;
var oldValue;

jui.ready(["grid.table"], function(table) {
    table_1 = table("#table_1", {
	    fields: [ "idx", "table_id", "table_name" ],
	    resize: true,
	    sort: [ "table_id", "table_name" ],
        editRow: [ "table_name" ],
        editEvent: true,
	    event: {
	        sort: function(column, e) {
	            var className = {
	    	        "desc": "icon-arrow1",
	    	        "asc": "icon-arrow3"
	            }[column.order];
	            $(column.element).children("i").remove();
	            $(column.element).append("<i class='" + className + "'></i>")
	        },
            dblclick: function(row, e) {
	            if( e.target.cellIndex != 2 )
	                return false;
            },
	        editstart: function(row, e) {
	            if( e.target.cellIndex != 2 )
	                return false;
	            oldValue = row.data["table_name"];
	        },
	        editend: function(row, e) {
	            var newValue = row.data["table_name"];
	            if( newValue != oldValue ) {
	            	var frm = document.frm;
	            	frm.name.value = row.data["table_id"];
	            	frm.comment.value = newValue;
	            	frm.submit();
	            }
	        }
	    }
	});
});

$(document).ready(function() {

	$.ajax({
	    type: 'GET',
		dataType: 'JSON',
		url : '/_system/json_query.jsp?sql_id=table_list',
		success : function(json_data) {
			table_1.update(json_data);
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
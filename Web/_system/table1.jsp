<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="com.n2soft.common.*" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>nTree 테이블 명세서</title>
<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
<link rel="stylesheet" type="text/css" href="/webponent/grid2.0/css/webponent.grid.css">
<link rel="stylesheet" type="text/css" href="/webponent/grid2.0/css/webponent.grid.default.css">
</head>

<body topmargin="4" marginheight="4">
<table width="100%" cellpadding="5" cellspacing="0" border="0">
    <tr>
        <td colspan="2" class="title">테이블 명세서</td>
    </tr>
    <tr>
    	<td width="35%" valign="top">
            <table id="grid-table-1">
            </table>

			<script id="grid-template-1" type="text/template">
				<table width="100%">
					<thead>
						<tr>
							<th width="60" name="idx">#</th>
							<th width="25%" name="table_id">테이블</th>
							<th name="table_name">테이블명</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td name="idx" bind="idx" style="text-align:center;">{{idx}}</td>
							<td name="table_id" bind="table_id" style="cursor:pointer; color:#0000C0; white-space:nowrap;" onClick="Go('{{table_id}}');">{{table_id}}</td>
							<td name="table_name" bind="table_name" style="cursor:pointer; white-space:nowrap;" onClick="Go('{{table_id}}');">{{table_name}}</td>
						</tr>
					</tbody>
				</table>
			</script>
		</td>
		<td width="65%" valign="top">
            <table id="grid-table-2">
			</table>

			<script id="grid-template-2" type="text/template">
				<table width="100%">
					<thead>
						<tr>
							<th width="60" name="column_idx">#</th>
							<th name="column_id">ID</th>
							<th name="column_name">NAME</th>
							<th name="data_type" width="120">TYPE</th>
							<th name="nullable" width="60">NULL</th>
							<th name="default_value">DEFAULT</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td name="column_idx" bind="column_idx" style="text-align:center;">{{column_idx}}</td>
							<td name="column_id" bind="column_id" style="color:#0000C0;">{{column_id}}</td>
							<td name="column_name" bind="column_name">{{column_name}}</td>
							<td name="data_type" bind="data_type" style="text-align:center;">{{data_type}}</td>
							<td name="nullable" bind="nullable" style="text-align:center;">{{nullable}}</td>
							<td name="default_value" bind="default_value">{{default_value}}</td>
						</tr>
					</tbody>
				</table>
			</script>
		</td>
	</tr>
</table>

<script src="/webponent/grid2.0/external/jquery-1.11.1.min.js"></script>
<script src="/webponent/grid2.0/external/jquery-ui-1.10.3.custom.min.js"></script>
<script src="/webponent/grid2.0/external/jquery.mousewheel.min.js"></script>
<script src="/webponent/grid2.0/external/underscore-min.js"></script>
<script src="/webponent/grid2.0/webponent.grid.js"></script>
<script src="/webponent/grid2.0/webponent.grid.UIplugin.js"></script>

<script>

var table1 = $('#grid-table-1');
var template1 = $('#grid-template-1');
var grid1 = webponent.grid.init(table1, template1);

$.ajax({
    type: 'GET',
	dataType: 'JSON',
	url : '/_system/json_query.jsp?sql_id=table_list',
	success : function (resp) {
		grid1.appendRow(resp);
//		grid1.releaseScroll('vertical');
		onResize();
	}
});


var table2 = $('#grid-table-2');
var template2 = $('#grid-template-2');
var grid2 = webponent.grid.init(table2, template2);

function Go(table_id) {

	$.ajax({
	    type: 'GET',
		dataType: 'JSON',
		url : '/_system/json_query.jsp?sql_id=table_info&table_id=' + table_id,
		success : function (resp) {
			grid2.removeRow();
			grid2.appendRow(resp);
//			grid2.releaseScroll('vertical');
		}
	});
}

var onResize = function() {
	var width = window.innerWidth;
	var height = window.innerHeight;
	grid1.setGridWidth((width-35)*0.35);
	grid1.setGridHeight(height-55);
	grid2.setGridWidth((width-35)*0.65);
	grid2.setGridHeight(height-55);
};

window.onresize = onResize;


</script>

</body>

</html>
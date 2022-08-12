<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="com.n2soft.common.*" %>
<%

	String table_id = request.getParameter("table_id");

	if( table_id == null || table_id.length() == 0 )
		return;


	String db_type = Env.get("database.type", "oracle");
	
	String table_name = "";
	
	if( db_type.equals("oracle") )
		table_name = SqlMgr.getFieldOne("select comments from user_tab_comments where table_name = '" + table_id + "'");
	else if( db_type.equals("mssql") )
		table_name = SqlMgr.getFieldOne("select CAST(value as VARCHAR)from fn_listextendedproperty('MS_Description','user','dbo','table','" + table_id + "',default,default)");

	if( table_name == null || table_name.equals("null") )
		table_name = "";

%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>테이블 명세서</title>
<LINK href="table.css" type="text/css" rel="STYLESHEET"></LINK>
<link href="/AUIGrid/AUIGrid_blue_style.css" rel="stylesheet">
<style type="text/css">
.cell_align_left { text-align: left; }
.cell_align_right { text-align: right; }
.cell_style_id { text-align: left; color: green; cursor: pointer; }
</style>
<script src="/webponent/grid2.0/external/jquery-1.11.1.min.js"></script>
<script src="/webponent/grid2.0/external/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="/AUIGrid/AUIGridLicense.js"></script>
<script type="text/javascript" src="/AUIGrid/AUIGrid.js"></script>
</head>

<body topmargin="4" marginheight="4">
<table width="100%" height="30" cellpadding="2" cellspacing="0" border="0" style="margin-bottom:6px;">
	<tr>
    	<td class="title"><%= table_id %> (<%= table_name %>)</td>
	</tr>
</table>
<div id="wrap" style="width: 100%">
        <div id="grid_wrap" style="width:100%; height:800px;"></div>
</div>

<script type="text/javascript">

// AUIGrid 생성 후 반환 ID
var myGridID;

// document ready (jQuery 의 $(document).ready(function() {}); 과 같은 역할을 합니다.
$(document).ready(function() {  
	
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(columnLayout);
	
	// 데이터 요청, 요청 성공 시 AUIGrid 에 데이터 삽입합니다.
	requestJsonData();

});

// AUIGrid 칼럼 설정
// 데이터 형태는 다음과 같은 형태임,
//[{"id":"#Cust0","date":"2014-09-03","name":"Han","country":"USA","product":"Apple","color":"Red","price":746400}, { .....} ];
var columnLayout = [{
	dataField : "column_idx",
	dataType : "numeric",
	headerText : "#",
	width : "5%",
	minWidth : 30,
	editable : false
}, {
	dataField : "column_id",
	headerText : "컬럼",
	width : "15%",
	minWidth : 50,
	style : "cell_style_id",
	editable : false
}, {
	dataField : "column_name",
	headerText : "컬럼명",
	width : "*",
	minWidth : 50,
	style : "cell_align_left"
}, {
	dataField : "data_type",
	headerText : "데이터형",
	width : "15%",
	minWidth : 50,
	style : "cell_align_left",
	editable : false
}, {
	dataField : "nullable",
	headerText : "NULL",
	width : "8%",
	minWidth : 30,
	editable : false
}, {
	dataField : "default_value",
	headerText : "기본값",
	width : "15%",
	minWidth : 50,
	style : "cell_align_left",
	editable : false
}];

// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {
	
	// 그리드 속성 설정
	var gridPros = {

			// 편집 가능 여부 (기본값 : false)
			editable : true,
			
			// 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
			enterKeyColumnBase : false,
			
			showRowNumColumn : false,
			
			// 셀 선택모드 (기본값: singleCell)
			selectionMode : "singleRow",
			
			// 컨텍스트 메뉴 사용 여부 (기본값 : false)
			useContextMenu : true,
			
			// 필터 사용 여부 (기본값 : false)
			enableFilter : true,
		
			// 그룹핑 패널 사용
			useGroupingPanel : false,
			
			// 상태 칼럼 사용
			showStateColumn : false,
			
			// 그룹핑 또는 트리로 만들었을 때 펼쳐지게 할지 여부 (기본값 : false)
			displayTreeOpen : true,
			
			autoGridHeight : true,
			
			noDataMessage : "출력할 데이터가 없습니다.",
			
			groupingMessage : "여기에 칼럼을 드래그하면 그룹핑이 됩니다."
	};

	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);

	AUIGrid.bind(myGridID, "cellEditEnd", function( event ) {
	    if( event.value != event.oldValue ) {
	        var column_id = AUIGrid.getCellValue(myGridID, event.rowIndex, 0);
	        var column_name = event.value;
	        var frm = document.frm;
	        frm.name.value = "<%= table_id %>." + column_id;
	        frm.comment.value = column_name;
	        frm.submit();
	    }
	});
}

function requestJsonData() {
	
	// 요청 URL
	var url = "/_system/json_query.jsp?sql_id=table_info&table_id=<%= table_id %>";

	// ajax 요청 전 그리드에 로더 표시
	AUIGrid.showAjaxLoader(myGridID);
	
	// ajax (XMLHttpRequest) 로 그리드 데이터 요청
	$.ajax({
	    type: 'GET',
		dataType: 'JSON',
		url : url,
		success : function(data) {
			
			// 그리드에 JSON 데이터 설정
			// data 는 JSON 을 파싱한 Array-Object 임
			AUIGrid.setGridData(myGridID, data);
			AUIGrid.resize(myGridID);

			// 로더 제거
			AUIGrid.removeAjaxLoader(myGridID);
		},
		error : function(status, e) {
			alert("데이터 요청에 실패하였습니다.\r\n status : " + status);
			// 로더 제거
			AUIGrid.removeAjaxLoader(myGridID);
		}
	});
};

window.onresize = function() {
	// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출 
	if (typeof myGridID !== "undefined") {
		AUIGrid.resize(myGridID);
	}
};

</script>
<iframe name="hiddenFrame" src="about:blank" width="0" height="0" frameborder="0"></iframe>
<form name="frm" method="post" target="hiddenFrame" action="comment_edit.jsp">
<input type="hidden" name="name">
<input type="hidden" name="comment"/>
</form>
</body>

</html>
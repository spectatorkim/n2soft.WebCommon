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
<meta name="viewport" content="initial-scale=1, maximum-scale=1">
<link href="/AUIGrid/AUIGrid_classic2_style.css" rel="stylesheet">
<style type="text/css">
.cell_align_left { text-align: left; }
.cell_align_right { text-align: right; }
.cell_style_id { text-align: left; color: green; cursor: pointer; }
</style>
<script src="/webponent/grid2.0/external/jquery-1.11.1.min.js"></script>
<script src="/webponent/grid2.0/external/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="/AUIGrid/AUIGridLicense.js"></script>
<script type="text/javascript" src="/AUIGrid/AUIGrid_.js"></script>
</head>

<body topmargin="4" marginheight="4">
<div id="grid_wrap" style="width:100%; height:100%;"></div>

<script type="text/javascript">

function Go(table_id) {
    parent.mainFrame.location.href = "table_info.jsp?table_id=" + table_id;
}

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
	dataField : "table_id",
	headerText : "테이블",
	width : "25%",
	minWidth : "50",
	style : "cell_style_id",
	editable : false
}, {
	dataField : "table_name",
	headerText : "테이블명",
	width : "*",
	style : "cell_align_left"
}];

// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {
	
	// 그리드 속성 설정
	var gridPros = {

			// 편집 가능 여부 (기본값 : false)
			editable : true,
			
			// 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
			enterKeyColumnBase : false,
			
			showRowNumColumn : true,
			
			// 셀 선택모드 (기본값: singleCell)
			selectionMode : "singleRow",
			
			// 컨텍스트 메뉴 사용 여부 (기본값 : false)
			useContextMenu : true,
			
			// 필터 사용 여부 (기본값 : false)
			enableFilter : true,
			
			wordWrap : false,
		
			// 그룹핑 패널 사용
			useGroupingPanel : false,
			
			// 상태 칼럼 사용
			showStateColumn : false,
			
			// 그룹핑 또는 트리로 만들었을 때 펼쳐지게 할지 여부 (기본값 : false)
			displayTreeOpen : true,
			
			autoGridHeight : true,
			
			noDataMessage : "출력할 데이터가 없습니다.",
			
			groupingMessage : "여기에 칼럼을 드래그하면 그룹핑이 됩니다.",
			
			simplifySelectionEvent : true
	};

	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);

	AUIGrid.bind(myGridID, "cellClick", function(event) {
	    if( event.columnIndex != 1 ) {
			var value = AUIGrid.getCellValue(myGridID, event.rowIndex, 0);
			Go(value);
	    }
	});

	AUIGrid.bind(myGridID, "cellEditEnd", function( event ) {
	    if( event.value != event.oldValue ) {
	        var table_id = AUIGrid.getCellValue(myGridID, event.rowIndex, 0);
	        var table_name = event.value;
	        var frm = document.frm;
	        frm.name.value = table_id;
	        frm.comment.value = table_name;
	        frm.submit();
	    }
	});

	AUIGrid.bind(myGridID, "selectionChange", function( event ) {
	    var primeCell = event.primeCell; // 선택된 대표 셀
	    console.log("현재 셀 : ( " + primeCell.rowIndex + ", " + primeCell.headerText + " ), 값 : " + primeCell.value);
	    
	});
	
	 console.log(AUIGrid.releaseDate);
}

function requestJsonData() {
	
	// 요청 URL
	var url = "/_system/json_query.jsp?sql_id=table_list";

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

			var value = AUIGrid.getCellValue(myGridID, 0, 0);
			Go(value);

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
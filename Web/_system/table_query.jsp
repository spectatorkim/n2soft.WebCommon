<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<html>

<head>
<title>nTree 쿼리 실행</title>
<LINK href="table.css" type="text/css" rel="STYLESHEET"></LINK>
<script language="javascript">

function doQuery() {
	var frm = document.frm;
	
	if( frm.sql.value == '' ) {
		alert("쿼리를 입력하세요.  ");
		frm.sql.focus();
		return;
	}

	frm.action = "table_result.jsp";
	frm.target = "mainFrame";
	frm.submit();
}
</script>
</head>

<body topmargin="10" marginheight="10">
<table width="100%" cellpadding="2" cellspacing="0" border="0" style="margin-bottom:10px;">
	<tr>
    	<td class="title">쿼리 실행</td>
        <td align="right"><a href="#" onclick="self.close();">닫기</a></td>
	</tr>
</table>
        	<table width="100%" border="0" cellpadding="2" cellspacing="1">
<form name="frm" method="post">
            	<tr bgcolor="#FFFFFF">
              		<td align="right"><textarea name="sql" style="width:100%; height:100;"></textarea>
              		<br><input type="button" value=" 실행 " onClick="doQuery();"></input>
					</td>
              	</tr>
</form>
			</table>
</body>

</html>
<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*" %>
<%

	String fsb_cd_kind = request.getParameter("fsb_cd_kind");
	String cd_kind = request.getParameter("cd_kind");
	String cd_nm = request.getParameter("cd_nm");
	String cd_lngt = request.getParameter("cd_lngt");

	if( fsb_cd_kind == null || fsb_cd_kind.length() == 0 || cd_kind == null || cd_kind.length() == 0 || cd_nm == null || cd_nm.length() == 0 || cd_lngt == null || cd_lngt.length() == 0 )
		return;

	cd_kind = cd_kind.toUpperCase();

	int cnt = SqlMgr.getFieldOneInt("select count(*) from CMC001TM where CD_KIND = '" + cd_kind + "'");
	if( cnt > 0 ) {
%>
<script> alert("사용중인 코드그룹입니다.  "); location.replace("about:blank"); </script>
<%
		return;
	}

	

	SqlMgr.doQuery("insert into CMC001TM(cd_kind,cd_nm,cd_lngt,use_yn,crt_dtm) values ('" + cd_kind + "','" + cd_nm + "'," + UtilMgr.to_int(cd_lngt) + ",'Y',sysdate)");

	SqlMgr.doQuery("insert into CMC002TM(cd_kind,cd,cd_nm,use_yn,crt_dtm) select '" + cd_kind + "',trim(CD_DMN_VLD_VAL),trim(CD_DMN_VLD_VAL_NM),'Y',sysdate from CBMI00002@BP2 where CD_DMN_ID = '" + fsb_cd_kind + "'");

%>
<script> alert("등록되었습니다.  "); location.replace("about:blank"); </script>

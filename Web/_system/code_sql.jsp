<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="com.n2soft.common.*,com.n2soft.msg.*" %>
<body style="padding:20; font-family:돋움체; font-size:9pt;">
<a href="#" onclick="history.back()">이전으로</a>
<pre>
<%
	String cd_kind = request.getParameter("cd_kind");

	if( cd_kind == null || cd_kind.length() == 0 ) {
		out.println("코드가 지정되지 않았습니다.");
		return;
	}


	StringMap info = SqlMgr.getFieldMap("select * from CMC001TM where CD_KIND = '" + cd_kind + "'", false);

	if( info.getInt("count") > 0 ) {
		out.println("insert into CMC001TM ("
			+ " CD_KIND, CD_NM, CD_SNM, CD_NOTE, CD_LNGT,"
			+ " CD_UPD_AUTH, USE_YN, BASE_CD_YN, RLNUM_1_NM, RLNUM_2_NM,"
			+ " RLNUM_3_NM, INT_1_NM, INT_2_NM, INT_3_NM, CHAR_1_NM,"
			+ " CHAR_2_NM, CHAR_3_NM, CHAR_4_NM, CHAR_5_NM, CRT_ID,"
			+ " CRT_DTM ) values ("
			+ " '" + cd_kind + "', '" + info.get("cd_nm","") + "', '" + info.get("cd_snm","") + "', '" + info.get("cd_note","") + "', " + info.getInt("cd_lngt") + ","
			+ " '" + info.get("cd_upd_auth","") + "', '" + info.get("use_yn","") + "', '" + info.get("base_cd_yn","") + "', '" + info.get("rlnum_1_nm","") + "', '" + info.get("rlnum_2_nm","") + "',"
			+ " '" + info.get("rlnum_3_nm","") + "', '" + info.get("int_1_nm","") + "', '" + info.get("int_2_nm","") + "', '" + info.get("int_3_nm","") + "', '" + info.get("char_1_nm","") + "',"
			+ " '" + info.get("char_2_nm","") + "', '" + info.get("char_3_nm","") + "', '" + info.get("char_4_nm","") + "', '" + info.get("char_5_nm","") + "', '" + info.get("crt_id","") + "',"
			+ " sysdate);");
	}


	StringMap data = SqlMgr.getGroupMap("select * from CMC002TM where CD_KIND = '" + cd_kind + "'", "", false);

	int cnt = data.getInt("count");
	for(int i=0; i < cnt; i++) {
		out.println("insert into CMC002TM ("
			+ " CD_KIND, CD, CD_NM, CD_SNM, CD_NOTE,"
			+ " VIEW_SEQ, USE_YN, RLNUM_1, RLNUM_2, RLNUM_3,"
			+ " INT_1, INT_2, INT_3, CHAR_1, CHAR_2,"
			+ " CHAR_3, CHAR_4, CHAR_5, CRT_ID, CRT_DTM ) values ("
			+ " '" + cd_kind + "', '" + data.get("cd",i,"") + "', '" + data.get("cd_nm",i,"") + "', '" + data.get("cd_snm",i,"") + "', '" + data.get("cd_note",i,"") + "',"
			+ " " + data.getInt("view_seq",i,0) + ", '" + data.get("use_yn",i,"") + "', " + data.getFloat("rlnum_1",i) + ", " + data.getFloat("rlnum_2",i) + ", " + data.getFloat("rlnum_3",i) + ","
			+ " " + data.getInt("int_1",i,0) + ", " + data.getInt("int_1",i,0) + ", " + data.getInt("int_1",i,0) + ", '" + data.get("char_1",i,"") + "', '" + data.get("char_2",i,"") + "',"
			+ " '" + data.get("char_3",i,"") + "', '" + data.get("char_4",i,"") + "', '" + data.get("char_5",i,"") + "', '" + data.get("crt_id",i,"") + "', sysdate);");
	}
%>
</pre>
</body>
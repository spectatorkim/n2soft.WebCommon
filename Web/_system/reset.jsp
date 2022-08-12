<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr" import="com.n2soft.common.Env,com.n2soft.msg.MsgBase" %>
<%
	Env.reset();
	MsgBase.reset();
%>
<script> alert("환경설정이 초기화되었습니다.  "); top.bodyFrame.location.reload(); </script>
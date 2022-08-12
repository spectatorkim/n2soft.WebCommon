<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr" import="com.n2soft.common.*,com.n2soft.crypto.*" %>
<%

	String ps = request.getParameter("ps");

	if( ps == null || ps.length() == 0 )
		return;

	String mode = request.getParameter("mode");
	String es = "";

	if( mode.equals("enc") )
		es = SEED.Encrypt(ps, UtilMgr.getHostID());
	else if( mode.equals("dec") )
		es = SEED.Decrypt(ps, UtilMgr.getHostID());

%>
<script>
parent.setEnc("<%= es %>");
location.replace("about:blank");
</script>
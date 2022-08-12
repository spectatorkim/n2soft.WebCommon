package com.n2soft.msg;

import java.sql.Connection;
import java.util.Random;
import java.util.UUID;

import com.n2soft.common.DataMap;
import com.n2soft.common.DataMapList;
import com.n2soft.common.Env;
import com.n2soft.common.SqlMgr;
import com.n2soft.common.TXSocket;
import com.n2soft.common.UtilMgr;

public class CallBase {

	// 조회모드 (우선순위: INQ_MODE 직접지정->전문->호스트->시스템)
	public static final int INQ_MODE_DEFAULT = 0; // 기본값 사용 (상위설정 상속: 전문->호스트->시스템)
	public static final int INQ_MODE_REAL = 1; // 운영모드
	public static final int INQ_MODE_TEST = 2; // 테스트모드 (중앙회: 교육단말)
	public static final int INQ_MODE_DEV = 3; // 개발모드 (중앙회: 개발노드)

	public static final int MSG_RESULT_FAIL = 0; // 전문처리결과 실패
	public static final int MSG_RESULT_SUCC = 1; // 전문처리결과 성공

	public static final String MSG_STATUS_NONE = "0"; // 전문처리상태 생성
	public static final String MSG_STATUS_REQUEST = "1"; // 전문처리상태 요청
	public static final String MSG_STATUS_SUCCESS = "2"; // 전문처리상태 정상
	public static final String MSG_STATUS_AUTH = "8"; // 전문처리상태 책임자승인(중앙회)
	public static final String MSG_STATUS_ERROR = "9"; // 전문처리상태 오류

	private Connection _conn = null;

	public CallBase() {

	}

	public CallBase(Connection conn) {
		this._conn = conn;
	}

	// 한신정 전문처리
	public DataMap doNICE(DataMap req) {
		DataMap res = new DataMap();

		return doNICE(req, res);
	}

	public DataMap doNICE(DataMap req, DataMap res) {

		String msg_cd = req.getString("MSG_CD", "");

		String host_id = req.getString("MSG.HOST_ID", "");
		String msg_id = req.getString("MSG.MSG_ID", "");
		String tx_id = req.getString("MSG.PARAM1", "");
		String bitmap = req.getString("BITMAP", req.getString("MSG.PARAM2", ""));
		int inq_mode = req.getInt("MSG.INQ_MODE");
		String req_no = req.getString("MSG.REQ_NO", "");

		MsgMgr body = new MsgMgr(msg_id);

		String head_id = body.getHeadId();
		if (head_id == null || head_id.length() == 0)
			head_id = host_id + ".HEAD";

		MsgMgr head = new MsgMgr(head_id);

		// 비트맵값이 있으면 설정
		if (bitmap != null && bitmap.length() > 0)
			body.setBitmap(bitmap, MsgBase._REQUEST);

		// 조회사유코드
		String inq_cd = req.getString("INQ_CD", getInqCd(host_id, req.getString("REQ_TY", "1")));
		req.put("INQ_CD", inq_cd);

		// 요청데이타 세팅
		head.set(req);
		body.set(req);

		// 공통헤더부분 세팅
		int len_width = Env.getInt(host_id + ".len_width");
		int head_len = head.getLength();
		int body_len = body.getLength();
		int total_len = head_len + body_len;
		String time_stamp = UtilMgr.get_date() + UtilMgr.get_time();

		// 전문로그 채번
		String seq_no = getMsgLog(req_no, msg_cd);

		res.put("MSG.REQ_NO", req_no);
		res.put("MSG.SEQ_NO", seq_no);

		head.set("TX_ID", tx_id);
		head.set("BITMAP", bitmap);
		head.set("COMP_ROWID", seq_no);
		head.set("COMP_SND_TM", time_stamp);

		// 서버접속환경
		String server_ip = Env.get(host_id + ".server_ip");
		int server_port = Env.getInt(host_id + ".server_port");
		int timeout = Env.getInt(host_id + ".timeout");

		// 테스트 조회모드
		if (inq_mode == 2) {
			server_ip = Env.get(host_id + ".test.server_ip");
			server_port = Env.getInt(host_id + ".test.server_port");
		}

		// 직접 조회모드
		if (req.getString("SERVER.IP", "").length() > 0)
			server_ip = req.getString("SERVER.IP");
		if (req.getInt("SERVER.PORT", 0) > 0)
			server_port = req.getInt("SERVER.PORT");
		if (req.getInt("SERVER.TIMEOUT", 0) > 0)
			timeout = req.getInt("SERVER.TIMEOUT");

		TXSocket ts = new TXSocket(server_ip, server_port, timeout);

		// 요청전문 생성
		String smsg = UtilMgr.msg_int(total_len, len_width, true, true) + head.toString() + body.toString();

		// 요청전문 기록
		setSendMsgLog(smsg, seq_no);

		String rmsg = ts.doMsg(smsg, len_width);

		if (rmsg == null || rmsg.length() == 0) {
			res.put("MSG.RESULT", "0");
			res.put("MSG.RES_CODE", "9999");
			res.put("MSG.RES_MSG", ts.getErrorMsg());

			return res;
		}

		// 공통헤더 파싱
		head_len = head.getLength(MsgBase._RESPONSE);
		String rhead = UtilMgr.substring(rmsg, len_width, len_width + head_len);

		head.setMsg(rhead);
		head.get(res);

		String res_code = res.getString("RES_CODE");
		String res_msg = getResMsg(Env.get(host_id + ".res_cd_kind"), res_code);
		res.put("MSG.RES_CODE", res_code);
		res.put("MSG.RES_MSG", res_msg);

		// 오류응답시 리턴
		if (!checkResCode(Env.get(host_id + ".res_cd_kind"), res_code)) {
			res.put("MSG.RESULT", "0");
			setRecvMsgLog(rmsg, seq_no, "9", res_code, res_msg);

			return res;
		}

		res.put("MSG.RESULT", "1");

		// 응답전문 기록
		setRecvMsgLog(rmsg, seq_no, "2", res_code, res_msg);

		// 요청비트맵이 있을 경우 응답비트맵 적용
		if (bitmap != null && bitmap.length() > 0) {
			bitmap = res.getString("BITMAP", "").trim();
			if (bitmap.length() > 0)
				body.setBitmap(bitmap, MsgBase._RESPONSE);
		}

		// 데이타부분 파싱
		String rbody = UtilMgr.substring(rmsg, len_width + head_len);

		body.setMsg(rbody);
		body.get(res);

		body.toDatabase(_conn, req_no);

		return res;
	}

	// KCB 전문처리
	public DataMap doKCB(DataMap req) {

		DataMap res = new DataMap();

		return doKCB(req, res);
	}

	// KCB 전문처리
	public DataMap doKCB(DataMap req, DataMap res) {

		String msg_cd = req.getString("MSG_CD", "");

		String host_id = req.getString("MSG.HOST_ID", "");
		String msg_id = req.getString("MSG.MSG_ID", "");
		String tx_id = req.getString("MSG.PARAM1", "");
		String tx_gb = req.getString("MSG.PARAM2", "");
		int inq_mode = req.getInt("MSG.INQ_MODE");
		String req_no = req.getString("MSG.REQ_NO", "");

		int req_cnt = req.getInt("REQ_CNT");

		MsgMgr body = new MsgMgr(msg_id);

		String head_id = body.getHeadId();
		if (head_id == null || head_id.length() == 0)
			head_id = host_id + ".HEAD";

		MsgMgr head = new MsgMgr(head_id);

		// 조회사유코드
		String inq_cd = req.getString("INQ_CD", getInqCd(host_id, req.getString("REQ_TY", "1")));
		req.put("INQ_CD", inq_cd);

		// 요청데이타 세팅
		head.set(req);
		body.set(req);

		// 공통헤더부분 세팅
		int len_width = Env.getInt(host_id + ".len_width");
		int head_len = head.getLength();
		int body_len = body.getLength();
		int total_len = head_len + body_len;

		// GRAS 전문 구분
		if (tx_id.equals("231"))
			head.set("TR_CODE", "GRAS");
		// ASP 전문 구분
		else if (tx_id.equals("101"))
			head.set("TR_CODE", "ASP");

		head.set("TOTAL_LEN", total_len);
		head.set("DATA_LEN", body_len);

		head.set("TX_ID", tx_id);
		head.set("TX_GB", (req_cnt > 1) ? tx_gb.substring(0, 1) + "500" : tx_gb); // 재조회시 x500 으로 전송
		head.set("USER_SENDTM", UtilMgr.get_date() + UtilMgr.get_time());
		head.set("BLANK", req.getString("RESID_NO", "")); // 여유필드에 주민번호 입력

		// 메시지 생성 및 송수신

		// 서버접속환경
		String server_ip = Env.get(host_id + ".server_ip");
		int server_port = Env.getInt(host_id + ".server_port");
		int timeout = Env.getInt(host_id + ".timeout");

		// 테스트 조회모드
		if (inq_mode == 2) {
			server_ip = Env.get(host_id + ".test.server_ip");
			server_port = Env.getInt(host_id + ".test.server_port");
		}

		// 직접 조회모드
		if (req.getString("SERVER.IP", "").length() > 0)
			server_ip = req.getString("SERVER.IP");
		if (req.getInt("SERVER.PORT", 0) > 0)
			server_port = req.getInt("SERVER.PORT");
		if (req.getInt("SERVER.TIMEOUT", 0) > 0)
			timeout = req.getInt("SERVER.TIMEOUT");

		TXSocket ts = new TXSocket(server_ip, server_port, timeout);

		// 전문로그 채번
		String fep_gid = UUID.randomUUID().toString().toUpperCase();
		req.put("MSG.FEP_GID", fep_gid);

		String seq_no = getMsgLog(req_no, msg_cd);

		res.put("MSG.REQ_NO", req_no);
		res.put("MSG.SEQ_NO", seq_no);

		head.set("USER_SERIAL", seq_no);

		// 요청전문 생성
		String smsg = UtilMgr.msg_int(total_len, len_width, true, true) + head.toString() + body.toString();

		// 요청전문 기록
		setSendMsgLog(smsg, seq_no);

		String rmsg = ts.doMsg(smsg, len_width);

		if (rmsg == null || rmsg.length() == 0) {
			res.put("MSG.RESULT", "0");
			res.put("MSG.RES_CODE", "9999");
			res.put("MSG.RES_MSG", ts.getErrorMsg());

			return res;
		}

		// 공통헤더 파싱
		String rhead = UtilMgr.substring(rmsg, len_width, len_width + head_len);

		head.setMsg(rhead);
		head.get(res);

		String rbody = UtilMgr.substring(rmsg, len_width + head_len);

		// 오류발생시 오류전문으로 처리
		String res_code = res.getString("RES_CODE");
		String res_msg = getResMsg(Env.get(host_id + ".res_cd_kind"), res_code);
		res.put("MSG.RES_CODE", res_code);
		res.put("MSG.RES_MSG", res_msg);

		if (!checkResCode(Env.get(host_id + ".res_cd_kind"), res_code)) {
			res.put("MSG.RESULT", "0");
			setRecvMsgLog(rmsg, seq_no, "9", res_code, res_msg);

			return res;
		}

		res.put("MSG.RESULT", "1");

		// 응답전문 기록
		setRecvMsgLog(rmsg, seq_no, "2", res_code, res_msg);

		// 데이타부분 파싱
		body.setMsg(rbody);
		body.get(res);

		body.toDatabase(_conn, req_no);

		return res;
	}

	// 중앙회 차세대 전문처리
	public DataMap doIFS(DataMap req) {
		DataMap res = new DataMap();

		return doIFS(req, res);
	}

	public DataMap doIFS(DataMap req, DataMap res) {

		String msg_cd = req.getString("MSG_CD", "");

		String host_id = req.getString("MSG.HOST_ID", "");
		String msg_id = req.getString("MSG.MSG_ID", "");
		String trn_cd = req.getString("MSG.PARAM1", "");
		int inq_mode = req.getInt("MSG.INQ_MODE");
		String req_no = req.getString("MSG.REQ_NO", "");
		boolean b_telr = req.getString("MSG.TELR_YN", "Y").equalsIgnoreCase("Y"); // 회계처리 전문여부

		String smsg = "";
		String result_cd = "";
		String res_code = "";
		String res_msg = "";
		String res_msg_note = "";
		String seq_no = "";

		// 서버접속환경
		String server_ip = Env.get(host_id + ".server_ip", "");
		int server_port = Env.getInt(host_id + ".server_port");
		int timeout = Env.getInt(host_id + ".timeout");
		String cypher_key = Env.get(host_id + ".cypher_key", "");
		String mgr_user_no = Env.get(host_id + ".mgr_user_no", "");
		String mgr2_user_no = Env.get(host_id + ".mgr2_user_no", "");
		String env_dvcd = "P";

		if (inq_mode > 1) {
			server_ip = Env.get(host_id + ".test.server_ip");
			server_port = Env.getInt(host_id + ".test.server_port");
			cypher_key = Env.get(host_id + ".test.cypher_key");
			mgr_user_no = Env.get(host_id + ".test.mgr_user_no", "");
			mgr2_user_no = Env.get(host_id + ".test.mgr2_user_no", "");
			env_dvcd = "D";
		}

		if (req.getString("SERVER.IP", "").length() > 0)
			server_ip = req.getString("SERVER.IP");
		if (req.getInt("SERVER.PORT", 0) > 0)
			server_port = req.getInt("SERVER.PORT");
		if (req.getInt("SERVER.TIMEOUT", 0) > 0)
			timeout = req.getInt("SERVER.TIMEOUT");
		if (req.getString("MGR_USER_NO", "").length() > 0)
			mgr_user_no = req.getString("MGR_USER_NO", "");
		if (req.getString("MGR2_USER_NO", "").length() > 0)
			mgr2_user_no = req.getString("MGR2_USER_NO", "");

		// 복수 승인자정보 입력
		req.put("APRR_PCNT", 2);
		DataMapList aprr_dml = new DataMapList();
		DataMap aprr_dm1 = new DataMap();
		aprr_dm1.put("APRR_USRNO", mgr_user_no);
		aprr_dml.add(aprr_dm1);
		DataMap aprr_dm2 = new DataMap();
		aprr_dm2.put("APRR_USRNO", mgr2_user_no);
		aprr_dml.add(aprr_dm2);

		req.put("APRR_DATA", aprr_dml);

		MsgMgr body = new MsgMgr(msg_id);

		String head_id = body.getHeadId();
		if (head_id == null || head_id.length() == 0)
			head_id = "IFS.HEAD";

		MsgMgr head = new MsgMgr(head_id);

		body.set(req);

		head.set(req);

		String admin_id = req.getString("ADMIN_ID", "");
		String usrno = req.getString("USRNO", req.getString("H_USRNO", "")); // 사용자번호 직접 지정시

		// 로그인 사용자의 이기종사번 조회
		if (usrno.length() == 0 && admin_id.length() > 0)
			usrno = SqlMgr.getFieldOne(_conn, " select FSB_EMPNO from CMU001TM where USER_ID = ? ", admin_id);

		// 미지정 또는 이기종사번 미설정시 시스템 기본 이기종사번 사용(회계처리 전문은 오류로 리턴)
		if (usrno == null || usrno.length() == 0) {

			if (b_telr) {
				res.put("MSG.RESULT", MSG_RESULT_FAIL);
				res.put("MSG.RES_CODE", "9998");
				res.put("MSG.RES_MSG", "회계처리 전문은 개별 이기종 사번설정이 필요합니다.");

				return res;
			}

			usrno = Env.get("ifs.usrno", Env.get("ifs.user_no", ""));
		}

		// 공통헤더부분 세팅
		String br_cd = req.getString("BOCD", req.getString("BR_CD", ""));
		if (br_cd.length() == 0)
			br_cd = SqlMgr.getFieldOne(_conn, " select FSB_BRCHCD from CMU018TM where FSB_EMP_NO = ? ", usrno);

		if (br_cd == null || br_cd.length() == 0)
			br_cd = Env.get("ifs.br_cd", "");

		head.set("IPAD", req.getString("IP_ADDR", Env.get("system.ip_addr", "")));
		head.set("MACAD", req.getString("MAC_ADDR", Env.get("system.mac_addr", "")));
		head.set("TRN_CD", trn_cd);
		head.set("BOCD", br_cd);
		head.set("H_USRNO", usrno);

		String guid = UtilMgr.get_date() + UtilMgr.get_time(true) + env_dvcd + "DMS" + Env.get("ifs.bank_cd", "000") + br_cd + UtilMgr.msg_int(new Random().nextInt(1000000), 6, true, true);
		head.set("TRN_GUID", guid);
		head.set("SYS_ENV_DVCD", env_dvcd);
		head.set("MESG_REQT_DDTM", guid.substring(0, 17));

		int head_len = head.getLength();
		int body_len = body.getLength();
		head.set("STND_HDPT_LEN", head_len);
		head.set("WHL_MESG_LEN", head_len + body_len);

		TXSocket ts = new TXSocket(server_ip, server_port, timeout);

		// 요청전문 생성
		smsg = head.toString() + body.toString();

		// 전문로그 채번
		seq_no = getMsgLog(req_no, msg_cd);

		res.put("MSG.REQ_NO", req_no);
		res.put("MSG.SEQ_NO", seq_no);
		res.put("MSG.IFIS_USER_NO", usrno);

		// 요청전문 기록
		setSendMsgLog(smsg, seq_no);

		String rmsg = ts.doIFSMsg(smsg, cypher_key);

		if (rmsg == null || rmsg.length() == 0) {
			res.put("MSG.RESULT", MSG_RESULT_FAIL);
			res.put("MSG.RES_CODE", "9999");
			res.put("MSG.RES_MSG", ts.getErrorMsg());

			return res;
		}

		// 공통헤더 파싱
		head.setMsg(rmsg);
		head.get(res);

		head_len = res.getInt("STND_HDPT_LEN");

		// 오류발생시 오류전문으로 처리
		result_cd = res.getString("MESG_TRTM_RSLT_CD", "");

		// 전문예비문자열내용은 조치메시지로 처리
		String mesg_spr_chrs_cntn = res.getString("MESG_SPR_CHRS_CNTN", "");
		if (mesg_spr_chrs_cntn.length() > 0)
			res_msg_note += "\n" + mesg_spr_chrs_cntn;

		int msg_ccnt = res.getInt("MSG_CCNT");
		DataMapList msg_dml = res.getList("MSG_DATA");
		for (int i = 0; i < msg_ccnt; i++) {
			DataMap msg_dm = msg_dml.get(i);
			res_code += "," + msg_dm.getString("MSG_CD", "");
			res_msg += "\n" + msg_dm.getString("MSG_CNTN", "");
			int mngm_msg_ccnt = msg_dm.getInt("MNGM_MSG_CCNT");
			DataMapList mngm_msg_dml = msg_dm.getList("MNGM_MSG_DATA");
			for (int j = 0; j < mngm_msg_ccnt; j++) {
				DataMap mngm_msg_dm = mngm_msg_dml.get(j);
				res_msg_note += "\n" + mngm_msg_dm.getString("MNGM_MSG_CNTN", "");
			}
		}

		res_code = res_code.length() > 1 ? UtilMgr.substring(res_code, 1) : "";
		res_msg = res_msg.length() > 1 ? UtilMgr.substring(res_msg, 1) : "";
		res_msg_note = res_msg_note.length() > 1 ? UtilMgr.substring(res_msg_note, 1) : "";

		res.put("MSG.RES_CODE", res_code);
		res.put("MSG.RES_MSG", res_msg);
		res.put("MSG.RES_MSG_NOTE", res_msg_note);

		// 결과가 오류이면 오류응답으로 처리
		if (!result_cd.equals("0")) {
			// 응답전문 오류기록
			setRecvMsgLog(rmsg, seq_no, MSG_STATUS_ERROR, res_code, res_msg);
			res.put("MSG.RESULT", MSG_RESULT_FAIL);

			return res;
		}

		// 데이터부가 있으면 파싱
		body_len = UtilMgr.length(rmsg) - head_len;
		if (body_len > 0) {
			String body_msg = UtilMgr.substring(rmsg, head_len);

			body.setMsg(body_msg);
			body.get(res);

			body.toDatabase(_conn, req_no); // 테이블 자동 저장
		}

		// 응답전문 정상 기록
		setRecvMsgLog(rmsg, seq_no, MSG_STATUS_SUCCESS, res_code, "정상");
		res.put("MSG.RESULT", MSG_RESULT_SUCC);

		return res;
	}



	// ==================================================================================================

	public DataMap getMsgInfo(String msg_cd) {
		String sql = "select" + " N2.HOST_ID" + ",MSG_ID" + ",PARAM1" + ",PARAM2" + ",PARAM3" + ",PARAM4" + ",PARAM5"
				+ ",TELR_YN" + ",N2.INQ_MODE" + ",N1.INQ_MODE as HOST_INQ_MODE"
				+ ",case when N1.FEP_USE_YN = 'Y' and N2.FEP_USE_YN = 'Y' then 'Y' else 'N' end  as FEP_USE_YN"
				+ ",N1.FEP_CHAN_ID" + ",N2.FEP_INTFC_ID" + " from CMN002TM N2"
				+ " left outer join CMN001TM N1 on N1.HOST_ID = N2.HOST_ID" + " where N2.MSG_CD = '" + msg_cd + "'";

		return SqlMgr.selectOne(_conn, sql);
	}

	// 송신용 요청번호 생성
	public String getRequest(String req_id, String req_ty, String resid_no, String msg_cd, String caller,
			String inq_mode, String inq_cd, String admin_id) {

		String req_no = SqlMgr.getFieldOne(_conn, "select SEQ_CMN003TH.NEXTVAL from dual");

		String sql = "insert into CMN003TH (REQ_NO, REQ_ID, REQ_TY, RESID_NO, MSG_CD, REQ_DT, CALLER, INQ_MODE, INQ_CD, CRT_ID, CRT_DTM, CRT_DT) values (?, ?, ?, FN_ENCSSN(?), ?, TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS'), ?, ?, ?, ?, TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS'), TO_CHAR(SYSDATE,'YYYYMMDD'))";

		String[] args = { req_no, req_id, req_ty, resid_no, msg_cd, caller, inq_mode, inq_cd, admin_id };

		if (!SqlMgr.doQuery(_conn, sql, args))
			return null;

		return req_no;
	}

	// 수신용 요청번호 생성
	public String getRequest(String req_id, String resid_no, String msg_id) {
		StackTraceElement ste = new Throwable().getStackTrace()[1];
		String caller = ste.getClassName() + ":" + ste.getMethodName() + "():" + ste.getLineNumber();

		String msg_cd = SqlMgr.getFieldOne(_conn, "select MSG_CD from CMN002TM where msg_id = '" + msg_id + "'");
		String req_no = SqlMgr.getFieldOne(_conn, "select SEQ_CMN003TH.NEXTVAL from dual");

		String sql = "insert into CMN003TH (REQ_NO, REQ_ID, REQ_TY, RESID_NO, MSG_CD, REQ_DT, CALLER, CRT_ID, CRT_DTM, CRT_DT) values (?, ?, ?, FN_ENCSSN(?), ?, TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS'), ?, ?, TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS'), TO_CHAR(SYSDATE,'YYYYMMDD'))";

		String[] args = { req_no, req_id, "9", resid_no, msg_cd, caller, "system" };

		if (!SqlMgr.doQuery(_conn, sql, args))
			return null;

		return req_no;
	}

	// 응답종료 처리
	public boolean setRequest(String req_no, String status) {
		String sql = "update CMN003TH set RES_DT = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS'), STATUS = '" + status
				+ "' where REQ_NO = " + req_no;

		return SqlMgr.doQuery(_conn, sql);
	}

	public boolean setRequest(String req_no, String status, String ifis_user_no) {
		String sql = "update CMN003TH set RES_DT = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS'), STATUS = '" + status
				+ "', IFIS_USER_NO = '" + ifis_user_no + "' where REQ_NO = " + req_no;

		return SqlMgr.doQuery(_conn, sql);
	}

	public String getMsgLog(String req_no, String msg_cd) {
		return getMsgLog(req_no, msg_cd, "");
	}

	// 전문로그 채번
	public String getMsgLog(String req_no, String msg_cd, String fep_gid) {
		String seq_no = SqlMgr.getFieldOne(_conn, "select SEQ_CMN004TL.NEXTVAL from dual");

		String sql = "insert into CMN004TL(SEQ_NO, REQ_NO, MSG_CD, SEND_MSG, RECV_MSG, STATUS, FEP_GID) values (?, ?, ?, EMPTY_CLOB(), EMPTY_CLOB(), '0', ?)";

		String[] args = { seq_no, req_no, msg_cd, fep_gid };

		if (!SqlMgr.doQuery(_conn, sql, args))
			return null;

		return seq_no;
	}

	// 전문로그 채번
	public String getMsgLog(String req_no) {
		String msg_cd = SqlMgr.getFieldOne(_conn, "select MSG_CD from CMN003TH where REQ_NO = " + req_no);

		return getMsgLog(req_no, msg_cd, "");
	}

	// 송신전문 저장
	public boolean setSendMsgLog(String send_msg, String seq_no, String status, String res_code, String res_msg,
			String fep_gid) {

		String sql = "update CMN004TL set SEND_DT = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS'), STATUS = ?, RES_CODE = ?, RES_MSG = ?, SEND_MSG = ? where SEQ_NO = ?";

		String[] args = { status, res_code, res_msg, send_msg, seq_no };

		return SqlMgr.doQuery(_conn, sql, args);
	}

	public boolean setSendMsgLog(String send_msg, String seq_no, String status) {
		return setSendMsgLog(send_msg, seq_no, status, "", "", "");
	}

	public boolean setSendMsgLog(String send_msg, String seq_no) {
		return setSendMsgLog(send_msg, seq_no, "1", "", "", "");
	}

	// 수신전문 저장
	public boolean setRecvMsgLog(String recv_msg, String seq_no, String status, String res_code, String res_msg) {
		String sql = "update CMN004TL set RECV_DT = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS'), STATUS = ?, RES_CODE = ?, RES_MSG = ?, RECV_MSG = ? where SEQ_NO = ?";

		String[] args = { status, res_code, res_msg, recv_msg, seq_no };

		return SqlMgr.doQuery(_conn, sql, args);
	}

	public boolean setRecvMsgLog(String recv_msg, String seq_no, String status) {
		return setRecvMsgLog(recv_msg, seq_no, status, "", "");
	}

	public boolean setRecvMsgLog(String recv_msg, String seq_no) {
		return setRecvMsgLog(recv_msg, seq_no, "1", "", "");
	}

	// 응답코드 해당 메시지 조회
	public String getResMsg(String cd_kind, String res_code) {
		String res_msg = SqlMgr.getFieldOne(_conn,
				"select CD_NM from CMC002TM where CD_KIND = '" + cd_kind + "' and CD = '" + res_code + "'");

		if (res_msg == null)
			res_msg = "미등록 오류";

		return res_msg;
	}

	// 응답코드 정상조회여부
	public boolean checkResCode(String cd_kind, String res_code) {
		if (cd_kind == null || res_code == null)
			return false;

		return SqlMgr.getFieldOneInt(_conn,
				"select NVL(int_1,0) from CMC002TM where CD_KIND = '" + cd_kind + "' and CD = '" + res_code + "'") == 0
						? false
						: true;
	}

	// 요청구분별 조회사유코드 조회
	public String getInqCd(String host_id, String req_ty) {

		String inq_cd = SqlMgr.getFieldOne(_conn, "select INQ_CDS from CMN001TM where HOST_ID = '" + host_id + "'");

		if (inq_cd == null || inq_cd.length() == 0)
			return Env.get(host_id + ".inq_cd", "");

		String[] inq_cds = UtilMgr.split(inq_cd, ",");
		int i_req_ty = UtilMgr.to_int(req_ty) - 1;
		if (i_req_ty < 0 || i_req_ty > (inq_cds.length - 1))
			i_req_ty = 0;

		return inq_cds[i_req_ty];
	}

}

package com.n2soft.msg;

import java.sql.Connection;
import java.util.Arrays;

import com.n2soft.common.DataMap;
import com.n2soft.common.DataMapList;
import com.n2soft.common.Env;
import com.n2soft.common.LogMgr;
import com.n2soft.common.SqlMgr;
import com.n2soft.common.UtilMgr;


public class CallMgr {

    private Connection _conn = null;

    private boolean debug = true;
    private String[] tester = null;

    public CallMgr() {
        tester = Env.getCodes("system.tester");
    }

    public CallMgr(Connection conn) {
        tester = Env.getCodes("system.tester");
        this._conn = conn;
    }


    boolean isTester(String resid_no) {

        if( tester == null )
            return false;

        for(int i=0; i < tester.length; i++)
            if( resid_no.equals(tester[i]) ) 
                return true;

        return false;
    }



    public DataMap doMsg(String msg_cd, DataMap req) {
        StackTraceElement ste = new Throwable().getStackTrace()[1];
        String caller = ste.getClassName() + ":" + ste.getMethodName() + "():" + ste.getLineNumber();

        req.put("MSG.CALLER", caller);
        req.put("MSG_CD", msg_cd);

        return doMsg(req);
    }

    public DataMap doMsg(String...args) {
        StackTraceElement ste = new Throwable().getStackTrace()[1];
        String caller = ste.getClassName() + ":" + ste.getMethodName() + "():" + ste.getLineNumber();

        DataMap req = new DataMap();
        req.put("MSG.CALLER", caller);

        for(int i=0; i < args.length; i+=2)
            req.put(args[i], args[i+1]);

        return doMsg(req); 
    }

    public DataMap doMsg(DataMap req) {
        String caller = req.getString("MSG.CALLER");
        if( caller == null ) {
            StackTraceElement ste = new Throwable().getStackTrace()[1];
            caller = ste.getClassName() + ":" + ste.getMethodName() + "():" + ste.getLineNumber();
        }

        DataMap res = new DataMap();

        boolean is_new = (_conn == null);
        if( is_new )
            _conn = SqlMgr.getDBConnection();

        try {

            if( debug )
                LogMgr.debug(req.toString(true));

            CallBase mgr = new CallBase(_conn);

            String msg_cd = req.getString("MSG_CD", "");
            DataMap info = mgr.getMsgInfo(msg_cd);

            String host_id = info.getString("HOST_ID", "");
            String msg_id = info.getString("MSG_ID", "");
            boolean test_mode = (info.getInt("TEST_MODE") == 1);

            // ??????????????????
            int inq_mode = req.getInt("INQ_MODE");    // ?????? ?????? ??????
            if( inq_mode == 0 )  inq_mode = info.getInt("INQ_MODE");    // ???????????? ???????????? ??????
            if( inq_mode == 0 )  inq_mode = info.getInt("HOST_INQ_MODE");    // ?????? ???????????? ??????????????? ??????
            if( inq_mode == 0 )  inq_mode = Env.getInt("system.inq_mode", 1);  // ????????? ???????????? ??????????????? ??????(Default=1:Real)

            String req_id = req.getString("REQ_ID", "");
            String req_ty = req.getString("REQ_TY", "1");
            String resid_no = req.getString("RESID_NO", "");
            // ???????????? ??????????????? ???????????? ??????
            if( resid_no.length() > 30 )
            	resid_no = SqlMgr.getFieldOne(_conn, "select FN_DECSSN(?) from dual", resid_no);
            String inq_cd = req.getString("INQ_CD", mgr.getInqCd(host_id, req.getString("REQ_TY","1")));
            String admin_id = req.getString("ADMIN_ID", "");

            // ???????????? ??????
            String req_no = mgr.getRequest(req_id, req_ty, resid_no, msg_cd, caller, inq_mode+"", inq_cd, admin_id);


            // ?????????????????? ???????????? ??????
            req.put("MSG.HOST_ID", host_id);
            req.put("MSG.MSG_ID", msg_id);
            req.put("MSG.PARAM1", info.get("PARAM1",""));
            req.put("MSG.PARAM2", info.get("PARAM2",""));
            req.put("MSG.PARAM3", info.get("PARAM3",""));
            req.put("MSG.PARAM4", info.get("PARAM4",""));
            req.put("MSG.PARAM5", info.get("PARAM5",""));
            req.put("MSG.TELR_YN", info.get("TELR_YN",""));
            req.put("MSG.INQ_MODE", inq_mode);
            req.put("MSG.REQ_NO", req_no);
            req.put("MSG.REQ_ID", req_id);
            req.put("MSG.ADMIN_ID", admin_id);

            req.put("MSG.FEP_USE_YN", info.get("FEP_USE_YN",""));
            req.put("MSG.FEP_CHAN_ID", info.get("FEP_CHAN_ID",""));
            req.put("MSG.FEP_INTFC_ID", info.get("FEP_INTFC_ID",""));


            // ????????? ??????
            if( !test_mode && isTester(resid_no) ) {
                req.put("RESID_NO", "1111111111111");
                req.put("BIS_RES_NO", "1111111111111");
            }


            if( host_id.equalsIgnoreCase("IFS") )
                res = mgr.doIFS(req);
            else if( msg_id.equals("NICE.1F003") )
                res = nice1F003(req);
            else if( msg_id.equals("NICE.14001") )
                res = nice14001(req);
            else if( msg_id.equals("NICE.TR800") )
                res = niceTR800(req);
            else if( host_id.equalsIgnoreCase("NICE") )
                res = mgr.doNICE(req);
            else if( host_id.equalsIgnoreCase("KCB") )
                res = doKCB(req);


            int result = res.getInt("MSG.RESULT");
            String ifis_user_no = res.getString("MSG.IFIS_USER_NO","");

            // ????????????, ????????? ????????? ??????????????? ????????????
            mgr.setRequest(req_no, (result == 0) ? "9" : "2", ifis_user_no);

        }
        catch( Exception e ) {
            LogMgr.error("Exception at CallMgr.doMsg() : " + UtilMgr.getStackTraceFromThrowable(e));
            res = null;
        }
        finally {
            if( is_new ) {
                SqlMgr.close(_conn);
                _conn = null;
            }
        }

        return res;
    }


    DataMap nice1F003(DataMap req) {

        String bitmap = req.getString("BITMAP", req.getString("MSG.PARAM2",""));
        boolean[] used = MsgBase.Hex2Bin(bitmap);

        int[] tn = new int[64];                // ?????????
        int[] rn = new int[64];                // ????????????

        String[][] codes = new String[64][];

        // ???????????? ?????? (56??? ???????????????????????? ????????? ?????? ???????????? ?????? 62??? ?????????????????? ??????????????? ??????)
        for(int i=56; i < 64; i++) {
            // ????????? ???????????? ??????
            if( !used[i] )
                continue;

            String gubun = UtilMgr.msg_int(i+1, 2, false, false);
            String code = "DATA" + gubun + ".CODE";

            String code_list = req.getString(code, Env.get("nice." + code.toLowerCase()));
            codes[i] = UtilMgr.explode(code_list, ",");

            if( codes[i] != null && codes[i].length > 0 )    {
                tn[i] = (codes[i].length > 99) ? 99 : codes[i].length;    // ????????? 100??? ????????? ?????? ?????? 99?????? ??????

                // 62??? ?????????????????? 99??? ????????? ?????? 56??? ????????????????????? ?????????
                if( i == 61 && codes[61].length > 99 ) {
                    tn[55] = (codes[61].length > 198) ? 99 : codes[61].length - 99;
                    codes[55] = Arrays.copyOfRange(codes[61], 99, tn[55]+99);

                    // ????????? ???????????? 56??? ?????? ?????????
                    if( !used[55] ) {
                        used[55] = true;
                        bitmap = MsgBase.Bin2Hex(used);
                        req.put("BITMAP", bitmap);
                    }
                }
            }

        }


        CallBase mgr = new CallBase(_conn);
        DataMap res = new DataMap();

        String more_yn = "N";
        String sign_no = "000000000000";    // ????????????
        int req_cnt = 0;


        do {

            req.put("REQ_CNT", req_cnt);
            req.put("SIGN_NO", sign_no);

            // ??????????????? ??????
            niceSetCount(req, tn, rn);

            // ???????????? ??????
            for(int i=55; i < 64; i++) {
                if( !used[i] )
                    continue;

                String gubun = UtilMgr.msg_int(i+1, 2, false, false);

                for(int j=rn[i]; j < tn[i]; j++)
                    req.put("DATA" + gubun + ".CODE[" + (j-rn[i]) + "]", codes[i][j]);
            }


            // NICE ?????? ?????????
            res = mgr.doNICE(req);

            int result = res.getInt("MSG.RESULT");
            if( result == 0 )
                return res;


            // ?????????/???????????? ?????????
            niceGetCount(res, req_cnt, tn, rn, bitmap);


            sign_no = res.getString("SIGN_NO","");
            more_yn = res.getString("MORE_YN","");

            req_cnt ++;

        } while( more_yn.equals("Y") );


        return res;
    }

    void niceSetCount(DataMap req, int[] tn, int[] rn) {
        for(int i=12; i < 64; i++) {

            req.put("DATA" + (i+1) + "_CNT", rn[i]);

            int req_cnt = 0;

            if( i < 55 && tn[i] == 0 )
                req_cnt = 99;
            else if( tn[i] > rn[i] ) {
                req_cnt = tn[i] - rn[i];

                if( req_cnt > 99 )
                    req_cnt = 99;
            }

            req.put("DATA" + (i+1) + "_REQ", req_cnt);
        }
    }


    boolean niceGetCount(DataMap res, int req_cnt, int[] tn, int[] rn, String bitmap) {

        boolean[] used = MsgBase.Hex2Bin(bitmap);

        // ?????? ????????? ????????? ?????????
        if( req_cnt == 0 ) {

            for(int i=12; i < 64; i++) {

                if( !used[i] )
                    continue;

                // ???????????? ?????? ???????????? ?????? ?????? ????????? ???????????? ?????? (?????????????????? ??????)
                if( tn[i] > 0 )
                    continue;

                int total = res.getInt("DATA" + (i+1) + "_TOT");

                // ?????? ???????????? ????????? ?????? 
                if( total == 0 )
                    continue;

                tn[i] = total;
            }
        }


        for(int i=12; i < 64; i++) {

            if( !used[i] )
                continue;

            String prefix = (i+1) + "";
            int res_cnt = res.getInt("DATA" + prefix + "_RES");

            if( res_cnt == 0 )
                continue;

            rn[i] += res_cnt;
        }


        return true;
    }


    // NICE CSS 2.0
    DataMap niceTR800(DataMap req) {

        DataMap res = new DataMap();

        boolean is_new = (_conn == null);
        if( is_new )
            _conn = SqlMgr.getDBConnection();


        try {

            if( debug )
                LogMgr.debug(req.toString(true));

            CallBase mgr = new CallBase(_conn);

            res = mgr.doNICE(req);


            // ????????????, 20140723 ??????. ///////////////////////////////////////
            ///////////////////////////////////////////////////////////////////
            String res_cd  = res.getString("MSG.RES_CODE","");
            String insp_no = req.getString("REQ_ID","");

            if ("B004".equals(res_cd) || res_cd == "B004") {
                String sqlIns = "INSERT INTO LNC008TM (acct_seqno, insp_no, send_ty, stq_cd, send_msg, crt_id, crt_dtm)    ";
                sqlIns += "VALUES (seq_lnc008tm.NEXTVAL, ?, 'S', '21', '???????????? ???????????? ?????????', 'nTree', TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS'))";

                SqlMgr.doQuery(_conn, sqlIns, insp_no);
            }
            ///////////////////////////////////////////////////////////////////

        } catch( Exception e ) {
            e.printStackTrace();
            LogMgr.error("Exception at CallMgr.niceTR800() : " + e.getMessage());

        } finally {
            if( is_new ) {
                SqlMgr.close(_conn);
                _conn = null;
            }
        }

        return res;
    }


    void niceTR800SetCount(DataMap req, int[] tn, int[] rn) {

        for(int i=0; i < 3; i++) {

            String gubun = UtilMgr.msg_int(i+3, 2, true, true);

            req.put("DATA" + gubun + "_CNT", rn[i]);

            int req_cnt = 0;

            if( i < 2 && tn[i] == 0 )    // ??????????????? ?????? ????????? ???????????? ??????
                req_cnt = 99;
            else if( tn[i] > rn[i] ) {
                req_cnt = tn[i] - rn[i];

                if( req_cnt > 99 )
                    req_cnt = 99;
            }

            req.put("DATA" + gubun + "_REQ", req_cnt);
        }
    }


    boolean niceTR800GetCount(DataMap res, int req_cnt, int[] tn, int[] rn) {

        // ?????? ????????? ????????? ?????????
        if( req_cnt == 0 ) {

            for(int i=0; i < 3; i++) {

                String gubun = UtilMgr.msg_int(i+3, 2, true, true);

                // ???????????? ?????? ???????????? ?????? ?????? ????????? ???????????? ?????? (?????????????????? ??????)
                if( tn[i] > 0 )
                    continue;

                int total = res.getInt("DATA" + gubun + "_TOT");

                // ?????? ???????????? ????????? ?????? 
                if( total == 0 )
                    continue;

                tn[i] = total;
            }
        }


        for(int i=0; i < 3; i++) {

            String gubun = UtilMgr.msg_int(i+3, 2, false, false);

            int res_cnt = res.getInt("DATA" + gubun + "_RES");

            if( res_cnt == 0 )
                continue;

            rn[i] += res_cnt;
        }


        return true;
    }


    DataMap nice14001(DataMap req) {

        int[] segments = { 21, 22, 23, 24, 62, 63 };
        int segment_cnt = segments.length;


        int[] tn = new int[segment_cnt];                // ?????????
        int[] rn = new int[segment_cnt];                // ????????????

        String[][] codes = new String[segment_cnt][];

        // ???????????? ??????
        for(int i=0; i < segment_cnt; i++) {
            if( segments[i] < 60 )
                continue;

            codes[i] = Env.getCodes("nice.data" + segments[i] + "_14001");

            if( codes[i] != null && codes[i].length > 0 )
                tn[i] = codes[i].length;
        }


        CallBase mgr = new CallBase(_conn);
        DataMap res = new DataMap();

        String more_yn = "N";
        String sign_no = "000000000000";    // ????????????
        int req_cnt = 0;


        do {

            req.put("REQ_CNT", req_cnt);
            req.put("SIGN_NO", sign_no);

            // ??????????????? ??????
            for(int i=0; i < segment_cnt; i++) {
                req.put("DATA" + segments[i] + "_CNT", rn[i]);

                int cnt = 0;

                if( tn[i] == 0 && segments[i] < 60 )
                    cnt = 99;
                else if( tn[i] > rn[i] ) {
                    cnt = tn[i] - rn[i];

                    if( cnt > 99 )
                        cnt = 99;
                }

                req.put("DATA" + segments[i] + "_REQ", cnt);

                for(int j=rn[i]; j < tn[i]; j++)
                    req.put("DATA" + segments[i] + ".CODE[" + (j-rn[i]) + "]", codes[i][j]);

            }


            // NICE ?????? ?????????
            res = mgr.doNICE(req);

            int result = res.getInt("MSG.RESULT");
            if( result == 0 )
                return res;


            // ?????? ????????? ????????? ?????????
            if( req_cnt == 0 ) {

                for(int i=0; i < segment_cnt; i++) {

                    // ???????????? ?????? ???????????? ?????? ?????? ????????? ???????????? ?????? (?????????????????? ??????)
                    if( tn[i] > 0 )
                        continue;

                    int total = res.getInt("DATA" + segments[i] + "_TOT");

                    // ?????? ???????????? ????????? ?????? 
                    if( total == 0 )
                        continue;

                    tn[i] = total;
                }
            }

            // ???????????? ?????????
            for(int i=0; i < segment_cnt; i++) {

                int res_cnt = res.getInt("DATA" + segments[i] + "_RES");

                if( res_cnt == 0 )
                    continue;

                rn[i] += res_cnt;
            }


            sign_no = res.getString("SIGN_NO","");
            more_yn = res.getString("MORE_YN","");

            req_cnt ++;

        } while( more_yn != null && more_yn.equals("Y") );


        return res;
    }



    DataMap doKCB(DataMap req) {

        CallBase mgr = new CallBase(_conn);

        String req_no = req.getString("MSG.REQ_NO","");
        String tx_id = req.getString("MSG.PARAM1","");
        String msg_cd = req.getString("MSG_CD","");


        String[] segments = Env.getList("kcb.segment_" + tx_id);

//        LogMgr.debug(Arrays.toString(segments));

        // ???????????? ????????? ?????? ?????? ?????? ????????????
        if( segments == null || segments.length == 0 )
            return mgr.doKCB(req);


        int item_cnt = segments.length;

        int[] tn = new int[item_cnt];                // ?????????
        int[] rn = new int[item_cnt];                // ????????????

        // ???????????? ??????
        for(int i=0; i < item_cnt; i++) {

            // ????????? ?????? ??????
            if( segments[i].equals("100") ) {
                String[] score_cds = Env.getList("kcb.score_cd_100");
                if( score_cds != null && score_cds.length > 0 ) {
                    tn[i] = score_cds.length;
                    DataMapList dml = new DataMapList();
                    for(int j=0; j < score_cds.length; j++) {
                    	DataMap dm = new DataMap();
                        dm.put("SCORE_CD", score_cds[j]);
                        dml.add(dm);
                    }
                    req.put("DATA100", dml);
                }
            }
            // CPS ?????? ??????
            else if( segments[i].equals("103") ) {
                String[] cps_cds = Env.getList("kcb." + msg_cd +".code");

                if( cps_cds != null && cps_cds.length > 0 ) {
                    tn[i] = cps_cds.length;
                    DataMapList dml = new DataMapList();
                    for(int j=0; j < cps_cds.length; j++) {
                    	DataMap dm = new DataMap();
                        dm.put("CODE", cps_cds[j]);
                        dml.add(dm);
                    }
                    req.put("DATA103", dml);
                }
            }
            else
                tn[i] = req.getInt("DATA" + segments[i] + "_REQ", 0);

            rn[i] = 0;
        }

        String next_exist = "N";
        String sign_no = "000000000000";    // ????????????
        int req_cnt = 0;

        DataMap res = new DataMap();


        do {

            req.put("REQ_CNT", req_cnt);
            req.put("SIGN_NO", sign_no);

            // ??????????????? ??????
            kcbSetCount(req, tn, rn, segments);


            // ?????? ?????????
            res = mgr.doKCB(req);

            int result = res.getInt("MSG.RESULT");
            if( result == 0 )
                return res;


            // ?????????/???????????? ?????????
            kcbGetCount(res, req_no, req_cnt, tn, rn, segments);


            sign_no = res.getString("SIGN_NO","");
            next_exist = res.getString("NEXT_EXIST","");

            req_cnt ++;

        } while( next_exist.equalsIgnoreCase("Y") );


        return res;
    }


    void kcbSetCount(DataMap req, int[] tn, int[] rn, String[] segments) {
        for(int i=0; i < segments.length; i++) {

            req.put("DATA" + segments[i] + "_CNT", rn[i]);

            int req_cnt = 0;

            if( tn[i] == 0 )
                req_cnt = 99;
            else if( tn[i] > rn[i] ) {
                req_cnt = tn[i] - rn[i];
            }

            req.put("DATA" + segments[i] + "_REQ", req_cnt);
        }
    }


    boolean kcbGetCount(DataMap res, String req_no, int req_cnt, int[] tn, int[] rn, String[] segments) {

        // ?????? ????????? ????????? ?????????
        if( req_cnt == 0 ) {

            for(int i=0; i < segments.length; i++) {

                // ???????????? ?????? ???????????? ?????? ?????? ????????? ???????????? ?????? (?????????????????? ??????)
                if( tn[i] > 0 )
                    continue;

                int total = res.getInt("DATA" + segments[i] + "_TOT");

                // ?????? ???????????? ????????? ?????? 
                if( total == 0 )
                    continue;

                tn[i] = total;
            }
        }


        for(int i=0; i < segments.length; i++) {

            int res_cnt = res.getInt("DATA" + segments[i] + "_RES");

            if( res_cnt == 0 )
                continue;

            rn[i] += res_cnt;
        }

        return true;
    }



}
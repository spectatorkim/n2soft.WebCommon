package test;

import com.n2soft.common.LogMgr;
import com.n2soft.common.StringMap;
import com.n2soft.msg.CallMgr;

public class Test {

	public static void main(String[] args) {
		CallMgr mgr = new CallMgr();
		StringMap req = new StringMap();

		req.put("MSG_CD", "A9000");
		req.put("D_CUST_NM", "테스트");
		req.put("D_RES_CNT", 1);
		req.put("DATA","D_RESISSUENO",0,"123456");
		req.put("DATA","D_RES_SUB_CNT",0,1);
		req.put("DATA","DATA",0,"D_RESPAYMONTH",0,"202001");
		req.put("DATA","DATA",0,"D_RESINCOMESLTCPAYAMT",0,5000000);
		
		req.put("H_GRAM_RES", "정상확인");
		req.put("H_GRAM_RES_CD", "0000");

		StringMap res = mgr.doMsg(req);

		LogMgr.debug(res.toString(true));
	}

}

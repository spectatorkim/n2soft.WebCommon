package com.n2soft.msg;

import java.io.File;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Set;

import com.n2soft.common.Env;
import com.n2soft.common.LogMgr;
import com.n2soft.common.StringMap;
import com.n2soft.common.UtilMgr;

public class MsgBase {

	// Constants
	public static final boolean _REQUEST = false;
	public static final boolean _RESPONSE = true;

	public static final boolean MODE_CLIENT = false; // 클라이언트 모드 (요청전문송신 -> 응답전문수신)
	public static final boolean MODE_SERVER = true; // 서버 모드 (요청전문수신 -> 응답전문송신)

	// 전문환경설정파일
	private static String msg_config_path = null;
	private static String msg_config_prefix = Env.get("system.msg.config_prefix", "nTreeMsg");

	protected static String cypher_key = Env.get("system.msg.cypher_key", "N2SOFT00");
	protected static boolean b_use_database = Env.get("system.msg.use_database", "Y").equalsIgnoreCase("Y");

	// 전문양식
	protected static HashMap<String, _msg> msgs = null;
	protected static int msg_cnt = 0;

	// 전문호출 정보
	protected static HashMap<String, _call> calls = null;
	protected static int call_cnt = 0;

	private static boolean msg_loaded = false;
	protected static boolean debug = true;

	protected synchronized static void init() {
		loadMsg();
	}

	public static void reset() {
		msg_loaded = false;

		loadMsg();
	}

	public static void setDebug(boolean _debug) {
		debug = _debug;
	}

	protected synchronized static void loadMsg() {
		if( msg_loaded )
			return;

		msgs = new HashMap<String, _msg>();
		msg_cnt = 0;

        String ntree_home = System.getProperty("ntree.home");
		msg_config_path = ntree_home + "/config/";

		File d = new File(msg_config_path);
		File[] fl = d.listFiles();

		for(int i = 0; i < fl.length; i++) {
			if( fl[i].isDirectory() )
				continue;

			String filename = fl[i].getName();
			if( filename.startsWith(msg_config_prefix) && filename.endsWith(".xml") )
				loadMsg(filename);
		}

		if( msg_cnt == 0 ) {
			LogMgr.error("MsgBase load failed...");
			return;
		}

		// 전문호출정보
		calls = new HashMap<String, _call>();
		call_cnt = 0;

		loadCall(msg_config_path + "nTreeCall.xml");

		msg_loaded = true;
	}

	protected static void loadMsg(String config_file) {

		if( debug )
			LogMgr.debug("MsgBase loading - " + config_file + " ...");

		String fs = System.getProperty("file.separator");
		if( !msg_config_path.endsWith(fs) )
			msg_config_path += fs;

		// 전문레이아웃 XML 로드
		StringMap data = UtilMgr.loadXML(msg_config_path + config_file);

//		if( debug )
//			System.out.println(data.toString(true));

		int cnt = data.getInt("msg.#count");

		for(int i = 0; i < cnt; i++) {
			String msg_prefix = "msg" + ((i > 0) ? "[" + i + "]" : "");

			MsgBase._msg msg = new MsgBase().new _msg();

			msg.unit = new _unit[2];

			// 전문 기본정보
			msg.id = data.get(msg_prefix + ".id", "");
			msg.head_id = data.get(msg_prefix + ".head", "");
			msg.name = data.get(msg_prefix + ".name", "");
			msg.param = data.get(msg_prefix + ".param", "");

			for(int j = 0; j < 2; j++) {

				String unit_prefix = msg_prefix + ((j == 0) ? ".input" : ".output");

				MsgBase._unit unit = new MsgBase().new _unit();

				unit.items = data.getInt(unit_prefix + ".item.#count");

				if( unit.items == 0 && data.get(unit_prefix + ".item.id", "").length() > 0 )
					unit.items = 1;

				// 저장 테이블
				unit.table = data.get(unit_prefix + ".table", "");
				unit.param = data.get(unit_prefix + ".param", "");

				if( unit.items > 0 )
					unit.item = new _item[unit.items];

				int max_id_length1 = 0;

				for(int k = 0; k < unit.items; k++) {
					String item1_prefix = unit_prefix + ".item" + ((k > 0) ? "[" + k + "]" : "");

					MsgBase._item item1 = new MsgBase().new _item();

					item1.id = data.get(item1_prefix + ".id", data.get(item1_prefix + ".group", ""));
					item1.name = data.get(item1_prefix + ".name", "");
					item1.count = data.get(item1_prefix + ".count", "");
					item1.is_group = (item1.count.length() > 0);

					if( item1.id.length() > max_id_length1 )
						max_id_length1 = item1.id.length();

					if( item1.is_group ) {
						item1.times = data.getInt(item1_prefix + ".times");
						item1.table = data.get(item1_prefix + ".table", "");
						item1.field = data.get(item1_prefix + ".field", ""); // Sequence Column

						item1.items = data.getInt(item1_prefix + ".item.#count");
						item1.item = new _item[item1.items];

						int max_id_length2 = 0;

						for(int l = 0; l < item1.items; l++) {
							String item2_prefix = item1_prefix + ".item" + ((l > 0) ? "[" + l + "]" : "");

							MsgBase._item item2 = new MsgBase().new _item();

							item2.id = data.get(item2_prefix + ".id", data.get(item2_prefix + ".group", ""));
							item2.name = data.get(item2_prefix + ".name", "");
							item2.count = data.get(item2_prefix + ".count", "");
							item2.is_group = (item2.count.length() > 0);

							if( item2.id.length() > max_id_length2 )
								max_id_length2 = item2.id.length();

							if( item2.is_group ) {
								item2.times = data.getInt(item2_prefix + ".times");
								item2.table = data.get(item2_prefix + ".table", "");
								item2.field = data.get(item2_prefix + ".field", ""); // Sequence Column

								item2.items = data.getInt(item2_prefix + ".item.#count");
								item2.item = new _item[item2.items];

								int max_id_length3 = 0;

								for(int m = 0; m < item2.items; m++) {
									String item3_prefix = item2_prefix + ".item" + ((m > 0) ? "[" + m + "]" : "");

									MsgBase._item item3 = new MsgBase().new _item();

									item3.is_group = false;
									item3.id = data.get(item3_prefix + ".id", "");
									item3.name = data.get(item3_prefix + ".name", "");
									item3.length = data.getInt(item3_prefix + ".length");
									item3.type = data.get(item3_prefix + ".type", "C");
									item3.value_str = data.get(item3_prefix + ".value", "");
									item3.field = data.get(item3_prefix + ".field", "");

									if( item3.id.length() > max_id_length3 )
										max_id_length3 = item3.id.length();

									if( item3.value_str.length() > 1 && item3.value_str.substring(0, 1).equals("$") )
										item3.value = Env.get(item3.value_str.substring(1), "");
									else
										item3.value = item3.value_str;

									item2.item[m] = item3;
								}

								item2.max_id_length = max_id_length3;
							}
							else {
								item2.length = data.getInt(item2_prefix + ".length");
								item2.type = data.get(item2_prefix + ".type", "C");
								item2.value_str = data.get(item2_prefix + ".value", "");
								item2.field = data.get(item2_prefix + ".field", "");

								if( item2.value_str.length() > 1 && item2.value_str.substring(0, 1).equals("$") )
									item2.value = Env.get(item2.value_str.substring(1), "");
								else
									item2.value = item2.value_str;
							}

							item1.item[l] = item2;
						}

						item1.max_id_length = max_id_length2;
					}
					else {
						item1.length = data.getInt(item1_prefix + ".length");
						item1.type = data.get(item1_prefix + ".type", "C");
						item1.value_str = data.get(item1_prefix + ".value", "");
						item1.field = data.get(item1_prefix + ".field", "");

						if( item1.value_str.length() > 1 && item1.value_str.substring(0, 1).equals("$") )
							item1.value = Env.get(item1.value_str.substring(1), "");
						else
							item1.value = item1.value_str;
					}

					unit.item[k] = item1;
				}

				unit.max_id_length = max_id_length1;

				msg.unit[j] = unit;
			}

			msgs.put(msg.id, msg);
		}

		msg_cnt += cnt;
	}

	protected static void loadCall(String config_file) {

		if( debug )
			LogMgr.info("nTreeCall loading - " + config_file + " ...");

		// 전문호출정보 XML 로드
		StringMap data = UtilMgr.loadXML(config_file);

		if( debug )
			LogMgr.trace(data.toString(true));

		call_cnt = data.getInt("call.#count");

		for(int i = 0; i < call_cnt; i++) {
			String call_prefix = "call" + ((i > 0) ? "[" + i + "]" : "");

			_call call = new MsgBase().new _call();

			// 전문 기본정보
			call.msg_cd = data.get(call_prefix + ".msg_cd", "");
			call.msg_name = data.get(call_prefix + ".msg_name", "");
			call.msg_id = data.get(call_prefix + ".msg_id", "");
			call.host_id = data.get(call_prefix + ".host_id", "");
			call.param1 = data.get(call_prefix + ".param1", "");
			call.param2 = data.get(call_prefix + ".param2", "");
			call.param3 = data.get(call_prefix + ".param3", "");
			call.param4 = data.get(call_prefix + ".param4", "");
			call.param5 = data.get(call_prefix + ".param5", "");
			call.inq_mode = data.getInt(call_prefix + ".inq_mode", 0);
			call.telr_yn = data.get(call_prefix + ".telr_yn", "");
			call.fep_use_yn = data.get(call_prefix + ".fep_use_yn", "N");
			call.fep_chan_id = data.get(call_prefix + ".fep_chan_id", "");
			call.fep_intfc_id = data.get(call_prefix + ".fep_intfc_id", "");

			calls.put(call.msg_cd, call);
		}

	}

	protected static int getItemIndex(String msg_id, String item1_id, boolean req_mode) {

		init();

		_item[] item = msgs.get(msg_id).unit[req_mode? 1 : 0].item;

		for(int i = 0; i < item.length; i++)
			if( item1_id.compareToIgnoreCase(item[i].id) == 0 )
				return i;

		return -1;
	}

	protected static int getItemIndex(String msg_id, int item1_index, String item2_id, boolean req_mode) {

		init();

		_item[] item = msgs.get(msg_id).unit[req_mode? 1 : 0].item[item1_index].item;

		for(int i = 0; i < item.length; i++) {
			if( item2_id.compareToIgnoreCase(item[i].id) == 0 )
				return i;
		}

		return -1;
	}

	protected static int getItemIndex(String msg_id, String item1_id, String item2_id, boolean req_mode) {
		return getItemIndex(msg_id, getItemIndex(msg_id, item1_id, req_mode), item2_id, req_mode);
	}

	protected static int getItemIndex(String msg_id, int item1_index, int item2_index, String item3_id, boolean req_mode) {

		init();

		_item[] item = msgs.get(msg_id).unit[req_mode? 1 : 0].item[item1_index].item[item2_index].item;

		for(int i = 0; i < item.length; i++) {
			if( item3_id.compareToIgnoreCase(item[i].id) == 0 )
				return i;
		}

		return -1;
	}

	protected static int getItemIndex(String msg_id, int item1_index, String item2_id, String item3_id, boolean req_mode) {
		return getItemIndex(msg_id, item1_index, getItemIndex(msg_id, item1_index, item2_id, req_mode), item3_id, req_mode);
	}

	protected static int getItemIndex(String msg_id, String item1_id, int item2_index, String item3_id, boolean req_mode) {
		return getItemIndex(msg_id, getItemIndex(msg_id, item1_id, req_mode), item2_index, item3_id, req_mode);
	}

	protected static int getItemIndex(String msg_id, String item1_id, String item2_id, String item3_id, boolean req_mode) {
		return getItemIndex(msg_id, getItemIndex(msg_id, item1_id, req_mode), getItemIndex(msg_id, item1_id, item2_id, req_mode), item3_id, req_mode);
	}

	public static String[] getGroupItems(String msg_id, String group_item) {
		return getGroupItems(msg_id, group_item, _RESPONSE);
	}

	public static String[] getGroupItems(String msg_id, String group_item, boolean req_mode) {
		int group_index = getItemIndex(msg_id, group_item, req_mode);

		_item[] item = msgs.get(msg_id).unit[req_mode? 1 : 0].item;

		int sub_item_cnt = item[group_index].items;
		String[] sub_items = new String[sub_item_cnt];

		for(int i = 0; i < sub_item_cnt; i++)
			sub_items[i] = item[group_index].item[i].id;

		return sub_items;
	}

	public static String[] getMsgIds() {
		init();

		Set<String> keySet = msgs.keySet();
		String[] keys = new String[keySet.size()];

		keySet.toArray(keys);
		Arrays.sort(keys);

		return keys;
	}

	public static String getMsgName(String msg_id) {

		init();

		return msgs.get(msg_id).name;
	}

	public static _msg getMsg(String msg_id) {

		init();

		return msgs.get(msg_id);
	}

	public static _unit getUnit(String msg_id, boolean req_mode) {

		init();
		
		if( msgs.get(msg_id) == null )
			return null;

		return msgs.get(msg_id).unit[(req_mode == _REQUEST)? 0 : 1];
	}

	public static _call getCall(String msg_cd) {
		init();

		return calls.get(msg_cd);
	}

	public static boolean[] Hex2Bin(String hex) {
		String hex_table = "0123456789ABCDEF";
		boolean[] bin = new boolean[hex.length() * 4];

		for(int i = 0; i < hex.length(); i++) {
			int n = hex_table.indexOf(hex.charAt(i));

			if( n < 0 )
				n = 0;

			for(int j = 0; j < 4; j++)
				bin[i * 4 + j] = (n >> (3 - j)) % 2 == 1;
		}

		return bin;
	}

	public static String Bin2Hex(boolean[] bin) {
		StringBuffer sb = new StringBuffer();

		for(int i = 0; i < bin.length; i += 4) {
			int c = ((bin[i] ? 1 : 0) << 3) | ((bin[i + 1] ? 1 : 0) << 2) | ((bin[i + 2] ? 1 : 0) << 1) | (bin[i + 3] ? 1 : 0);
			sb.append(Integer.toHexString(c).toUpperCase());
		}

		return sb.toString();
	}

	
	public class _item {
		public String id;
		public String name;
		public int length;
		public String type;
		public String value;
		public String value_str;

		public boolean is_group;
		public String count;
		public int times;

		public String table; // Database Table
		public String field; // Database Column

		public int items;
		public _item[] item;

		public int max_id_length;
		public boolean b_used = true;
	}

	public class _unit {
		public String msg_id;
		public String table;

		public int items;
		public _item[] item;

		public String param;

		public int max_id_length;
	}

	public class _msg {
		public String id;
		public String head_id;
		public String name;
		
		public String param;

		public _unit[] unit;
	}

	public class _call {
		public String msg_cd;
		public String msg_name;
		public String msg_id;
		public String host_id;
		public String param1;
		public String param2;
		public String param3;
		public String param4;
		public String param5;
		public int inq_mode;
		public String telr_yn;
		public String fep_use_yn;
		public String fep_chan_id;
		public String fep_intfc_id;
	}


}

package com.n2soft.msg;

import java.sql.Connection;

import com.n2soft.common.DataMap;
import com.n2soft.common.DataMapList;
import com.n2soft.common.Env;
import com.n2soft.common.LogMgr;
import com.n2soft.common.SqlMgr;
import com.n2soft.common.StringList;
import com.n2soft.common.UtilMgr;
import com.n2soft.crypto.SEED;

public class MsgUnit extends MsgBase {

	private String m_msg_id = null;
	private boolean m_req_mode = MsgBase._REQUEST;
	private MsgBase._unit m_unit = null;
	private DataMap m_data = null;

	public MsgUnit(String msg_id, boolean req_mode) {
		setUnit(msg_id, req_mode);
	}

	public MsgUnit(String msg_id, boolean req_mode, String msg) {
		if( setUnit(msg_id, req_mode) )
			parse(msg);
	}

	public boolean setUnit(String msg_id, boolean req_mode) {

		this.m_msg_id = msg_id;
		this.m_req_mode = req_mode;
		this.m_unit = MsgBase.getMsg(msg_id).unit[req_mode? 1 : 0];

		m_data = new DataMap();

		return true;
	}


	public int setMsg(String msg) {
		return parse(msg);
	}

	public int setMsg(String msg, int start_index) {
		return parse(msg, start_index);
	}



	public String toString(String charset) {
		return UtilMgr.toString(UtilMgr.getBytes(toString()), charset);
	}

	public String toString() {
		StringBuffer msg_sb = new StringBuffer();
		StringBuffer log_sb = new StringBuffer();

		if( debug ) {
			log_sb.append("=================================================== [").append(m_msg_id).append("][").append((m_req_mode == _REQUEST) ? "REQUEST" : "RESPONSE").append("] ==");
			LogMgr.debug(log_sb.toString());
		}

		msg_sb.append(toString(m_unit.item, m_data, 0, -1));

		return msg_sb.toString();
	}

	private String toString(MsgBase._item[] item, DataMap data, int level, int index) {
		StringBuffer msg_sb = new StringBuffer();
		StringBuffer log_sb = new StringBuffer();

		if( item == null )
			return msg_sb.toString();

		for(int i = 0; i < item.length; i++) {

			if( !item[i].b_used )
				continue;

			Object value = data.get(item[i].id); 

			if( !item[i].is_group ) {
				
				if( value == null )
					value = item[i].value;

				msg_sb.append(format(value+"", item[i].length, item[i].type));

				if( debug )
					log_sb.append(UtilMgr.get_filler(level, " ")).append((index >= 0) ? ((i == 0) ? UtilMgr.msg_string((index + 1) + ":", 4, false) : "    ") : "").append(item[i].id).append(UtilMgr.get_filler(item[i].max_id_length - item[i].id.length(), " ")).append(" = [").append(value).append("]\n");
			}
			else {
				DataMapList dml = (DataMapList)value;

				if( value == null || dml.size() == 0 )
					continue;

				if( debug )
					log_sb.append(UtilMgr.get_filler(level*4, " ")).append((index >= 0 ) ? ((i == 0) ? UtilMgr.msg_string((index + 1) + ":", 4, false) : "    ") : "").append(item[i].id).append(UtilMgr.get_filler(item[i].max_id_length - item[i].id.length(), " ")).append(" = (").append(dml.size()).append(")\n");

				for(int n = 0; n < dml.size(); n++) {
					DataMap dm = dml.get(n);

					for(int j = 0; j < item[i].items; j++)
						msg_sb.append(toString(item[i].item, dm, level+1, n));
				}

			}

		}
		
		return msg_sb.toString();
	}



	public int parse(String msg) {
		return parse(msg, 0);
	}

	public int parse(String msg, int start_index) {

		StringBuffer log_sb = new StringBuffer();
		int cur_index = start_index;

		if( debug ) {
			log_sb.append("=================================================== [").append(m_msg_id).append("][").append((m_req_mode == _REQUEST) ? "REQUEST" : "RESPONSE").append("] ==\n");
			LogMgr.debug(log_sb.toString());
		}

		m_data = parse(m_unit.item, msg, cur_index, 0, -1);

		return cur_index;
	}


	public DataMap parse(MsgBase._item[] item, String msg, int start_index, int level, int data_index) {

		DataMap data = new DataMap();
		
		if( item == null )
			return data;

		StringBuffer log_sb = new StringBuffer();
		int msg_len = UtilMgr.length(msg);
		int cur_index = start_index;

		for(int i = 0; i < item.length; i++) {

			if( !item[i].b_used )
				continue;

			// 일반아이템
			if( !item[i].is_group ) {
				if( cur_index + item[i].length >= msg_len ) {
					String value = UtilMgr.substring(msg, cur_index, msg_len);
					data.put(item[i].id, value);

					if( debug ) {
						log_sb.append(UtilMgr.get_filler(level, " ")).append((data_index >= 0) ? ((i == 0) ? UtilMgr.msg_string((data_index + 1) + ":", 4, false) : "    ") : "").append(item[i].id).append(UtilMgr.get_filler(item[i].max_id_length - item[i].id.length(), " ")).append(" = [").append(value).append("]\n");
						LogMgr.debug(log_sb.toString());
					}

					return data;
				}
				else {
					String value = UtilMgr.substring(msg, cur_index, cur_index + item[i].length);
					data.put(item[i].id, value);
					cur_index += item[i].length;

					if( debug )
						log_sb.append(UtilMgr.get_filler(level, " ")).append((data_index >= 0) ? ((i == 0) ? UtilMgr.msg_string((data_index + 1) + ":", 4, false) : "    ") : "").append(item[i].id).append(UtilMgr.get_filler(item[i].max_id_length - item[i].id.length(), " ")).append(" = [").append(value).append("]\n");
				}
			}
			// 그룹아이템
			else {
				DataMapList dml = new DataMapList();
				data.put(item[i].id, dml);

				int count = 0;
				int times = item[i].times;

				if( item[i].count.length() > 0 ) {

					// 앞의 다른 항목의 값을 참조하는 경우
					if( item[i].count.charAt(0) == '#' && item[i].count.length() > 1 ) {
						String count_item = item[i].count.substring(1);
						int multi = 1;

						// 카운트에 일정배수가 곱해지는 경우
						if( count_item.contains("*") ) {
							multi = UtilMgr.to_int(count_item.substring(count_item.indexOf("*") + 1));
							count_item = count_item.substring(0, count_item.indexOf("*"));
						}

						if( count_item.length() > 0 )
							count = UtilMgr.to_int(data.getString(count_item)) * multi;
					}
					// 상수값이 지정된 경우
					else
						count = UtilMgr.to_int(item[i].count);
				}

				if( debug )
					log_sb.append(UtilMgr.get_filler(level*4, " ")).append((data_index >= 0 ) ? ((i == 0) ? UtilMgr.msg_string((data_index + 1) + ":", 4, false) : "    ") : "").append(item[i].id).append(UtilMgr.get_filler(item[i].max_id_length - item[i].id.length(), " ")).append(" = (").append(count).append(")\n");

				// 고정 반복횟수가 지정되지 았거나 카운트가 더 큰 경우 카운트를 반복수로 사용
				if( times == 0 || count > times )
					times = count;

				for(int n = 0; n < times; n++) {
					DataMap dm = parse(item[i].item, msg, cur_index, level+1, n);
					dml.add(dm);
				}

			}

		}

		return data;
	}



	public int getLength() {
		if( m_unit == null )
			return 0;

		return getLength(m_unit.item, m_data);
	}

	
	private int getLength(MsgBase._item[] item, DataMap data) {
		int length = 0;
		
		if( item == null )
			return 0;

		for(int i = 0; i < item.length; i++) {

			if( !item[i].b_used )
				continue;

			if( !item[i].is_group ) {
				length += item[i].length;
			}
			else {
				DataMapList dml = (DataMapList)data.get(item[i].id);

				if( dml != null && dml.size() > 0 ) {
					for(int n=0; n < dml.size(); n++)
						length += getLength(item[i].item, dml.get(n));
				}
			}

		}

		return length;
	}



	public void set(int item1_index, String value) {
		if( m_unit == null || item1_index < 0 )
			return;

		if( m_unit.items == 0 || item1_index >= m_unit.items )
			return;

		if( !m_unit.item[item1_index].b_used )
			return;

		m_data.put(m_unit.item[item1_index].id, value);
	}

	public void set(String item1_id, String value) {
		if( m_unit == null || m_unit.items == 0 )
			return;

		m_data.put(item1_id, value);
	}

	public void set(String item1_id, int value) {
		if( m_unit == null || m_unit.items == 0 )
			return;

		m_data.put(item1_id, value + "");
	}
	
	public void set(String item1_id, String item2_id, int data2_index, String value) {
		
	}


	public void set(DataMap map) {
		this.m_data = new DataMap(map);
	}


	// Level 1
	public Object get(int item1_index) {
		if( m_unit == null || item1_index < 0 )
			return null;

		if( m_unit.items == 0 || item1_index >= m_unit.items )
			return null;

		if( !m_unit.item[item1_index].b_used )
			return null;

		return m_data.get(m_unit.item[item1_index].id);
	}

	public Object get(String item1_id) {
		return m_data.get(item1_id);
	}


	public int getInt(int item1_index) {
		return UtilMgr.to_int(get(item1_index) + "");
	}

	public int getInt(String item1_id) {
		return UtilMgr.to_int(get(item1_id) + "");
	}


	public DataMap get() {
		return new DataMap(m_data);
	}

	public DataMap get(DataMap data) {
		data.add(m_data);
		
		return data;
	}


	String format(String value, int length, String type) {

		if( value == null || value.length() == 0 ) {
			if( "N".equalsIgnoreCase(type) )
				return UtilMgr.get_filler(length, "0");
			else
				return UtilMgr.get_filler(length, " ");
		}

		if( "X".equalsIgnoreCase(type) )
			value = SEED.Encrypt(value, cypher_key);

		int l = UtilMgr.length(value);

		if( l > length ) {
			if( "N".equalsIgnoreCase(type) )
				value = UtilMgr.substring(value, l-length);
			else
				value = UtilMgr.substring(value, 0, length);
		}
		else if( l < length ) {
			if( "N".equalsIgnoreCase(type) )
				value = UtilMgr.get_filler(length-l, "0") + value;
			else
				value += UtilMgr.get_filler(length-l, " ");
		}
		
		return value;
	}

	String format(String data, String type) {

		if( data == null )
			data = "";

		data = UtilMgr.trim(data);

		if( "N".equalsIgnoreCase(type) ) {
			if( data.indexOf(".") >= 0 )
				return Float.toString(UtilMgr.to_float(data));
			else if( data.length() < 10 )
				return Integer.toString(UtilMgr.to_int(data));
			else
				return Long.toString(UtilMgr.to_long(data));
		}
		else if( "X".equalsIgnoreCase(type) )
			return SEED.Decrypt(data, cypher_key);

		data = data.replace('\'', '`');

		return data;
	}


	int getItemIndex(String item1_id) {
		return getItemIndex(m_msg_id, item1_id, m_req_mode);
	}


	public boolean getItemUsed(int item_index) {

		if( item_index < 0 )
			return false;

		return m_unit.item[item_index].b_used;
	}

	public boolean getItemUsed(String item) {
		return getItemUsed(getItemIndex(m_msg_id, item, m_req_mode));
	}

	public void setItemUsed(int item_index, boolean b_used) {

		if( item_index < 0 )
			return;

		m_unit.item[item_index].b_used = b_used;
	}

	public void setItemUsed(String item, boolean b_used) {
		setItemUsed(getItemIndex(m_msg_id, item, m_req_mode), b_used);
	}


	static String[] bitmap_items = { "CUST_GU", "RESID_NO", "INQ_CD", "ADMIN_NO", "MORE_YN", "REQ_CNT", "CUST_NM", "SIGN_NO", "SERIAL_NO", "AGREE_YN", "EX_FLAG", "BLANK" };

	public void setBitmap(String bitmap) {

		// 빈 비트맵 무시
		if( "0000000000000000".equals(bitmap) )
			return;

		boolean[] used = Hex2Bin(bitmap);

		for(int i = 0; i < used.length; i++) {

			if( i < bitmap_items.length ) {
				setItemUsed(bitmap_items[i], used[i]);
				continue;
			}

			String prefix = "DATA" + UtilMgr.msg_int(i + 1, 2, true, true);

			setItemUsed(prefix + "_CNT", used[i]);
			setItemUsed(prefix + "_REQ", used[i]);
			setItemUsed(prefix + "_TOT", used[i]);
			setItemUsed(prefix + "_RES", used[i]);
			setItemUsed(prefix, used[i]);
		}

	}


	public boolean toDatabase(String req_no) {
		return toDatabase((Connection) null, req_no);
	}

	public boolean toDatabase(Connection conn, String req_no) {

		boolean is_new = (conn == null);
		if( is_new )
			conn = SqlMgr.getDBConnection();

		StringList vl = new StringList();

		String table = m_unit.table;

		if( table.length() > 0 ) {

			StringBuffer fields = new StringBuffer();
			StringBuffer values = new StringBuffer();

			for(int i = 0; i < m_unit.items; i++) {

				if( !m_unit.item[i].b_used || m_unit.item[i].is_group )
					continue;

				String field = m_unit.item[i].field;
				String value = format(get(i) + "", m_unit.item[i].type);

				if( field.length() > 0 ) {
					if( m_unit.item[i].type.equalsIgnoreCase("S") )
						fields.append(",FN_ENC(").append(field).append(")");
					else
						fields.append(",").append(field);
					values.append(",?");

					vl.add(value);
				}

			}

			int req_cnt = SqlMgr.getFieldOneInt(conn, "select count(*) from  " + table + " WHERE REQ_NO = " + req_no);
			if( req_cnt == 0 )
				SqlMgr.doQuery(conn, "insert into " + table + " (REQ_NO" + fields + ") values (" + req_no + values + ")", vl);
		}

		String sql = "";

		for(int i = 0; i < m_unit.items; i++) {
			MsgBase._item item = m_unit.item[i];

			table = item.table;

			if( !item.b_used || !item.is_group || table.length() == 0 )
				continue;

			DataMapList dml = m_data.getList(item.id);

			if( dml != null && dml.size() > 0 ) {

				int max_seq = 1;
				if( item.field.length() > 0 )
					max_seq = SqlMgr.getFieldOneInt(conn, "select max(" + item.field + ") from " + table + " where REQ_NO = " + req_no) + 1;

				vl.clear();
	
				String fields = "";
				String values = "";
	
				if( item.field.length() > 0 ) {
					fields += "," + item.field;
					values += ",?";
				}

				for(int j = 0; j < item.items; j++) {
					String field = item.item[j].field;
	
					if( field.length() > 0 ) {
						if( item.item[j].type.equalsIgnoreCase("S") )
							fields += ",FN_ENC(" + field + ")";
						else
							fields += "," + field;
						values += ",?";
					}

				}

				sql = "insert into " + table + " (REQ_NO" + fields + ") values (" + req_no + values + ")";
	
				for(int n = 0; n < dml.size(); n++) {
					DataMap dm = dml.get(n);
	
					if( item.field.length() > 0 )
						vl.add(max_seq + "");
	
					for(int j = 0; j < item.items; j++) {
						String field = item.item[j].field;
	
						if( field.length() > 0 ) {
							String value = format(dm.get(item.item[j].id)+"", item.item[j].type);
							vl.add(value);
						}
					}
	
					max_seq++;
				}

				if( !SqlMgr.doBatchQuery(conn, sql, vl) ) {
					if( is_new )
						SqlMgr.close(conn);
					return false;
				}
			}
		}

		if( is_new )
			SqlMgr.close(conn);

		return true;
	}

	public String toSql(boolean b_drop) {
		String sql = "";
		String comments = "";
		String table = m_unit.table;

		String number = "NUMBER";
		String varchar = "VARCHAR2";

		String db_type = Env.get("database.type", "oracle");

		if( db_type.equalsIgnoreCase("mssql") ) {
			number = "NUMERIC";
			varchar = "VARCHAR";
		}

		if( table.length() > 0 ) {

			if( b_drop )
				sql += "DROP TABLE " + table + ";\r\n";

			sql += "CREATE TABLE " + table + " (\r\n";
			sql += "	REQ_NO		" + number + " NOT NULL,\r\n";

			if( db_type.equals("oracle") ) {
				comments += "COMMENT ON TABLE " + table + " IS '" + getMsgName(m_msg_id) + "';\r\n";
				comments += "COMMENT ON COLUMN " + table + ".REQ_NO IS '요청번호';\r\n";
			}
			else if( db_type.equals("mssql") ) {
				comments += "exec sp_addextendedproperty 'MS_Description', '" + getMsgName(m_msg_id) + "', 'user', 'dbo', 'table', '" + table + "';\r\n";
				comments += "exec sp_addextendedproperty 'MS_Description', '요청번호', 'user', 'dbo', 'table', '" + table + "', 'column', 'REQ_NO';\r\n";
			}

			for(int i = 0; i < m_unit.items; i++) {

				if( m_unit.item[i].is_group )
					continue;

				String field = m_unit.item[i].field;
				int length = m_unit.item[i].length;

				if( field.length() > 0 ) {
					sql += "	" + field + "		";

					if( m_unit.item[i].type.equalsIgnoreCase("N") )
						sql += number + "(" + length + "),\r\n";
					else if( m_unit.item[i].type.equalsIgnoreCase("S") || m_unit.item[i].type.equalsIgnoreCase("T") )
						sql += varchar + "(64),\r\n";
					else if( m_unit.item[i].type.equalsIgnoreCase("A") || m_unit.item[i].type.equalsIgnoreCase("E") )
						sql += varchar + "(300),\r\n";
					else if( m_unit.item[i].type.equals("K") && db_type.equals("oracle") )
						sql += varchar + "(" + length + " CHAR),\r\n";
					else
						sql += varchar + "(" + length + "),\r\n";

					if( db_type.equals("oracle") )
						comments += "COMMENT ON COLUMN " + table + "." + field + " IS '" + m_unit.item[i].name + "';\r\n";
					else if( db_type.equals("mssql") )
						comments += "exec sp_addextendedproperty 'MS_Description', '" + m_unit.item[i].name + "', 'user', 'dbo', 'table', '" + table + "', 'column', '" + field + "';\r\n";
				}

			}

			sql += "	CONSTRAINT PK_" + table + " PRIMARY KEY (REQ_NO)\r\n);\r\n\r\n";
			sql += comments + "\r\n\r\n";
		}

		for(int i = 0; i < m_unit.items; i++) {

			if( !m_unit.item[i].is_group || m_unit.item[i].table.length() == 0 )
				continue;

			table = m_unit.item[i].table;
			String seq_field = m_unit.item[i].field;

			if( b_drop )
				sql += "DROP TABLE " + table + ";\r\n";

			sql += "CREATE TABLE " + table + " (\r\n";
			sql += "	REQ_NO		" + number + " NOT NULL,\r\n";
			if( seq_field.length() > 0 )
				sql += "	" + seq_field + "		" + number + " NOT NULL,\r\n";

			String name = m_unit.item[i].name;
			if( name == null || name.length() == 0 )
				name = getMsgName(m_msg_id);

			if( db_type.equals("oracle") ) {
				comments = "COMMENT ON TABLE " + table + " IS '" + name + "';\r\n";
				comments += "COMMENT ON COLUMN " + table + ".REQ_NO IS '요청번호';\r\n";
				if( seq_field.length() > 0 )
					comments += "COMMENT ON COLUMN " + table + "." + seq_field + " IS '일련번호';\r\n";
			}
			else if( db_type.equals("mssql") ) {
				comments = "exec sp_addextendedproperty 'MS_Description', '" + name + "', 'user', 'dbo', 'table', '" + table + "';\r\n";
				comments += "exec sp_addextendedproperty 'MS_Description', '요청번호', 'user', 'dbo', 'table', '" + table + "', 'column', 'REQ_NO';\r\n";
				if( seq_field.length() > 0 )
					comments += "exec sp_addextendedproperty 'MS_Description', '일련번호', 'user', 'dbo', 'table', '" + table + "', 'column', '" + seq_field + "';\r\n";
			}

			for(int j = 0; j < m_unit.item[i].items; j++) {
				String field = m_unit.item[i].item[j].field;
				int length = m_unit.item[i].item[j].length;

				if( field.length() > 0 && !m_unit.item[i].item[j].is_group ) {
					sql += "	" + field + "		";
					String type = m_unit.item[i].item[j].type;

					if( type.equalsIgnoreCase("N") )
						sql += number + "(" + length + "),\r\n";
					else if( type.equalsIgnoreCase("S") || type.equalsIgnoreCase("T") )
						sql += varchar + "(64),\r\n";
					else if( type.equalsIgnoreCase("A") || type.equalsIgnoreCase("E") )
						sql += varchar + "(300),\r\n";
					else if( type.equalsIgnoreCase("K") && db_type.equals("oracle") )
						sql += varchar + "(" + length + " CHAR),\r\n";
					else
						sql += varchar + "(" + length + "),\r\n";

					if( db_type.equals("oracle") )
						comments += "COMMENT ON COLUMN " + table + "." + field + " IS '" + m_unit.item[i].item[j].name + "';\r\n";
					else if( db_type.equals("mssql") )
						comments += "exec sp_addextendedproperty 'MS_Description', '" + m_unit.item[i].item[j].name + "', 'user', 'dbo', 'table', '" + table + "', 'column', '" + field + "';\r\n";
				}

			}

			if( seq_field.length() > 0 )
				sql += "	CONSTRAINT PK_" + table + " PRIMARY KEY (REQ_NO," + seq_field + ")\r\n);\r\n\r\n";
			else
				sql += "	CONSTRAINT PK_" + table + " PRIMARY KEY (REQ_NO)\r\n);\r\n\r\n";
			sql += comments + "\r\n\r\n";
		}

		return sql;
	}

	public String toXML() {
		StringBuffer sb = new StringBuffer();

		int id_max1 = 0;
		int name_max1 = 0;
		int length_max1 = 0;

		int id_max2 = 0;
		int name_max2 = 0;
		int length_max2 = 0;

		int id_max3 = 0;
		int name_max3 = 0;
		int length_max3 = 0;

		for(int i = 0; i < m_unit.items; i++) {
			_item item1 = m_unit.item[i];

			if( item1.id.length() > id_max1 )
				id_max1 = UtilMgr.length(item1.id);

			if( UtilMgr.length(item1.name) > name_max1 )
				name_max1 = UtilMgr.length(item1.name);

			if( item1.is_group ) {

				for(int j = 0; j < item1.items; j++) {
					_item item2 = item1.item[j];

					if( item2.id.length() > id_max2 )
						id_max2 = UtilMgr.length(item2.id);

					if( UtilMgr.length(item2.name) > name_max2 )
						name_max2 = UtilMgr.length(item2.name);

					if( item2.is_group ) {

						for(int k = 0; k < item2.items; k++) {
							_item item3 = item2.item[k];

							if( item3.id.length() > id_max3 )
								id_max3 = UtilMgr.length(item3.id);

							if( UtilMgr.length(item3.name) > name_max3 )
								name_max3 = UtilMgr.length(item3.name);

							if( (item3.length + "").length() > length_max3 )
								length_max3 = (item3.length + "").length();
						}

					}
					else {
						if( (item2.length + "").length() > length_max2 )
							length_max2 = (item2.length + "").length();
					}

				}

			}
			else {
				if( (item1.length + "").length() > length_max1 )
					length_max1 = (item1.length + "").length();
			}

		}

		for(int i = 0; i < m_unit.items; i++) {
			_item item1 = m_unit.item[i];

			sb.append("\t\t\t<item id=").append(UtilMgr._msg_string("\"" + item1.id + "\"", id_max1 + 2, false)).append(" name=").append(UtilMgr._msg_string("\"" + item1.name + "\"", name_max1 + 2, false));

			if( item1.is_group ) {

				sb.append(" count=\"").append(item1.count).append("\"");
				if( item1.times > 0 )
					sb.append(" times=\"").append(item1.times).append("\"");
				if( item1.table.length() > 0 )
					sb.append(" table=\"").append(item1.table).append("\"");
				if( item1.field.length() > 0 )
					sb.append(" field=\"").append(item1.field).append("\"");
				sb.append(" >\n");

				for(int j = 0; j < item1.items; j++) {
					_item item2 = item1.item[j];

					sb.append("\t\t\t\t<item id=").append(UtilMgr._msg_string("\"" + item2.id + "\"", id_max2 + 2, false)).append(" name=").append(UtilMgr._msg_string("\"" + item2.name + "\"", name_max2 + 2, false));

					if( item2.is_group ) {

						sb.append(" count=\"").append(item2.count).append("\"");
						if( item2.times > 0 )
							sb.append(" times=\"").append(item2.times).append("\"");
						sb.append(" >\n");

						for(int k = 0; k < item2.items; k++) {
							_item item3 = item2.item[k];

							sb.append("\t\t\t\t\t<item id=").append(UtilMgr._msg_string("\"" + item3.id + "\"", id_max3 + 2, false)).append(" name=").append(UtilMgr._msg_string("\"" + item3.name + "\"", name_max3 + 2, false)).append(" length=")
									.append(UtilMgr._msg_string("\"" + item3.length + "\"", length_max3 + 2, false)).append(" type=\"").append(item3.type).append("\"");
							if( item3.value_str.length() > 0 )
								sb.append(" value=\"").append(item3.value_str).append("\"");
							sb.append(" />\n");
						}

						sb.append("\t\t\t\t</item>\n");
					}
					else {

						sb.append(" length=").append(UtilMgr._msg_string("\"" + item2.length + "\"", length_max2 + 2, false)).append(" type=\"").append(item2.type).append("\"");
						if( item2.field.length() > 0 )
							sb.append(" field=\"").append(item2.field).append("\"");
						if( item2.value_str.length() > 0 )
							sb.append(" value=\"").append(item2.value_str).append("\"");
						sb.append(" />\n");
					}

				}

				sb.append("\t\t\t</item>\n");
			}
			else {

				sb.append(" length=").append(UtilMgr._msg_string("\"" + item1.length + "\"", length_max1 + 2, false)).append(" type=\"").append(item1.type).append("\"");
				if( item1.field.length() > 0 )
					sb.append(" field=\"").append(item1.field).append("\"");
				if( item1.value_str.length() > 0 )
					sb.append(" value=\"").append(item1.value_str).append("\"");
				sb.append(" />\n");
			}

		}

		return sb.toString();
	}


}

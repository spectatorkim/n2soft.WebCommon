package com.n2soft.msg;

import java.sql.Connection;

import com.n2soft.common.DataMap;

public class MsgMgr extends MsgBase {

	private boolean m_service_mode = MODE_CLIENT; 	// Service Mode (Default: Request Mode)

	private _msg m_msg = null;
	private MsgUnit m_req_unit = null;
	private MsgUnit m_res_unit = null;


	// 기본은 요청모드
	public MsgMgr(String msg_id) {
		init(msg_id, _REQUEST);
	}

	public MsgMgr(String msg_id, boolean service_mode) {
		init(msg_id, service_mode);
	}

	// 기본 서비스모등니 클라이언트 모드인 경우 전문파싱은 응답모드
	public MsgMgr(String msg_id, String msg) {
		init(msg_id, _RESPONSE);
		setMsg(msg);
	}

	public MsgMgr(String msg_id, boolean service_mode, String msg) {
		init(msg_id, service_mode);
		setMsg(msg);
	}



	public void init(String msg_id, boolean service_mode) {
		super.init();

		m_msg = msgs.get(msg_id);
		m_service_mode = service_mode;
		m_req_unit = new MsgUnit(msg_id, _REQUEST);
		m_res_unit = new MsgUnit(msg_id, _RESPONSE);
	}


	public String getMsgId() {
		return m_msg.id;
	}

	public String getHeadId() {
		return m_msg.head_id;
	}


	public void setMsg(String msg) {
		// 클라이언트 모드 - 응답전문을 파싱, 서버 모드 - 요청전문을 파싱
		if( m_service_mode == MODE_CLIENT )
			m_res_unit.setMsg(msg);
		else
			m_req_unit.setMsg(msg);
	}

	public void setMsg(String msg, boolean req_mode) {
		if( req_mode == _REQUEST )
			m_req_unit.setMsg(msg);
		else
			m_res_unit.setMsg(msg);
	}

	public void setMsg(String msg, int start_index) {
		// 클라이언트 모드 - 응답전문을 파싱, 서버 모드 - 요청전문을 파싱
		if( m_service_mode == MODE_CLIENT )
			m_res_unit.setMsg(msg, start_index);
		else
			m_req_unit.setMsg(msg, start_index);
	}

	public void setMsg(String msg, boolean req_mode, int start_index) {
		if( req_mode == _REQUEST )
			m_req_unit.setMsg(msg, start_index);
		else
			m_res_unit.setMsg(msg, start_index);
	}


	public String toString() {
		return (m_service_mode == MODE_CLIENT) ? m_req_unit.toString() : m_res_unit.toString();
	}

	public String toString(String charset) {
		return (m_service_mode == MODE_CLIENT) ? m_req_unit.toString(charset) : m_res_unit.toString(charset);
	}

	public String toString(boolean req_mode) {
		return (req_mode == _REQUEST) ? m_req_unit.toString() : m_res_unit.toString();
	}

	public String toString(boolean req_mode, String charset) {
		return (req_mode == _REQUEST) ? m_req_unit.toString(charset) : m_res_unit.toString(charset);
	}


	public int getLength() {
		return (m_service_mode == MODE_CLIENT) ? m_req_unit.getLength() : m_res_unit.getLength();
	}

	public int getLength(boolean req_mode) {
		return (req_mode == _REQUEST) ? m_req_unit.getLength() : m_res_unit.getLength();
	}


	public void set(String item, String value) {
		if( m_service_mode == MODE_CLIENT )
			m_req_unit.set(item, value);
		else
			m_res_unit.set(item, value);
	}

	public void set(String item, String value, boolean req_mode) {
		if( req_mode == _REQUEST )
			m_req_unit.set(item, value);
		else
			m_res_unit.set(item, value);
	}

	public void set(String item, int value) {
		if( m_service_mode == MODE_CLIENT )
			m_req_unit.set(item, value);
		else
			m_res_unit.set(item, value);
	}

	public void set(String item, int value, boolean req_mode) {
		if( req_mode == _REQUEST )
			m_req_unit.set(item, value);
		else
			m_res_unit.set(item, value);
	}



	public void set(DataMap map) {
		if( m_service_mode == MODE_CLIENT )
			m_req_unit.set(map);
		else
			m_res_unit.set(map);
	}

	public void set(DataMap map, boolean req_mode) {
		if( req_mode == _REQUEST )
			m_req_unit.set(map);
		else
			m_res_unit.set(map);
	}


	public Object get(String item) {
		return (m_service_mode == MODE_CLIENT) ? m_res_unit.get(item) : m_req_unit.get(item);
	}

	public Object get(String item, boolean req_mode) {
		return (req_mode == _REQUEST) ? m_req_unit.get(item) : m_res_unit.get(item);
	}

	public int getInt(String item) {
		return (m_service_mode == MODE_CLIENT) ? m_res_unit.getInt(item) : m_req_unit.getInt(item);
	}

	public int getInt(String item, boolean req_mode) {
		return (req_mode == _REQUEST) ? m_req_unit.getInt(item) : m_res_unit.getInt(item);
	}

	
	public DataMap get() {
		return get(new DataMap());
	}

	public DataMap get(boolean req_mode) {
		return get(new DataMap(), req_mode);
	}

	public DataMap get(DataMap map) {
		return (m_service_mode == MODE_CLIENT) ? m_res_unit.get(map) : m_req_unit.get(map);
	}

	public DataMap get(DataMap map, boolean req_mode) {
		return (req_mode == _REQUEST) ? m_req_unit.get(map) : m_res_unit.get(map);
	}


	public void setBitmap(String bitmap) {
		if( m_service_mode == MODE_CLIENT )
			m_req_unit.setBitmap(bitmap);
		else
			m_res_unit.setBitmap(bitmap);
	}

	public void setBitmap(String bitmap, boolean req_mode) {
		if( req_mode == _REQUEST )
			m_req_unit.setBitmap(bitmap);
		else
			m_res_unit.setBitmap(bitmap);
	}


	public boolean getItemUsed(String item_id) {
		return (m_service_mode == MODE_CLIENT) ? m_req_unit.getItemUsed(item_id) : m_res_unit.getItemUsed(item_id);
	}

	public boolean getItemUsed(String item_id, boolean req_mode) {
		return (req_mode == _REQUEST) ? m_req_unit.getItemUsed(item_id) : m_res_unit.getItemUsed(item_id);
	}


	// Save to database table
	public boolean toDatabase(String req_no) {
		return toDatabase(null, req_no);
	}

	public boolean toDatabase(String req_no, boolean req_mode) {
		return toDatabase(null, req_no, req_mode);
	}

	public boolean toDatabase(Connection conn, String req_no) {
		return (m_service_mode == MODE_CLIENT) ? m_res_unit.toDatabase(conn, req_no) : m_req_unit.toDatabase(conn, req_no);
	}

	public boolean toDatabase(Connection conn, String req_no, boolean req_mode) {
		return (req_mode == _REQUEST) ? m_req_unit.toDatabase(conn, req_no) : m_res_unit.toDatabase(conn, req_no);
	}


	// Output Table DDL Query
	public String toSql(boolean b_drop) {
		return m_req_unit.toSql(b_drop) + m_res_unit.toSql(b_drop);
	}


	// Output nTreeMsg.xml
	public String toXml() {
		StringBuffer sb = new StringBuffer();

		sb.append("\t<msg id=\"").append(m_msg.id).append("\" name=\"").append(m_msg.name).append("\">\n");

		sb.append("\t\t<input");
		if( m_msg.unit[0].table.length() > 0 )
			sb.append(" table=\"").append(m_msg.unit[0].table).append("\"");
		sb.append(">\n");
		sb.append(m_req_unit.toXML());
		sb.append("\t\t</input>\n");

		sb.append("\t\t<output");
		if( m_msg.unit[1].table.length() > 0 )
			sb.append(" table=\"").append(m_msg.unit[1].table).append("\"");
		sb.append(">\n");
		sb.append(m_res_unit.toXML());
		sb.append("\t\t</output>\n");

		sb.append("\t</msg>\n");

		return sb.toString();
	}
}

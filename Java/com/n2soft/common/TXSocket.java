package com.n2soft.common;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.Socket;

import com.n2soft.crypto.SEED;



public class TXSocket {

    private String server = "localhost";
    private int port = 0;
    private int timeout = 60;
    private static boolean debug = true;

    private static final int BUFFER_SIZE = 4096;

    private Socket m_socket = null;
    private BufferedInputStream m_is = null;
    private BufferedOutputStream m_os = null;

	private static String msg_charset = Env.get("system.msg.charset", "EUC-KR");
    private static String error_msg = null;


    // 서버 접속정보로 초기화
    public TXSocket(final String server, final int port) {
        this.server = server;
        this.port = port;

        if( debug ) 
            LogMgr.debug("SocketMgr Initialized to " + server + ":" + port);
    }

    // 서버 접속정보/타임아웃시간으로 초기화
    public TXSocket(final String server, final int port, final int timeout) {
        this.server = server;
        this.port = port;
        this.timeout = timeout;

        if( debug )
            LogMgr.debug("SocketMgr Initialized to " + server + ":" + port + " (Timeout: " + timeout + " sec)");
    }

    // 기연결된 소켓으로 초기화
    public TXSocket(final Socket socket) {

        try {
            m_socket = socket;

            m_is = new BufferedInputStream(m_socket.getInputStream(), BUFFER_SIZE);
            m_os = new BufferedOutputStream(m_socket.getOutputStream(), BUFFER_SIZE);
        }
        catch( final IOException e ) {
            LogMgr.error(e.getMessage());
            error_msg = e.getMessage();
        }
    }

    // 서버 접속정보를 설정
    public void setServer(final String server, final int port) {
        this.server = server;
        this.port = port;
    }

    // 서버 접속정보/타임아웃시간을 설정
    public void setServer(final String server, final int port, final int timeout) {
        this.server = server;
        this.port = port;
        this.timeout = timeout;
    }

    // 서버접속 타임아웃 설정
    public void setTimeout(final int timeout) {
        this.timeout = timeout;
    }


    // 디버깅 모드 설정
    public void setDebug(final boolean _debug) {
        debug = _debug;
    }


    // 오류메시지 리턴
    public String getErrorMsg() {
        return error_msg;
    }


    public boolean connect() {
        return connect(30);        // Default Connection Timeout : 30 sec
    }

    // 소켓 연결
    public boolean connect(final int conn_timeout) {

        try {
            m_socket = new Socket();
            final InetSocketAddress addr = new InetSocketAddress(server, port);

            m_socket.connect(addr, conn_timeout*1000);
            m_socket.setSoTimeout(timeout * 1000);

            m_is = new BufferedInputStream(m_socket.getInputStream(), BUFFER_SIZE);
            m_os = new BufferedOutputStream(m_socket.getOutputStream(), BUFFER_SIZE);

            if( debug )
                LogMgr.debug("Connected " + m_socket.getLocalPort() + " to " + m_socket.getRemoteSocketAddress());
        }
        catch( final IOException e ) {
            LogMgr.error(e.getMessage());
            error_msg = e.getMessage();
            return false;
        }

        return true;
    }


    // 소켓 종료
    public void disconnect() {

        try {

            if( debug )
                LogMgr.debug("Disconnected " + m_socket.getLocalPort() + " from " + m_socket.getRemoteSocketAddress());

            if( m_is != null ) {
                m_is.close();
                m_is = null;
            }

            if( m_os != null ) {
                m_os.flush();
                m_os.close();
                m_os = null;
            }

            if( m_socket != null ) {
                m_socket.close();
                m_socket = null;
            }

        }
        catch( final IOException e ) {
            LogMgr.error(e.getMessage());
            error_msg = e.getMessage();
        }
    }


    // Write String
    public boolean write(final String send_msg) {
        return write(m_os, send_msg);
    }

    // Write Byte Array
    public boolean write(final byte[] bytes) {
        return write(m_os, bytes);
    }

    // Read String
    public String read() {
        return read(m_is);
    }

    // Read String with Length-Width
    public String read(final int wlen) {
        return read(m_is, wlen, false);
    }

    // Read String with Length-Width
    public String read(final int wlen, final boolean b_include) {
        return read(m_is, wlen, b_include);
    }


    // Read Byte Array
    public byte[] readBytes() {
        return readBytes(m_is);
    }

    // Read Byte Array with Length-Width
    public byte[] readBytes(final int wlen) {
        return readBytes(m_is, wlen, false);
    }

    // Read Byte Array with Length-Width
    public byte[] readBytes(final int wlen, final boolean b_include) {
        return readBytes(m_is, wlen, b_include);
    }

    // Read String in length
    public String readInLength(final int len) {
        return readInLength(m_is, len);
    }

    // Read Byte Array in length
    public byte[] readBytesInLength(final int len) {
        return readBytesInLength(m_is, len);
    }



    public String doIFSMsg(final String msg) {
        return doIFSMsg(msg, null);
    }

    public String doIFSMsg(final String msg, final String cypher_key) {

        if( debug )
            LogMgr.debug("SEND:[" + msg + "]");

        int head_len = UtilMgr.to_int(msg.substring(8, 16));
        String head_msg = UtilMgr.substring(msg, 0, head_len);        // 공통부 (비암호화)
        final String body_msg = UtilMgr.substring(msg, head_len);            // 데이터부 (암호화)

        String enc_body = SEED.Encrypt(body_msg, cypher_key);        // 데이터부 메시지 암호화
        int total_len = head_len + UtilMgr.length(enc_body);        // 암호화후 전체길이

        final String smsg = UtilMgr.msg_int(total_len, 8, true, true) + UtilMgr.substring(head_msg, 8) + enc_body;    // 헤더부분 전체길이값 설정

        final String read_msg = doMsg(smsg, 8, true);            // 전문 송수신

        byte[] rmsg_bytes = null;

        if( read_msg != null && read_msg.length() > 0 ) {
            head_len = UtilMgr.to_int(read_msg.substring(8, 16));
            head_msg = UtilMgr.substring(read_msg, 0, head_len);            // 응답전문 비암호화 부분
            enc_body = UtilMgr.substring(read_msg, head_len);                // 응답전문 암호화 부분

            final byte[] body_bytes = SEED.Decrypt(enc_body.getBytes(), cypher_key);
            total_len = head_len + body_bytes.length;

            rmsg_bytes = new byte[total_len];
            final ByteArrayOutputStream baos = new ByteArrayOutputStream();
            try {
            	baos.write(UtilMgr.msg_int(total_len, 8, true, true).getBytes());
            	baos.write(UtilMgr.substring(head_msg, 8).getBytes());
            	baos.write(body_bytes);
            	rmsg_bytes = baos.toByteArray();
            }
            catch( final IOException e ) {
            	LogMgr.error(e);
            }
        }
        else
            error_msg = "Read Timeout";

        if( debug )
            LogMgr.debug("RECV:[" + UtilMgr.toString(rmsg_bytes) + "]");

        return UtilMgr.toString(rmsg_bytes, "EUC-KR");
    }


    // 1회성 전문 송수신(연결-송신-수신-종료)
    public String doMsg(final String send_msg) {

        if( !connect() )
            return null;

        write(send_msg);
        final String read_msg = read();

        disconnect();

        return read_msg;
    }

    // 1회성 전문 송수신(길이필드)
    public String doMsg(final String send_msg, final int wlen) {
        return doMsg(send_msg, wlen, false);
    }

    // 1회성 전문 송수신(길이필드,포함여부)
    public String doMsg(final String send_msg, final int wlen, final boolean b_include) {

        if( !connect() )
            return null;


        write(send_msg);
        final String read_msg = read(wlen, b_include);

        disconnect();

        return read_msg;
    }



    // 1회성 Byte Array 송수신(연결-송신-수신-종료)
    public byte[] doMsg(final byte[] send_bytes) {

        if( !connect() )
            return null;

        write(send_bytes);
        final byte[] read_bytes = readBytes();

        disconnect();

        return read_bytes;
    }

    // 1회성 Byte Array 송수신(길이필드)
    public byte[] doMsg(final byte[] send_bytes, final int wlen) {
        return doMsg(send_bytes, wlen, false);
    }

    // 1회성 Byte Array 송수신(길이필드,포함여부)
    public byte[] doMsg(final byte[] send_bytes, final int wlen, final boolean b_include) {

        if( !connect() )
            return null;

        write(send_bytes);
        final byte[] read_bytes = readBytes(wlen, b_include);

        disconnect();

        return read_bytes;
    }


    public byte[] doMsg(final byte[] head_bytes, final byte[] body_bytes) {

        if( !connect() )
            return null;

        write(head_bytes);
        write(body_bytes);
        final byte[] read_bytes = readBytes();

        disconnect();

        return read_bytes;
    }

    public byte[] doMsg(final byte[] head_bytes, final byte[] body_bytes, final int wlen) {
    	return doMsg(head_bytes, body_bytes, wlen, false);
    }

    public byte[] doMsg(final byte[] head_bytes, final byte[] body_bytes, final int wlen, final boolean b_include) {

        if( !connect() )
            return null;

        write(head_bytes);
        write(body_bytes);
        final byte[] read_bytes = readBytes(wlen, b_include);

        disconnect();

        return read_bytes;
    }


    // Static IO Routines ==============================================================

	// Write String
	public static boolean write(final OutputStream os, final String send_msg) {

		if( debug )
			LogMgr.debug("TXSocket.write():[", send_msg, "]");

		final byte[] bytes = UtilMgr.getBytes(send_msg, msg_charset);

		return write(os, bytes);
	}

	// Write Byte Array
	public static boolean write(final OutputStream os, final byte[] bytes) {

		if( os == null )
			return false;

		try {
			os.write(bytes);
			os.flush();
		}
		catch( final IOException e ) {
			LogMgr.error(e);
			error_msg = e.getMessage();
		}

		return true;
	}

	// Read String
	public static String read(final InputStream is) {

		if( is == null )
			return null;

		final byte[] bytes = readBytes(is);

		if( bytes == null )
			return null;

		final String rmsg = UtilMgr.toString(bytes, msg_charset);

		if( debug )
			LogMgr.debug("TXSocket.read():[", UtilMgr.toString(UtilMgr.getBytes(rmsg)), "]");

		return rmsg;
	}

	// Read String with Length-Width
	public static String read(final InputStream is, final int wlen, final boolean b_include) {

		if( is == null )
			return null;

		final byte[] bytes = readBytes(is, wlen, b_include);

		if( bytes == null )
			return null;

		final String rmsg = UtilMgr.toString(bytes, msg_charset);

		if( debug )
			LogMgr.debug("TXSocket.read():[", UtilMgr.toString(UtilMgr.getBytes(rmsg)), "]");

		return rmsg;
	}

	// Read Byte Array
	public static byte[] readBytes(final InputStream is) {

		if( is == null )
			return null;

		final byte[] buf = new byte[BUFFER_SIZE];
		final ByteArrayOutputStream baos = new ByteArrayOutputStream();
		int nread = 0;

		try {

			while( (nread = is.read(buf)) != -1 ) {
				baos.write(buf, 0, nread);
			}

		}
		catch( final IOException e ) {
			LogMgr.error(e);
			error_msg = e.getMessage();
		}

		return baos.toByteArray();
	}

	// Read Byte Array with Length-Width
	public static byte[] readBytes(final InputStream is, final int wlen, final boolean b_include) {

		if( is == null )
			return null;

		final byte[] buf = new byte[BUFFER_SIZE];
		final ByteArrayOutputStream baos = new ByteArrayOutputStream();
		int nread = 0;
		int read_len = 0;
		int msglen = 0;

		try {

			while( (nread = is.read(buf)) != -1 ) {
				baos.write(buf, 0, nread);
				read_len += nread;

				if( msglen == 0 && read_len >= wlen ) {
					final String lenstr = baos.toString().substring(0, wlen);
					msglen = UtilMgr.to_int(lenstr) + (b_include ? 0 : wlen);
				}

				if( msglen > 0 && read_len >= msglen )
					break;
			}

		}
		catch( final IOException e ) {
			LogMgr.error(e);
			error_msg = e.getMessage();
		}

		return baos.toByteArray();
	}

	// Read String in Length
	public static String readInLength(final InputStream is, final int len) {
		final byte[] bytes = readBytesInLength(is, len);

		final String read_msg = UtilMgr.toString(bytes, msg_charset);

		if( debug )
			LogMgr.debug("TXSocket.readInLength(", len, "):[", UtilMgr.toString(UtilMgr.getBytes(read_msg)), "]");

		return read_msg;
	}

	// Read Byte Array in Length
	public static byte[] readBytesInLength(final InputStream is, final int len) {

		if( is == null )
			return null;

		final byte[] buf = new byte[len];
		int nread = 0;
		int readlen = 0;

		try {

			while( (nread = is.read(buf, readlen, len - readlen)) != -1 ) {
				readlen += nread;

				if( readlen >= len )
					break;
			}

		}
		catch( final IOException e ) {
			LogMgr.error(e);
			error_msg = e.getMessage();
		}

		return buf;
	}

	public static int available(final InputStream is) {

		if( is == null )
			return -1;

		int result = -1;

		try {
			result = is.available();
		}
		catch( final IOException e ) {
			LogMgr.error(e);
			error_msg = e.getMessage();
		}

		return result;
	}

}

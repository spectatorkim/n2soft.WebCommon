/*
 * 시스템 기본환경설정
 * 
 */

package com.n2soft.common;

import com.n2soft.crypto.SEED;


public class Env {

	// 환경변수
	protected static StringMap m_env = new StringMap();

	private static boolean config_loaded = false;

	protected static boolean debug = true;


	public Env() {
		init();
	}


	public synchronized static void init() {
		loadEnv();
	}
	
	public static void reset() {
		config_loaded = false;

		init();
	}
	
	public static void setDebug(boolean _debug) {
		debug = _debug;
	}


	// 공통 환경설정
	protected static void loadEnv() {

		if( config_loaded )
			return;

		String ntree_home = System.getenv("NTREE_HOME");
		if( ntree_home == null )
			ntree_home = System.getProperty("ntree.home");
		System.out.println(ntree_home);

		m_env = UtilMgr.loadXML(ntree_home + "/config/nTree.xml");
		m_env.put("system.path", ntree_home);

		config_loaded = true;

		if( debug )
       		System.out.println(m_env.toString(true));
	}

	public static String get(String name) {
		return get(name, "");
	}
	
	public static String get(String name, String default_value) {

		init();
		
		String value = m_env.get(name.toLowerCase(), default_value);
		
		if( value == null )
			return null;
		
		// 다른 환경변수 참조
		int start = value.indexOf("${");

		while( start != -1 ) {
			System.out.println(value);
			int end = value.indexOf("}", start+2);

			if( end != -1 ) {
				String sub = value.substring(start+2, end);

				if( sub.length() > 0 ) {
					if( start == 0 )
						value = get(sub) + value.substring(end+1);
					else
						value = value.substring(0, start) + get(sub) + value.substring(end+1);
				}
			}
			
			start = value.indexOf("${");
		}
		

		// 시스템 프로퍼티 참조
		start = value.indexOf("@{");

		while( start != -1 ) {
			int end = value.indexOf("}", start+2);

			if( end != -1 ) {
				String sub = value.substring(start+2, end);

				if( sub.length() > 0 ) {
					if( start == 0 )
						value = System.getProperty(sub) + value.substring(end+1);
					else
						value = value.substring(0, start) + System.getProperty(sub) + value.substring(end+1);
				}
			}
			
			start = value.indexOf("@{");
		}
		

		// 암호화된 값 복호화
		start = value.indexOf("#{");

		while( start != -1 ) {
			int end = value.indexOf("}", start+2);

			if( end != -1 ) {
				String sub = value.substring(start+2, end);

				if( sub.length() > 0 ) {
					if( start == 0 )
						value = SEED.Decrypt(sub) + value.substring(end+1);
					else
						value = value.substring(0, start) + SEED.Decrypt(sub) + value.substring(end+1);
				}
			}
			
			start = value.indexOf("#{");
		}
		

		return value;
	}

	public static int getInt(String name, int default_value) {

		String value = get(name, default_value + "");

		if( value == null || value.length() == 0 )
			return 0;

		return UtilMgr.to_int(value);
	}

	public static int getInt(String name) {

		String value = get(name);

		if( value == null || value.length() == 0 )
			return 0;

		return UtilMgr.to_int(value);
	}

	public static String[] getCodes(String name) {
		String codes = get(name);

		codes = UtilMgr.replace(codes, "\r", "");
		codes = UtilMgr.replace(codes, "\n", "");
		codes = UtilMgr.replace(codes, "\t", "");
		codes = UtilMgr.replace(codes, " ", "");

		return UtilMgr.split(codes, ",");
	}

	public static String[] getList(String name) {
		String list = get(name);

		list = UtilMgr.replace(list, "\r", "");
		list = UtilMgr.replace(list, "\n", "");
		list = UtilMgr.replace(list, "\t", "");
		list = UtilMgr.replace(list, " ", "");

		return UtilMgr.split(list, ",");
	}

	public static StringMap getMap() {
	    init();

	    return m_env;
	}


	// Profile Environment Functions ==================================================

	public static String _get(String profile, String name, String default_value) {
		if( profile != null && profile.length() > 0 )
			profile += ".";
		else
			profile = "";

		return get(profile + name, default_value);
	}

	public static String _get(String profile, String name) {
		return _get(profile, name, null);
	}

	public static int _getInt(String profile, String name, int default_value) {
		return UtilMgr.to_int(_get(profile, name, default_value + ""));
	}

	public static int _getInt(String profile, String name) {
		return _getInt(profile, name, 0);
	}

	public static String[] _getList(String profile, String name) {
		if( profile != null && profile.length() > 0 )
			profile += ".";
		else
			profile = "";

		return getList(profile + name);
	}

}

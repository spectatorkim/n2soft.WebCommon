package com.n2soft.common;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class DataMap extends HashMap<String, Object> {

	private static final long serialVersionUID = 1L;
	private boolean b_caseInsensitive = false;		// Using Case Insensitive Key


	public DataMap() {
		super();
	}

	public DataMap(boolean b_nocase) {
		super();

		this.b_caseInsensitive = b_nocase;
	}

	public DataMap(DataMap dm) {
		super();

		if( dm == null || dm.size() == 0 )
			return;

		String[] keys = dm.getKeys();
		for( String key : keys )
			this.put(key, dm.get(key));
	}

	public DataMap(DataMap dm, boolean b_nocase) {
		super();
		this.b_caseInsensitive = b_nocase;

		if( dm == null || dm.size() == 0 )
			return;

		String[] keys = dm.getKeys();
		for( String key : keys )
			this.put(key, dm.get(key));
	}

	public DataMap(Map<String,Object> map) {
		super();

		if( map == null || map.size() == 0 )
			return;

		String[] keys = getKeys(map);
		for( String key : keys )
			this.put(key, map.get(key));
	}

	public DataMap(Map<String,Object> map, boolean b_nocase) {
		super();
		this.b_caseInsensitive = b_nocase;

		if( map == null || map.size() == 0 )
			return;

		String[] keys = getKeys(map);
		for( String key : keys )
			this.put(key, map.get(key));
	}


	public Object search(String path) {
		String[] keys = UtilMgr.split(path, ".");
		DataMap dm = new DataMap(this);
		for(int i=0; i < keys.length; i++) {
			Object obj = dm.get(keys[i]);
			if( obj == null )
				return null;
			if( "DataMap".equals(obj.getClass().getSimpleName()) )
				dm = (DataMap)obj;
		}

		return dm;
	}


	@Override
	public Object put(String key, Object value) {
		return super.put(b_caseInsensitive ? key.toUpperCase() : key, value);
	}

	public Object get(String key) {
		return super.get(b_caseInsensitive ? key.toUpperCase() : key);
	}


	public Object get(String key, Object default_value) {
		Object value = get(key);
		if( value == null )
			value = default_value;
		return value;
	}


	public String getString(String key) {
		return "" + get(key);
	}

	public String getString(String key, String default_value) {
		return "" + get(key, default_value);
	}


	public int getInt(String key) {
		Object value = get(key);
		if( value == null )
			return 0;

		if( "String".equals(value.getClass().getSimpleName()) )
			return UtilMgr.to_int((String)value);
		
		return (int)value;
	}

	public int getInt(String key, int default_value) {
		Object value = get(key);
		if( value == null )
			return default_value;

		if( "String".equals(value.getClass().getSimpleName()) )
			return UtilMgr.to_int((String)value);

		return (int)value;
	}
	

	public DataMapList getList(String key) {
		return (DataMapList)get(key);
	}


	public DataMap add(DataMap map) {
		String[] keys = map.getKeys();

		for( String key : keys )
			put(key, map.get(key));

		return this;
	}

	public DataMap add(DataMap map, String keys) {
		String[] list = UtilMgr.split(keys, ",");

		for( String key : list )
			put(key, map.get(key));

		return this;
	}



	public StringMap toStringMap() {
		StringMap map = new StringMap();

		String[] keys = this.getKeys();
		for(int i=0; i < keys.length; i++) {
			String key = keys[i];
			Object value = this.get(key);
			String cls_name = value.getClass().getSimpleName();
			if( "DataMap".equals(cls_name) ) {
				DataMap dm = (DataMap)value;
				StringMap submap = dm.toStringMap();
				String[] subkeys = submap.getKeys();
				for(int j=0; j < subkeys.length; j++)
					map.put(key + "." + subkeys[j], submap.get(subkeys[j]));
			}
			else if( "DataMapList".equals(cls_name) ) {
				DataMapList dml = (DataMapList)value;
				for(int j=0; j < dml.size(); j++) {
					DataMap dm = dml.get(j);
					StringMap submap = dm.toStringMap();
					String[] subkeys = submap.getKeys();
					for(int k=0; k < subkeys.length; k++)
						map.put(key + "." + subkeys[k] + "[" + j + "]", submap.get(subkeys[k]));
				}
			}
			else
				map.put(key, value + "");
		}

		return map;
	}

	public String[] getKeys() {
		return getKeys(this, false);
	}

	public String[] getKeys(boolean b_sort) {
		return getKeys(this, b_sort);
	}


	public String toString() {
		return toString(this, false);
	}

	public String toString(boolean b_sort) {
		return toString(this, b_sort);
	}


	public String toHTML() {
		return toString(this, false, true);
	}

	public String toHTML(boolean b_sort) {
		return toString(this, b_sort, true);
	}


	// Static Functions =========================================================================

	public static String[] getKeys(Map<String,Object> map) {
		return getKeys(map, false);
	}

	public static String[] getKeys(Map<String,Object> map, boolean b_sort) {
		Set<String> keySet = map.keySet();
		String[] keys = new String[keySet.size()];

		keySet.toArray(keys);
		if( b_sort )
			Arrays.sort(keys);

		return keys;
	}


	public static String toString(Map<String,Object> map) {
		return toString(map, false, false);
	}

	public static String toString(Map<String,Object> map, boolean b_sort) {
		return toString(map, b_sort, false);
	}

	public static String toString(Map<String,Object> map, boolean b_sort, boolean b_html) {
		StringBuffer sb = new StringBuffer();
		String[] keys = getKeys(map, b_sort);

		sb.append("{").append(b_html? "<br />":"").append("\n");

		int max_len = 0;
		for( String key : keys )
			if( key.length() > max_len )
				max_len = key.length();

		for( String key : keys ) {
			Object obj = map.get(key);
			String s = "";
			if( obj == null )
				s = "(null)";
			if( "DataMap".equals(obj.getClass().getSimpleName()) )
				s = ((DataMap)obj).toString(b_sort);
			else if( "DataMapList".equals(obj.getClass().getSimpleName()) )
				s = ((DataMapList)obj).toString(b_sort);
			else
				s= obj.toString();

			sb.append(key).append(UtilMgr.get_filler(max_len - key.length(), " ")).append(" = [").append(s).append("]").append(b_html? "<br />":"").append("\n");
		}

		sb.append("}");

		return sb.toString();
	}


	public static String toHTML(Map<String,Object> map) {
		return toString(map, false, true);
	}

	public static String toHTML(Map<String,Object> map, boolean b_sort) {
		return toString(map, b_sort, true);
	}



	public static void main(String[] argv) throws Exception {
		DataMap dm = new DataMap(true);

		dm.put("abc", "12454");
		dm.put("abcd", 12434);

		System.out.println(dm.get("ABC"));
		System.out.println(dm.get("abcd"));
		System.out.println(Arrays.toString(dm.getKeys()));
	}
}

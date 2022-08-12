package com.n2soft.common;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class DataMapList extends ArrayList<DataMap> {

	private static final long serialVersionUID = 1L;


	public DataMapList() {
		super();
	}

	public DataMapList(List<Map<String,Object>> list) {
		super();

		if( list == null )
			return;

		for( Map<String,Object> map : list )
			this.add(new DataMap(map));
	}

	
	public boolean add(DataMap dm) {
		return super.add(new DataMap(dm));
	}

	
	public String toString(boolean b_sort) {
		StringBuffer sb = new StringBuffer();

		sb.append("[\n");

		for( DataMap dm : this )
			sb.append("  {").append(dm.toString(b_sort)).append("}\n");

		sb.append("]\n");

		return sb.toString();
	}
}

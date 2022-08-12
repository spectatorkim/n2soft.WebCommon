package com.n2soft.common;

import java.util.ArrayList;

public class StringList extends ArrayList<String> {

	private static final long serialVersionUID = -7185323845159102151L;

	public StringList() {
		super();
	}

	public StringList(String[] list) {
		super();

		if( list == null )
			return;

		for(int i=0; i < list.length; i++)
			this.add(list[i]);
	}
	
	public String[] toArray() {
		String[] array = new String[this.size()];
		toArray(array);

		return array;
	}

}

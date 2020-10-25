package com.sara.web.common;

public class Constants {
	public static final String NL = "\n";

	public static final String CLIENT_URL = "http://localhost:3000";// 3000 4200

	public static final int DEFAULT_PAGE_NUMBER = 0;
	public static final int DEFAULT_PAGE_SIZE = 25;

	public static final String URL_API_BASE = "/api";
	public static final String URL_LIST = "/l";
	public static final String URL_DELETE = "/d/{id}";
	public static final String URL_DETAILS = "/g/{id}";
	public static final String URL_SAVE = "/s";

	public static enum ADDRESS_SEARCH_TYPE {
		END_USER
	}

}

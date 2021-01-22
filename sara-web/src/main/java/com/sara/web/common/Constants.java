package com.sara.web.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

public class Constants {
	
	private static final Logger log = LoggerFactory.getLogger(Constants.class);

	public static final String NL = "\n";

	public static final String CLIENT_URL = "http://localhost:3000";// 3000 4200

	public static final int DEFAULT_PAGE_NUMBER = 0;
	public static final int DEFAULT_PAGE_SIZE = 25;

	public static final String URL_API_BASE = "/api";
	public static final String URL_LIST = "/l";
	public static final String URL_DELETE = "/d/{id}";
	public static final String URL_DETAILS = "/g/{id}";
	public static final String URL_OPTIONS = "/o";
	public static final String URL_SAVE = "/s";

	public static final String URL_BILLING_USER_SEARCH = "/search/{by}";
	public static final String URL_BILLING_USER_PAYABLES = "/payables/{id}";

	public static final String URL_LOGO = "/r/logo/{logo}";

//	public static enum ADDRESS_SEARCH_TYPE {
//		END_USER(1)
//	}
	
	public enum ADDRESS_SEARCH_TYPE{
		USER("1"), STUDENT("2"), PARENT("3");
		
		private String addressType;
		
		ADDRESS_SEARCH_TYPE(String addressType){
			this.addressType = addressType;
		}
		
		public String getAddressType() {
			return addressType;
		}
	}
	public static void toJson(Object obj) {
		try {
			ObjectMapper jsonObjMap = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
			String json = jsonObjMap.writeValueAsString(obj);
			log.debug("jInfo:\n" + json);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
	}

}

package com.sara.service.dtos;

import java.util.Date;

import com.sara.data.document.School;
import com.sara.data.document.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProcessingDto {

	private String id;
	private School school;
	private String type;
	private String status;
	private String jsonParams;
	private String statusMessage;
	private Date createdDate;
	private User user;
}

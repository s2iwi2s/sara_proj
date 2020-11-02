package com.sara.web.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.sara.web.common.Constants;

@Controller
public class ResourceController {

	private static final Logger log = LoggerFactory.getLogger(ResourceController.class);

	@RequestMapping(value = Constants.URL_LOGO, method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
	public ResponseEntity<byte[]> getImage(@PathVariable("logo") String logo, HttpServletResponse response,
			@Value("${logo.location}") String logoLocation) throws IOException {
		log.debug("logoLocation=" + logoLocation);
		log.debug("logo=" + logo);
		File imgPath = new File(logoLocation + logo + ".png");
		log.info("AbsolutePath: " + imgPath.getAbsolutePath());
		byte[] media = IOUtils.toByteArray(new FileInputStream(imgPath));

		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		
		ResponseEntity<byte[]> responseEntity;
		final HttpHeaders headers = new HttpHeaders();
		headers.setCacheControl(CacheControl.noCache().getHeaderValue());
		responseEntity = new ResponseEntity<>(media, headers, HttpStatus.OK);

		return responseEntity;
	}

}

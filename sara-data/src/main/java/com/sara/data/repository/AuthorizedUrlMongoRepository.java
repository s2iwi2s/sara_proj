package com.sara.data.repository;

import java.util.List;

import com.sara.data.document.AuthorizedUrl;

public interface AuthorizedUrlMongoRepository extends CustomRepository<AuthorizedUrl, String> {
	List<AuthorizedUrl> findByPermit(boolean permit);
}
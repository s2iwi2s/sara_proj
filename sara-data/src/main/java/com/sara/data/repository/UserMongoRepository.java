package com.sara.data.repository;

import com.sara.data.document.User;

public interface UserMongoRepository extends CustomRepository<User, String> {
	public User findByUserName(String userName);
}

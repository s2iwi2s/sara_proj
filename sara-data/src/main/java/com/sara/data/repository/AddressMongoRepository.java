package com.sara.data.repository;

import java.util.List;

import com.sara.data.document.Address;

public interface AddressMongoRepository extends CustomRepository<Address, String> {
	List<Address> findByUser(String id);
}

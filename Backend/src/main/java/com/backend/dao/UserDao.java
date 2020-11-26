package com.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.model.User;

@Repository
public interface UserDao extends JpaRepository<User, String>	{
	
	User findByusername(String username);
	
	User findByUniqueId(String uniqueId);
	
	void deleteByUniqueId(String uniqueId);
	
	User findByEmailId(String emailId);
	
}
	
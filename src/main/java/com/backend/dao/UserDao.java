package com.backend.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.model.User;

@Repository
public interface UserDao extends JpaRepository<User, Integer>	{
	
	User findByusername(String username);
	
	User findByEmailId(String emailId);

	Optional<User> findByResetToken(String token);
}
	
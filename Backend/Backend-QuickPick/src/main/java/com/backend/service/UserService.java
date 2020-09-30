package com.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dao.UserDao;
import com.backend.model.User;

@Service
public class UserService implements UserServiceInterface {

	@Autowired
	private UserDao userDao;
	
	@Override
	public String registerUser(User user) {
		userDao.save(user);
		return "Success";
	}

	@Override
	public List<User> getUsers() {
		
		return (List<User>) userDao.findAll();
	}

}

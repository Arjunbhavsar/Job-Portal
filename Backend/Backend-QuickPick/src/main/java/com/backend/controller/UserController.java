package com.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.model.User;
import com.backend.service.UserService;



@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@PostMapping("/register")
	public String registerUser(@RequestBody User user) {
		userService.registerUser(user);
		return "Saved Successfully ";
	}
	
	@GetMapping("/getUsers")
	public List<User> getUsers(){
		return userService.getUsers();
	}
	
	@GetMapping("/getUser/{username}")
	public User getUser(@PathVariable String username) {
		return userService.getUser(username);
	}
	
	@PostMapping("/login")
	public String login(@RequestBody User user){
		return userService.login(user);
	}
}

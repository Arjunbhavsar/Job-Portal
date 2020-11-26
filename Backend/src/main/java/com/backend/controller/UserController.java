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
@CrossOrigin(origins = "*")	// heroku
public class UserController {
	
	@Autowired
	UserService userService;
	
	@PostMapping("/login")
	public User login(@RequestBody User user){
		return userService.login(user);
	}
	
	@PostMapping("/register")
	public String registerUser(@RequestBody User user) {
		userService.registerUser(user);
		return "Saved Successfully";
	}
	
	@GetMapping("/getUsers")
	public List<User> getUsers(){
		return userService.getUsers();
	}
	
	@GetMapping("/getUser/{username}")
	public User getUser(@PathVariable String username) {
		return userService.getUser(username);
	}
	
	@GetMapping("/checkUsername/{username}")
	public String checkIfUsernameExists(@PathVariable String username){
		if(userService.checkIfUsernameExists(username).contains("not")) {
			return "registered";
		} else {
			return "new";
		}
	}
	
	@GetMapping("/checkEmail/{emailId}")
	public String checkIfEmailExists(@PathVariable String emailId){
		if(userService.checkIfEmailExists(emailId).contains("not"))
			return "registered";
		else
			return "new";
	}
	
	@PostMapping("/updateUser/{id}")
	public String updateUser(@PathVariable String id, @RequestBody User user) {
		String out = "no function";
		try {
			// Updating all fields but the username and id
			out = userService.updateUser(id, user);
			return "updated : " + out;
		} catch (Exception e) {
			return "failed to update : " + out;
		}
	}
}
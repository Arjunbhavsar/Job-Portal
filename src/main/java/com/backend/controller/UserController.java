package com.backend.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dao.UserDao;
import com.backend.model.User;
import com.backend.service.EmailService;
import com.backend.service.UserService;


@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")	// heroku
public class UserController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	EmailService emailService;
	
	@Autowired
	private UserDao userDao;
	
	@Value("${resetPassword.Url}")
	private String url;
	
	@PostMapping("/login")
	public String login(@RequestBody User user){
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
		}else {
			return "new";
		}
	}
	
	@PostMapping("/updateUser/{username}")
	public String updateUser(@PathVariable String username, @RequestBody User user) {
		try {
			// Updating all fields but the username and id
			User currentUser = userDao.findByusername(username);
			if(user.getAddress() != null && !user.getAddress().isEmpty())
				currentUser.setAddress(user.getAddress());
			if(user.getEmailId() != null && !user.getEmailId().isEmpty())
				currentUser.setEmailId(user.getEmailId());
			if(user.getFirstName() != null && !user.getFirstName().isEmpty())
				currentUser.setFirstName(user.getFirstName());
			if(user.getLastName() != null && !user.getLastName().isEmpty())
				currentUser.setLastName(user.getLastName());
			if(user.getPassword() != null && !user.getPassword().isEmpty())
				currentUser.setPassword(user.getPassword());
			if(user.getProfileFileId() != null && !user.getProfileFileId().isEmpty())
				currentUser.setProfileFileId(user.getProfileFileId());
			if(user.getResumeFileId() != null && !user.getResumeFileId().isEmpty())
				currentUser.setResumeFileId(user.getResumeFileId());
			if(user.getBiography() != null && !user.getBiography().isEmpty())
				currentUser.setBiography(user.getBiography());
			if(user.getUsername() != null && !user.getUsername().isEmpty())
				try {currentUser.setUsername(user.getUsername());} catch (Exception e) {}
			userDao.save(currentUser);
			return "Updated";
		} catch (Exception e) {
			return "Could not update information";
		}
	}
	
	
	@GetMapping(value = "/forgotpassword")
	public String processForgotPasswordForm(@RequestParam("email") String userEmail) {

		// Lookup user in database by e-mail
		User user = userService.findUserByEmail(userEmail);

		if (null == user) {
			return "Email Not Registered";
		} else {
			
			// Generate random 36-character string token for reset password 
			user.setResetToken(UUID.randomUUID().toString());

			// Save token to database
			userService.save(user);

			// Email message
			SimpleMailMessage passwordResetEmail = new SimpleMailMessage();
			passwordResetEmail.setFrom("support@Quick-Pick.com");
			passwordResetEmail.setTo(user.getEmailId());
			passwordResetEmail.setSubject("Password Reset Request");
			passwordResetEmail.setText("To reset your password, click the link below:\n" + url
					+ user.getResetToken());
			
			emailService.sendEmail(passwordResetEmail);
			
			// Add success message to view
			return "A password reset link has been sent to registered Email.";
		}
	}
	
	// Process reset password form
	@GetMapping(value = "/reset")
	public String setNewPassword(@RequestParam("token") String token, @RequestParam("password") String password) {

		// Find the user associated with the reset token
		Optional<User> user = userService.findUserByResetToken(token);

		// This should always be non-null but we check just in case
		if (user.isPresent()) {
			
			User resetUser = user.get(); 
            
			// Set new password    
			resetUser.setPassword(password);
            
			// Set the reset token to null so it cannot be used again
			resetUser.setResetToken(null);

			// Save user
			userService.save(resetUser);

			// In order to set a model attribute on a redirect, we must use
			//return "You have successfully reset your password. You may now login.";
			return "Successful";
		} else {
			//return "Oops! This is an invalid password reset link.";
			return "Invalid reset link.";
		}
		
   }
	
}

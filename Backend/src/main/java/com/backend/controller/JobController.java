package com.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.backend.dao.FileDao;
import com.backend.dao.JobDao;
import com.backend.dao.UserDao;
import com.backend.message.UploadFileResponse;
import com.backend.model.File;
import com.backend.model.Job;
import com.backend.model.User;
import com.backend.service.JobService;

@RestController
@RequestMapping("/job")
//@CrossOrigin(origins = "https://quick-pick-job.herokuapp.com")
@CrossOrigin(origins = "*")
public class JobController {

	@Autowired
	JobService jobService;
	
	@Autowired
	private UserDao userDao;
	
	@GetMapping("/getAllJobs")
	public List<Job> getUsers(){
		return jobService.getJobs();
	}
	
	@GetMapping("/getJob/{uniqueId}")
	public Job getUser(@PathVariable String uniqueId) {
		return jobService.getJobByID(uniqueId);
	}

	@PostMapping("/createJob/{username}")
	public String createJob(@PathVariable String username, @RequestBody Job jobDetails) {
		try {
			jobService.addNewJob(jobDetails);
			User user = userDao.findByusername(username);
			user.getCreatedJobId().add(jobDetails.getUniqueId());
			userDao.save(user);
			return "Job Created Successfully";
		} catch (Exception e) {
			return "Could Not Create Job";
		}
	}
	
	// 11/07 - Daniel Byun
	// Not sure how this should be done.
	// Like should we add a boolean to a job if its been accepted or...
	@PostMapping("/acceptJob/{username}/{uniqueId}")
	public String acceptJob(@PathVariable String username, @PathVariable String uniqueId) {
		try {
			User user = userDao.findByusername(username);
			user.getCreatedJobId().add(uniqueId);
			userDao.save(user);
			return "Job Accepted Successfully";
		} catch (Exception e) {
			return "Could Not Accept Job";
		}
	}
}

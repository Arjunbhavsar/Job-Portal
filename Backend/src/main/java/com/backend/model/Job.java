package com.backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name="\"Job\"")
public class Job {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String uniqueId;
	
	private String country;
	private String dateAdded;
	private String hasExpired;
	private String jobBoard;
	private String jobDescription;
	private String jobTitle;
	private String jobType;
	private String location;
	private String organization;
	private String pageUrl;
	private String jobSalary;
	private String sector;
}

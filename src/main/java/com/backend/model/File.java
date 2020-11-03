package com.backend.model;

import com.fasterxml.jackson.annotation.JsonSubTypes.Type;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "\"files\"")
public class File {
	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	private String id;

	private String name;

	private String type;

	@Lob
	@Type(type = "org.hibernate.type.ImageType")
	private byte[] data;
	
	@OneToOne//(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "profile")
	private User user;
//	@OneToOne(fetch = FetchType.LAZY, optional = false)
//	@JoinColumn(name = "user_id", nullable = false)
//	private User user;

	public File(String name, String type, byte[] data) {
		this.name = name;
		this.type = type;
		this.data = data;
	}
}

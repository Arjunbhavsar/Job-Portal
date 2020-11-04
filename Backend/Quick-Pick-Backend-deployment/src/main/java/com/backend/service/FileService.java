package com.backend.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.backend.dao.FileDao;
import com.backend.model.File;

@Service
public class FileService {

	@Autowired
	private FileDao fileDao;
	
	// Only updates when given applications	 (pdf, docx, ...)
	public File storeResume(MultipartFile mfile, String username) throws IOException {
		String fileName = StringUtils.cleanPath(mfile.getOriginalFilename());
		File file = new File(fileName, mfile.getContentType(), mfile.getBytes(), username);
		String type = file.getType();
		String[] typeSplit = type.split("/");
		if(typeSplit.length == 2 && typeSplit[0].equals("application")) {
			return fileDao.save(file);
		}
		return null;
	}
	
	// Only updates when given images (png, jpg, ...)
	public String storeProfile(MultipartFile mfile, String username) throws IOException {
		String fileName = StringUtils.cleanPath(mfile.getOriginalFilename());
		File file = new File(fileName, mfile.getContentType(), mfile.getBytes(), username);
		String type = file.getType();
		String[] typeSplit = type.split("/");
		if(typeSplit.length == 2 && typeSplit[0].equals("image")) {
			fileDao.save(file);
			return "Success";
		}
		return "You suck";
	}

	public File getFile(String id) {
		return fileDao.findById(id).get();
	}

	public Stream<File> getAllFiles() {
		return fileDao.findAll().stream();
	}
	
	public File getProfile(String username) {
		List<File> files = fileDao.findAll();
		for(File file: files) {
			if(file.getUsername() == username && file.getType().contains("image")) {
				return file;
			}
		}
		return null;
	}
	
	public File getResume(String username) {
		List<File> files = fileDao.findAll();
		for(File file: files) {
			if(file.getUsername() == username && !file.getType().contains("image")) {
				return file;
			}
		}
		return null;
	}
}
package com.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.dao.CertificationDao;
import com.backend.model.Certification;

@Service
public class CertificationService {
	
	@Autowired
	CertificationDao certDao;
	
	@Transactional
	public Certification addCertification(Certification certification) {
		return certDao.save(certification);
	}

	@Transactional
	public List<Certification> getCertifications(String userId) {
		return certDao.findAllByUserId(userId);
	}
	
	@Transactional
	public List<Certification> getAllByCertificate(String certificate) {
		return certDao.findAllByCertificate(certificate);
	}
}

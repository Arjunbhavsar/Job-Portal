package com.backend.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.model.Shift;

@Repository
public interface ShiftDao extends JpaRepository<Shift, String> {
	Shift findByUniqueId(String uniqueId);
	List<Shift> findByApplicationId(String applicationId);
}

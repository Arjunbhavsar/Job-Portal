package com.backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name="\"Shift\"")
public class Shift {
	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	private String id;
	
	// Approved or not
	private boolean approved = false;
	
	// Application shift is for
	private String applicationId;
	
	// Time start and end of shift, 24 hr time
	private Integer hourStart;
	private Integer minuteStart;
	private Integer hourEnd;
	private Integer minuteEnd;
	
	public String toString() {
		return hourStart+":"+minuteStart+"-"+hourEnd+":"+minuteEnd;
	}
	
	public boolean isValid() {
		if(	hourStart == null	|| hourEnd == null		||
			minuteStart == null || minuteEnd == null	||
			hourStart > 24		|| hourEnd > 24			||
			minuteStart > 60	|| minuteEnd > 60		||
			hourStart*60 + minuteStart > 1440			||
			hourEnd*60 + minuteEnd > 1440)
			return false;
		return true;
	}
}

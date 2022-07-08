package com.parkit.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
@Entity
@Table(name = "slots")
public class Slot {

	@Id
	@GeneratedValue
	@Column(name = "slot_id")
	private int id;
	
	public Slot() {
		
	}
	
	public Slot(String location, String address, String date, String startTime, String username, String services) {
		super();
		this.location = location;
		this.address = address;
		this.date = date;
		this.startTime = startTime;
		this.username = username;
		this.services = services;
	}

	@Column(name = "location")
	private String location;
	
	@Column(name = "address")
	private String address;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "start_time")
	private String startTime;
	
	@Column(name = "username")
	private String username;
	
	@Column(name = "services")
	private String services;
	
	@Column(name = "rating")
	private String rating;
}

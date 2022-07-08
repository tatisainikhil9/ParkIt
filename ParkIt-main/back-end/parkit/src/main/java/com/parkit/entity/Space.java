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
@Table(name = "spaces")
public class Space {

	@Id
	@GeneratedValue
	@Column(name = "space_id")
	private int id;
	
	public Space() {
		
	}
	
	public Space(String location, String address, String worker, String credentials) {
		super();
		this.location = location;
		this.address = address;
		this.worker = worker;
		this.credentials = credentials;
	}

	@Column(name = "location")
	private String location;
	
	@Column(name = "address")
	private String address;
	
	@Column(name = "worker")
	private String worker;
	
	@Column(name = "rating")
	private String rating;
	
	@Column(name = "total_time")
	private String totalTime;
	
	@Column(name = "no_of_bookings")
	private String noOfBookings;
	
	@Column(name = "no_of_ratings")
	private String noOfRatings;
	
	@Column(name = "credentials")
	private String credentials;
}

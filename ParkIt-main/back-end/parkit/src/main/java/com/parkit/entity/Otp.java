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
@Table(name = "otps")
public class Otp {

	@Id
	@GeneratedValue
	@Column(name = "user_id")
	private int id;
	
	public Otp() {
		
	}
	
	public Otp(String otp, String username, String firstName, String lastName, String credentials, String address,
			String email, String phone, String carNumber) {
		super();
		this.otp = otp;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.credentials = credentials;
		this.address = address;
		this.email = email;
		this.phone = phone;
		this.carNumber = carNumber;
	}
	
	@Column(name = "otp")
	private String otp;
	
	@Column(name = "username")
	private String username;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "credentials")
	private String credentials;
	
	@Column(name = "address")
	private String address;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "phone")
	private String phone;
	
	@Column(name = "car_number")
	private String carNumber;
}

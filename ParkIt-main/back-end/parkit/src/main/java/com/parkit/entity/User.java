package com.parkit.entity;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
	
	@Id
	@GeneratedValue
	@Column(name = "user_id")
	private int id;
	
	public User() {
		
	}
	
	public User(String username, String firstName, String lastName, 
			String credentials, String address, String email, 
			String phone, String carNumber) {
		super();
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.credentials = credentials;
		this.address = address;
		this.email = email;
		this.phone = phone;
		this.carNumber = carNumber;
		this.money = "1000";
	}

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
	
	@Column(name = "money")
	private String money;
}

package com.parkit.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parkit.entity.User;

public interface UserRepository extends JpaRepository<User, Integer >{
	User findByEmail(String email);
	User findByUsername(String username);
	void deleteByUsername(String username);
	User findByPhone(String phone);
	User findByCredentials(String credentials);
}

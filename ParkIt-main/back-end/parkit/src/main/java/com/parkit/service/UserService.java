package com.parkit.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.parkit.entity.User;
import com.parkit.repository.UserRepository;

@Service
@Transactional
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	public User saveUser(User user) {
        return userRepository.save(user);
    }
	
	public User findUserById(int id) {
		return userRepository.findById(id).orElse(null);
	}
	
	public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
	
	public User findUserByUsername(String userName) {
        return userRepository.findByUsername(userName);
    }
	
	public User findUserByPhone(String phone) {
        return userRepository.findByPhone(phone);
    }
	
	public User findUserByCredentials(String credentials) {
		return userRepository.findByCredentials(credentials);
	}
	
	public List<User> getUsers() {
		return userRepository.findAll();
	}
	
	public String deleteUser(String username) {
		userRepository.deleteByUsername(username);
		return "Deleted";
	}
	
	public User updateUser(User user) {
		User existingUser = userRepository.findById(user.getId()).orElse(null);
		existingUser.setUsername(user.getUsername());
		return userRepository.save(existingUser);
	}
}

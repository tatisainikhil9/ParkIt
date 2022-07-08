package com.parkit;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parkit.entity.User;
import com.parkit.service.UserService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class ShowUsersController {
	
	@Autowired
	private UserService userService;

	@GetMapping(path = "/get-users")
    public List<User> showUsers() {
		List<User> users = userService.getUsers();
		
		for (Iterator<User> iterator = users.iterator(); iterator.hasNext();) {
			User user = iterator.next();
			
			if(user.getUsername().equals("admin") || user.getCarNumber() == null) {
				iterator.remove();
			}
		}
		return users;
	}
}

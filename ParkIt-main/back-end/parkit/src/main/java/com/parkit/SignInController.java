package com.parkit;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.parkit.entity.User;
import com.parkit.service.UserService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class SignInController {
	
	@Autowired
	private UserService userService;

    @GetMapping(path = "/basicauth")
    public String signIn(@RequestHeader Map<String,String> headers) {
    	if (userService.findUserByCredentials(headers.get("authorization")) == null) {
			return "Invalid credentials";
		}
		else {
			if (userService.findUserByCredentials(headers.get("authorization")).getFirstName() == null) {
				return "Worker logged in";
			}
			else {
				return "User logged in";
			}
		}
    }
}
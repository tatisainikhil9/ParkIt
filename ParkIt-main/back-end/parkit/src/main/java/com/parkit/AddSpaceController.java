package com.parkit;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.parkit.entity.Space;
import com.parkit.entity.User;
import com.parkit.service.SpaceService;
import com.parkit.service.UserService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class AddSpaceController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private SpaceService spaceService;

	@GetMapping(path = "/add-space")
	public String addSpace(@RequestHeader Map<String,String> headers) {
		String location = headers.get("location");
		String address = headers.get("address");
		String worker = headers.get("worker");
		String credentials = headers.get("credentials");
		
		if (worker.equals("")) {
			worker = null;
			credentials = null;
		}
		
		if (spaceService.findSpaceByLocationAndAddress(location, address) != null) {
			return "Space exists";
		}
		
		if (userService.findUserByUsername(worker) != null) {
			return "Username exists";
		};
		
		User userToBeAdded = new User(worker, null, null, credentials, null, null, null, null);
		
		User temp = userService.saveUser(userToBeAdded);
		
		if (spaceService.saveSpace(new Space(location, address, worker, credentials)) != null) {
			return "Success";
		}
		return "Fail";		
	}
}

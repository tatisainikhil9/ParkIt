package com.parkit;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.parkit.entity.Space;
import com.parkit.service.SpaceService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class RemoveWorkerController {

	@Autowired
	private SpaceService spaceService;
	
	@GetMapping(path = "/remove-worker")
	public String removeWorker(@RequestHeader Map<String,String> headers) {
		
		String worker = headers.get("worker");
		
		Space temp = spaceService.removeWorker(worker);
		
		return "Success";
	}
}

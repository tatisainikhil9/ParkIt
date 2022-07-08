package com.parkit;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parkit.entity.Space;
import com.parkit.service.SpaceService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class ShowSpacesWithoutWorkerController {

	@Autowired
	private SpaceService spaceService;
	
	@GetMapping(path = "/show-workerless-spaces")
	public List<Space> showWorkerlessSpaces() {
		return spaceService.findSpacesWithoutWorker();
	}
}

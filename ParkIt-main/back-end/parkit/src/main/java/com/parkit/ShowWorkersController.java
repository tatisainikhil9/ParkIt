package com.parkit;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parkit.entity.Space;
import com.parkit.service.SpaceService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class ShowWorkersController {

	@Autowired
	private SpaceService spaceService;
	
	@GetMapping(path = "/show-workers")
	public List<Space> showWorkers() {
		
		List<Space> allSpaces = spaceService.getSpaces();
		
		for (Iterator<Space> iterator = allSpaces.iterator(); iterator.hasNext();) {
			Space space = iterator.next();
			
			if(space.getWorker() == null) {
				iterator.remove();
			}
		}
		
		return allSpaces;
	}
}

package com.parkit;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.parkit.entity.Space;
import com.parkit.service.SlotService;
import com.parkit.service.SpaceService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class RemoveSpaceController {

	@Autowired
	private SlotService slotService;
	
	@Autowired
	private SpaceService spaceService;
	
	@GetMapping(path = "/show-spaces")
	public List<Space> getSpaces() {
		return spaceService.getSpaces();
	}
	
	@GetMapping(path = "/remove-space")
	public String removeSpace(@RequestHeader Map<String,String> headers) {
		String location = headers.get("location");
		String address = headers.get("address");
		
		Space space = spaceService.findSpaceByLocationAndAddress(location, address);
		
		String temp = spaceService.deleteSpace(location, address);
		
		String temp2 = slotService.deleteSlotByLocationAndAddress(location, address);
		
		return "Deleted";
	}
}

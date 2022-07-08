package com.parkit;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.parkit.entity.Slot;
import com.parkit.service.SlotService;
import com.parkit.service.UserService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class RemoveUserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private SlotService slotService;
	
	@GetMapping(path = "/remove-user")
	public String removeUser(@RequestHeader Map<String,String> headers) {
		
		String username = headers.get("username");
		
		String temp = userService.deleteUser(username);
				
		List<Slot> slots = slotService.findSlotsByUser(username);
		
		for (Iterator<Slot> iterator = slots.iterator(); iterator.hasNext();) {
			Slot slot = iterator.next();
			
			if (slot.getUsername().equals(username)) {
				slotService.deleteSlot(slot);
			}
		}
		
		return "Success";
	}
}

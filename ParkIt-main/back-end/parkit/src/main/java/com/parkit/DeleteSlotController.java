package com.parkit;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.parkit.service.SlotService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class DeleteSlotController {
	
	@Autowired
	private SlotService slotService;
	
	@GetMapping(path = "/delete-slot")
	public String deleteSlot(@RequestHeader Map<String,String> headers) {
		
		String location = headers.get("location");
		String address = headers.get("address");
		String date = headers.get("booking-date");
		String startTime = headers.get("start-time");
		String endTime = headers.get("end-time");
		String username = headers.get("username");
		
		int startTimeInt = Integer.parseInt(startTime.split(":")[0]);
		int endTimeInt = Integer.parseInt(endTime.split(":")[0]);
		
		for (int i = 0; i < (endTimeInt - startTimeInt); i++) {
			slotService.deleteSlot(location, address, date, String.valueOf(startTimeInt + i)+":00");
		}
		
		return "Success";
	}

}

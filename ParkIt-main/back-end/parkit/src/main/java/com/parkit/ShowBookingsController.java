package com.parkit;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.parkit.entity.Slot;
import com.parkit.service.SlotService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class ShowBookingsController {

	@Autowired
	private SlotService slotService;
	
	@GetMapping(path = "/get-user-slots")
	public List<JSONObject> getSlots(@RequestHeader Map<String,String> headers) {
		
		String username = headers.get("username");
		
		List<Slot> allSlots = slotService.findSlotsByUser(username);
		List<JSONObject> message = new ArrayList<JSONObject>();
		List<String> tempList = new ArrayList<String>();
			
		for (Slot slot: allSlots) {
			
			String temp = slot.getLocation()+","+slot.getAddress()+","+slot.getDate()+","+slot.getUsername();
			
			if (!tempList.contains(temp)) {
				tempList.add(temp);
			}
		}
		
		int count = 0;
		
		for (String temp: tempList) {
			String[] detailsList = temp.split(",");
			
			List<Slot> slots = slotService.findSlotWithoutTime(detailsList[0], detailsList[1], detailsList[2], detailsList[3]);
			
			JSONObject finalSlot = new JSONObject();
			finalSlot.put("id", count);
			finalSlot.put("location", slots.get(0).getLocation());
			finalSlot.put("address", slots.get(0).getAddress());
			finalSlot.put("date", slots.get(0).getDate());
			finalSlot.put("username", slots.get(0).getUsername());
			
			List<Integer> startTimes = new ArrayList<Integer>();
			
			for (Slot tempSlot: slots) {
				startTimes.add(Integer.parseInt(tempSlot.getStartTime().split(":")[0]));
			}
			
			int smallest = startTimes.get(0);
			int largest = startTimes.get(0);
			
			for (int i = 1; i < startTimes.size(); i++) {
				if (startTimes.get(i) > largest)
					largest = startTimes.get(i);
				else if (startTimes.get(i) < smallest)
					smallest = startTimes.get(i);
			}
			
			finalSlot.put("startTime", String.valueOf(smallest)+":00");
			finalSlot.put("endTime", String.valueOf(largest+1)+":00");
			
			String[] services = slots.get(0).getServices().split(",");
			
			finalSlot.put("dryCleaning", services[0]);
			finalSlot.put("carWash", services[1]);
			finalSlot.put("airFilling", services[2]);
			finalSlot.put("tyreRepair", services[3]);
			
			int totalCost;
			
			totalCost = (largest + 1 - smallest)*25;
			
			if (services[0].equals("Yes")) totalCost += 100;
			
			if (services[1].equals("Yes")) totalCost += 100;
			
			if (services[2].equals("Yes")) totalCost += 100;
			
			if (services[3].equals("Yes")) totalCost += 100;
			
			finalSlot.put("totalCost", totalCost);
			
			message.add(finalSlot);
			count++;
		}
		
		return message;		
	}
}

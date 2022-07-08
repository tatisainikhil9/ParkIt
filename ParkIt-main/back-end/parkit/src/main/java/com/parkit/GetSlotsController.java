package com.parkit;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parkit.entity.Slot;
import com.parkit.service.SlotService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class GetSlotsController {

	@Autowired
	private SlotService slotService;
	
	@GetMapping(path = "/get-slots")
	public List<JSONObject> getSlots() {
		
		List<Slot> allSlots = slotService.getSlots();
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
			
			message.add(finalSlot);
			count++;
		}
		
		return message;
	}
	
}

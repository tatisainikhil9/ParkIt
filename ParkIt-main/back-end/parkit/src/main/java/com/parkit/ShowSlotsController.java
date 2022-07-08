package com.parkit;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.parkit.entity.Slot;
import com.parkit.entity.Space;
import com.parkit.service.SlotService;
import com.parkit.service.SpaceService;

import org.json.simple.JSONObject;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class ShowSlotsController {
	
	@Autowired
	private SlotService slotService;
	
	@Autowired
	private SpaceService spaceService;
	
	
	@GetMapping(path = "/get-locations")
	public List<String> getLocation() {
		return spaceService.getLocations();
	}
	
	@GetMapping(path = "/show-slots")
	public List<JSONObject> showSlots(@RequestHeader Map<String,String> headers) {
		
		
		String location = headers.get("location");
		String date = headers.get("booking-date");
		String startTime = headers.get("start-time");
		String endTime = headers.get("end-time");
		
		List<Space> locationSpaces = spaceService.findSpacesByLocation(location);
		
		List<Slot> tempListOfSlots = new ArrayList<>();
		
		List<String> allLocationsAndAddresses = new ArrayList<String>();
		
		for (Space space : locationSpaces) {
			allLocationsAndAddresses.add(space.getLocation()+","+space.getAddress());
			for (int i = 0; i < 15; i++) {
				tempListOfSlots.add(new Slot(space.getLocation(), space.getAddress(), date, String.valueOf(i+8)+":"+"00", null, null));
			}
		}
		
		int slotStartTime = Integer.parseInt(startTime.split(":")[0]);
		int slotEndTime;
		
		if (Integer.parseInt( endTime.split(":")[1]) == 0) {
			slotEndTime = Integer.parseInt(endTime.split(":")[0]);
		}
		else {
			slotEndTime = Integer.parseInt(endTime.split(":")[0]) + 1;
		}
				
		for (Iterator<Slot> iterator = tempListOfSlots.iterator(); iterator.hasNext(); ) {
			Slot slot = iterator.next();
			
			if (Integer.parseInt(slot.getStartTime().split(":")[0]) - slotStartTime < 0) {
				iterator.remove();
			}
			else if (Integer.parseInt(slot.getStartTime().split(":")[0]) - slotEndTime >= 0) {
				iterator.remove();
			}
		}
				
		for (Iterator<Slot> iterator = tempListOfSlots.iterator(); iterator.hasNext(); ) {
			Slot slot = iterator.next();
			
			if (!slotService.findSlot(slot.getLocation(), slot.getAddress(), slot.getDate(), slot.getStartTime()).isEmpty() && allLocationsAndAddresses.contains(slot.getLocation()+","+slot.getAddress())) {
				allLocationsAndAddresses.remove(slot.getLocation()+","+slot.getAddress());
			}
		}
		
		List<JSONObject> message = new ArrayList<JSONObject>();
		int count = 0;
		
		for (String item: allLocationsAndAddresses) {
			
			JSONObject temp = new JSONObject();
			temp.put("location", item.split(",")[0]);
			temp.put("address", item.split(",")[1]);
			temp.put("startTime", slotStartTime+":00");
			temp.put("endTime", slotEndTime+":00");
			temp.put("date", date);
			temp.put("id", count);
			
			Space tempSpace = spaceService.findSpaceByLocationAndAddress(item.split(",")[0], item.split(",")[1]);
			
			temp.put("worker", tempSpace.getWorker());
			temp.put("rating", tempSpace.getRating());
			temp.put("cost", (slotEndTime - slotStartTime)*25);
			temp.put("rate", 25);
			temp.put("serviceCost", 100);
			
			count+=1;
			
			message.add(temp);
		}
		
		return message;
		
	}
	
	@GetMapping(path = "/show-unavailable-slots")
	public List<JSONObject> showUnavailableSlots(@RequestHeader Map<String,String> headers) {
		
		
		String location = headers.get("location");
		String date = headers.get("booking-date");
		String startTime = headers.get("start-time");
		String endTime = headers.get("end-time");
		
		List<Space> locationSpaces = spaceService.findSpacesByLocation(location);
		
		List<Slot> tempListOfSlots = new ArrayList<>();
		
		List<String> allLocationsAndAddresses = new ArrayList<String>();
		
		for (Space space : locationSpaces) {
//			allLocationsAndAddresses.add(space.getLocation()+","+space.getAddress());
			for (int i = 0; i < 15; i++) {
				tempListOfSlots.add(new Slot(space.getLocation(), space.getAddress(), date, String.valueOf(i+8)+":"+"00", null, null));
			}
		}
		
		int slotStartTime = Integer.parseInt(startTime.split(":")[0]);
		int slotEndTime;
		
		if (endTime.split(":")[1] == "00") {
			slotEndTime = Integer.parseInt(endTime.split(":")[0]);
		}
		else {
			slotEndTime = Integer.parseInt(endTime.split(":")[0]) + 1;
		}
				
		for (Iterator<Slot> iterator = tempListOfSlots.iterator(); iterator.hasNext(); ) {
			Slot slot = iterator.next();
			
			if (Integer.parseInt(slot.getStartTime().split(":")[0]) - slotStartTime < 0) {
				iterator.remove();
			}
			else if (Integer.parseInt(slot.getStartTime().split(":")[0]) - slotEndTime >= 0) {
				iterator.remove();
			}
		}
				
		for (Iterator<Slot> iterator = tempListOfSlots.iterator(); iterator.hasNext(); ) {
			Slot slot = iterator.next();
			
			if (!slotService.findSlot(slot.getLocation(), slot.getAddress(), slot.getDate(), slot.getStartTime()).isEmpty() && !allLocationsAndAddresses.contains(slot.getLocation()+","+slot.getAddress())) {
				allLocationsAndAddresses.add(slot.getLocation()+","+slot.getAddress());
			}
		}
		
		List<JSONObject> message = new ArrayList<JSONObject>();
		int count = 0;
		
		for (String item: allLocationsAndAddresses) {
			
			List<Slot> slots = slotService.findSlotWithoutTimeAndUsername(item.split(",")[0], item.split(",")[1], date);
			
			JSONObject finalSlot = new JSONObject();
			finalSlot.put("id", count);
			finalSlot.put("location", slots.get(0).getLocation());
			finalSlot.put("address", slots.get(0).getAddress());
			finalSlot.put("date", slots.get(0).getDate());
			
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
			
			JSONObject temp = new JSONObject();
			temp.put("location", item.split(",")[0]);
			temp.put("address", item.split(",")[1]);
			temp.put("availableFrom", String.valueOf(largest+1)+":00");
			temp.put("date", date);
			temp.put("id", count);
			
			Space tempSpace = spaceService.findSpaceByLocationAndAddress(item.split(",")[0], item.split(",")[1]);
			
			temp.put("worker", tempSpace.getWorker());
			temp.put("rating", tempSpace.getRating());
			temp.put("cost", (slotEndTime - slotStartTime)*25);
			temp.put("rate", 25);
			temp.put("serviceCost", 100);
			
			count+=1;
			
			message.add(temp);
		}
		
		return message;
		
	}
}

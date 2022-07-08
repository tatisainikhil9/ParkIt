package com.parkit;

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

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class RatingController {
	
	@Autowired
	private SpaceService spaceService;
	
	@Autowired
	private SlotService slotService;
	
	@GetMapping(path = "/rating")
	public String rating(@RequestHeader Map<String,String> headers) {
		
		int rating = Integer.parseInt(headers.get("rating"));
		String location = headers.get("location");
		String address = headers.get("address");
		String date = headers.get("bookingdate");
		String startTime = headers.get("starttime");
		String endTime = headers.get("endtime");
		
		Slot slot = slotService.findSlot(location, address, date, startTime).get(0);
		
		if (slot.getRating() != null) {
			return "Rating given";
		}
		
		slot.setRating(String.valueOf(rating));
		
		Space space = spaceService.findSpaceByLocationAndAddress(location, address);
		
		int existingRating;
		int noOfRatings;
		
		if (space.getRating() == null) {
			existingRating = 0;
		}
		else {
			existingRating = Integer.parseInt(space.getRating());
		}
		
		if (space.getNoOfRatings() == null) {
			noOfRatings = 0;
		}
		else {
			noOfRatings = Integer.parseInt(space.getNoOfRatings());
		}
		
		int newRating = ((existingRating * noOfRatings) + rating)/(noOfRatings+1);
		
		space.setRating(String.valueOf(newRating));
		space.setNoOfRatings(String.valueOf(noOfRatings+1));
		space.setTotalTime(String.valueOf(Integer.parseInt(endTime.split(":")[0]) - Integer.parseInt(startTime.split(":")[0])));
		
		spaceService.updateSpace(space);
		
		return "Success";
	}
}

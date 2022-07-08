package com.parkit;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.parkit.entity.Slot;
import com.parkit.entity.User;
import com.parkit.service.SlotService;
import com.parkit.service.UserService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class ConfirmBookingController {

	@Autowired
	private SendMail sendMail;
	
	@Autowired
	private SlotService slotService;
	
	@Autowired
	private UserService userService;
	
	@GetMapping(path = "/confirm-booking")
	public String confirmBooking(@RequestHeader Map<String,String> headers) {
		
		String location = headers.get("location");
		String address = headers.get("address");
		String date = headers.get("booking-date");
		String startTime = headers.get("start-time");
		String endTime = headers.get("end-time");
		String username = headers.get("username");
		String dryCleaning = headers.get("dry-cleaning");
		String carWash = headers.get("car-wash");
		String airFilling = headers.get("air-filling");
		String tyreRepair = headers.get("tyre-repair");
		String cost = headers.get("cost");
		String slotId = headers.get("slot-id");
		
		User user = userService.findUserByUsername(username);
		
		if (Integer.parseInt(user.getMoney()) < Integer.parseInt(cost)) {
			return "Not enough money";
		}
		else {
			
			String remainingBalance = String.valueOf(Integer.parseInt(user.getMoney()) - Integer.parseInt(cost));
			
			user.setMoney(remainingBalance);
			
			String ratingUrl = "http://localhost:3000/rating/"+slotId;
			
			String mailMessage = "Your booking for a parking space at " + address + ", " + location + " has been confirmed. Rs" + cost + " has been deducted from your wallet. Remaining balance: Rs" + remainingBalance + ". Please give your rating at: "+ratingUrl;
			sendMail.sendSimpleMessage(user.getEmail(), "Booking Confirmed", mailMessage);
		}
		
		String services = dryCleaning+","+carWash+","+airFilling+","+tyreRepair;
		
		int startTimeInt = Integer.parseInt(startTime.split(":")[0]);
		int endTimeInt = Integer.parseInt(endTime.split(":")[0]);
		
		for (int i = 0; i < (endTimeInt - startTimeInt); i++) {
			Slot temp = new Slot(location, address, date, String.valueOf(startTimeInt + i)+":00", username, services);
			slotService.saveSlot(temp);
		}
		return "Success";
	}
}

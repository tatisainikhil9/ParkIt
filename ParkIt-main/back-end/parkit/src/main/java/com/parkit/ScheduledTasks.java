package com.parkit;

import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.parkit.entity.Slot;
import com.parkit.service.SlotService;
import com.parkit.service.SpaceService;
import com.parkit.service.UserService;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Formatter;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Component
public class ScheduledTasks {
    private static final Logger logger = LoggerFactory.getLogger(ScheduledTasks.class);
    private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");
    
    @Autowired
	private UserService userService;
    
    @Autowired
	private SendMail sendMail;
    
    @Autowired
	private SlotService slotService;
    
    @Autowired
	private SpaceService spaceService;

    @Scheduled(fixedRate = 120000)
    public void scheduleTaskWithFixedRate() {
    	List<Slot> allSlots = slotService.getSlots();
		List<JSONObject> message = new ArrayList<JSONObject>();
		List<String> tempList = new ArrayList<String>();
			
		for (Slot slot: allSlots) {
			
			String temp = slot.getLocation()+","+slot.getAddress()+","+slot.getDate()+","+slot.getUsername();
			
			if (!tempList.contains(temp)) {
				tempList.add(temp);
			}
		}
		
		for (String temp: tempList) {
			String[] detailsList = temp.split(",");
			
			List<Slot> slots = slotService.findSlotWithoutTime(detailsList[0], detailsList[1], detailsList[2], detailsList[3]);
			
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
			
			Formatter formate = new Formatter();
			
			Calendar gfg_calender = Calendar.getInstance();
			
			formate = new Formatter();
			
			formate.format("%tl:%tM", gfg_calender,
                    gfg_calender);
			
			String time = String.valueOf(formate);

			int mins = Integer.parseInt(time.split(":")[1]);
			
			Date date = new Date();
			
			Calendar calendar = GregorianCalendar.getInstance();
			
			int hour = calendar.get(Calendar.HOUR_OF_DAY);
			
			
			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			LocalDateTime now = LocalDateTime.now();
			String currentDate = dtf.format(now);
			
			if (slots.get(0).getDate().equals(currentDate)) {
				if (((largest*60 + 60) - (hour*60 + mins) < 32) && ((largest*60 + 60) - (hour*60 + mins) > 30)) {
					String mailMessage = "Dear customer, your slot at "+slots.get(0).getAddress()+", "+slots.get(0).getLocation()+" ends at "+String.valueOf(largest+1)+":00.";
					
					String email = (userService.findUserByUsername(slots.get(0).getUsername())).getEmail();
					
					sendMail.sendSimpleMessage(email, "Your slot period is about to end", mailMessage);
				}
				else if ((largest*60 + 60) - (hour*60 + mins) < 0) {
					for (int i = 0; i < (largest + 1 - smallest); i++) {
						slotService.deleteSlot(slots.get(0).getLocation(), slots.get(0).getAddress(), slots.get(0).getDate(), String.valueOf(smallest + i)+":00");
					}
				}
			}
		}
		
		
    }
}

package com.parkit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.parkit.entity.Slot;
import com.parkit.repository.SlotRepository;

@Service
@Transactional
public class SlotService {

	@Autowired
	private SlotRepository slotRepository;
	
	public SlotService(SlotRepository slotRepository) {
		this.slotRepository = slotRepository;
	}
	
	public Slot saveSlot(Slot slot) {
		return slotRepository.save(slot);
	}
	
	public List<Slot> findSlot(String location, String address, String date, String startTime) {
		return slotRepository.findByLocationAndAddressAndDateAndStartTime(location, address, date, startTime);
	}
	
	public List<Slot> getSlots() {
		return slotRepository.findAll();
	}
	
	public List<Slot> findSlotByDate(String date) {
		return slotRepository.findByDate(date);
	}
	
	public List<Slot> findSlotWithoutTime(String location, String address, String date, String username) {
		return slotRepository.findByLocationAndAddressAndDateAndUsername(location, address, date, username);
	}
	
	public String deleteSlot(String location, String address, String date, String startTime) {
		slotRepository.deleteByLocationAndAddressAndDateAndStartTime(location, address, date, startTime);
		return "Deleted";
	}
	
	public List<Slot> findSlotsByUser(String username) {
		return slotRepository.findByUsername(username);
	}
	
	public String deleteSlot(Slot slot) {
		slotRepository.deleteById(slot.getId());
		return "Deleted";
	}
	
	public List<Slot> findSlotByLocationAndAddress(String location, String address) {
		return slotRepository.findByLocationAndAddress(location, address);
	}
	
	public List<Slot> findSlotWithoutTimeAndUsername(String location, String address, String date) {
		return slotRepository.findByLocationAndAddressAndDate(location, address, date);
	}
	
	public String deleteSlotByLocationAndAddress(String location, String address) {
		slotRepository.deleteByLocationAndAddress(location, address);
		return "Deleted";
	}
}

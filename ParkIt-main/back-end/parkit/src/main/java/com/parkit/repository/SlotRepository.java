package com.parkit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parkit.entity.Slot;

public interface SlotRepository extends JpaRepository<Slot, Integer >{

	List<Slot> findByLocationAndAddressAndDateAndStartTime(String location, String address, String date, String startTime);

	List<Slot> findByDate(String date);

	List<Slot> findByLocationAndAddressAndDateAndUsername(String location, String address, String date,
			String username);

	void deleteByLocationAndAddressAndDateAndStartTime(String location, String address, String date, String startTime);

	List<Slot> findByUsername(String username);

	List<Slot> findByLocationAndAddress(String location, String address);

	List<Slot> findByLocationAndAddressAndDate(String location, String address, String date);

	void deleteByLocationAndAddress(String location, String address);

}

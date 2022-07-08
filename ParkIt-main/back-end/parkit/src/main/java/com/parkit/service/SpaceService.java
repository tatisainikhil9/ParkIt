package com.parkit.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.parkit.entity.Space;
import com.parkit.repository.SpaceRepository;

@Service
@Transactional
public class SpaceService {
	@Autowired
	private SpaceRepository spaceRepository;

	public SpaceService(SpaceRepository spaceRepository) {
		this.spaceRepository = spaceRepository;
	}
	
	public Space saveSpace(Space space) {
		return spaceRepository.save(space);
	}
	
	public List<Space> findSpacesByLocation(String location) {
		return spaceRepository.findByLocation(location);
	}
	
	public Space findSpaceByLocationAndAddress(String location, String address) {
		return spaceRepository.findByLocationAndAddress(location, address);
	}
	
	public Space findSpaceByWorker(String worker) {
		return spaceRepository.findByWorker(worker).get(0);
	}
	
	public Space addWorker(Space space) {
		Space existingSpace = spaceRepository.findByLocationAndAddress(space.getLocation(), space.getAddress());
		existingSpace.setWorker(space.getWorker());
		existingSpace.setCredentials(space.getCredentials());
		return spaceRepository.save(existingSpace);
	}
	
	public Space removeWorker(String worker) {
		Space existingSpace = spaceRepository.findByWorker(worker).get(0);
		existingSpace.setWorker(null);
		existingSpace.setNoOfBookings(null);
		existingSpace.setRating(null);
		existingSpace.setNoOfRatings(null);
		existingSpace.setTotalTime(null);
		return spaceRepository.save(existingSpace);
	}
	
	public List<Space> getSpaces() {
		return spaceRepository.findAll();
	}
	
	public List<Space> findSpacesWithoutWorker() {
		return spaceRepository.findByWorker(null);
	}
	
	public Space updateSpace(Space space) {
		Space existingSpace = spaceRepository.findById(space.getId()).orElse(null);
		existingSpace.setNoOfRatings(space.getNoOfRatings());
		existingSpace.setRating(space.getRating());
		existingSpace.setNoOfBookings(space.getNoOfBookings());
		existingSpace.setNoOfRatings(space.getNoOfRatings());
		return spaceRepository.save(existingSpace);
	}
	
	public String deleteSpace(String location, String address) {
		spaceRepository.deleteByLocationAndAddress(location, address);
		return "Deleted";
	}
	
	public List<String> getLocations() {
		return spaceRepository.findDistinctLocation();
	}
	
}

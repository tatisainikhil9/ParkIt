package com.parkit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.parkit.entity.Space;

public interface SpaceRepository extends JpaRepository<Space, Integer>{

	List<Space> findByLocation(String location);

	Space findByLocationAndAddress(String location, String address);

	List<Space> findByWorker(String worker);

	void deleteByLocationAndAddress(String location, String address);

	@Query("SELECT DISTINCT s.location FROM Space s")
	List<String> findDistinctLocation();

}

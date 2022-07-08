package com.parkit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parkit.entity.Otp;

public interface OtpRepository extends JpaRepository<Otp, Integer>{

	List<Otp> findByOtp(String otp);

}

package com.parkit.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.parkit.entity.Otp;
import com.parkit.repository.OtpRepository;

@Service
@Transactional
public class OtpService {
	@Autowired
	private OtpRepository otpRepository;
	
	public OtpService(OtpRepository otpRepository) {
		this.otpRepository = otpRepository;
	}
	
	public Otp saveOtp(Otp otp) {
		return otpRepository.save(otp);
	}
	
	public List<Otp> findOtpByOtp(String otp) {
		return otpRepository.findByOtp(otp);
	}
}

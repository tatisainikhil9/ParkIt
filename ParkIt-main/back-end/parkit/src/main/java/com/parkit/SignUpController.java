package com.parkit;

import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.parkit.entity.Otp;
import com.parkit.entity.User;
import com.parkit.service.OtpService;
import com.parkit.service.UserService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class SignUpController {
	
	@Autowired
	private SendMail sendMail;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private OtpService otpService;
	
	@GetMapping(path = "/signup")
    public String signUp(@RequestHeader Map<String,String> headers) {
		
		String username = headers.get("username");
		String firstName = headers.get("firstname");
		String lastName = headers.get("lastname");
		String credentials = headers.get("credentials");
		String address = headers.get("address");
		String email = headers.get("email");
		String phone = headers.get("phone");
		String carnumber = headers.get("carnumber");
		
		
		if (userService.findUserByUsername(username) != null) {
			return "Username exists";
		};
		
		if (userService.findUserByEmail(email) != null) {
			return "Email exists";
		};
		
		if (userService.findUserByPhone(phone) != null) {
			return "Phone exists";
		};
					
		Random random = new Random();
		String otp = String.format("%04d", random.nextInt(10000));
		
		Otp otpObject = new Otp(otp, username, firstName, lastName, credentials, address, email, phone, carnumber);
		
		otpService.saveOtp(otpObject);
				
		sendMail.sendSimpleMessage(email, "OTP", "OTP for sign up: "+otp);
		
		return "Otp sent";
		
    }
	
	@GetMapping(path = "/add-user")
    public String addUser(@RequestHeader Map<String,String> headers) {
		
		String otp = headers.get("otp");
		
		Otp otpObject = otpService.findOtpByOtp(otp).get(0);
		
		if (otpObject.getOtp().equals(otp)) {
			User userToBeAdded = new User(otpObject.getUsername(), otpObject.getFirstName(), otpObject.getLastName(), otpObject.getCredentials(), otpObject.getAddress(), otpObject.getEmail(), otpObject.getPhone(), otpObject.getCarNumber());
			if(userService.saveUser(userToBeAdded) != null) {
				return "User saved";
			}
			else {
				return "Failed";
			}
		}
		else {
			return "Invalid OTP";
		}
    }
}

package com.parkit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ParkitApplication {

	public static void main(String[] args) {
		SpringApplication.run(ParkitApplication.class, args);
	}

}

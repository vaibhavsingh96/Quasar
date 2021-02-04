package com.witech.quasar.model;

import java.io.Serializable;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

public class FileRequest implements Serializable{

	 private static final long serialVersionUID = 1L;
	  
	 private double longitude;
	  
	 private double latitude;
	  
	 private double altitude;
	  
	 private String satellite;
	  
	 private double frequency;
	  
	 private double rate;
	  
	 private String time;
	
	 public FileRequest() {
	 }

	public FileRequest(double longitude, double latitude, double altitude,
			String satellite, double frequency, double rate, String time) {
		super();
		this.longitude = longitude;
		this.latitude = latitude;
		this.altitude = altitude;
		this.satellite = satellite;
		this.frequency = frequency;
		this.rate = rate;
		this.time = time;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public double getAltitude() {
		return altitude;
	}

	public void setAltitude(double altitude) {
		this.altitude = altitude;
	}

	public String getSatellite() {
		return satellite;
	}

	public void setSatellite(String satellite) {
		this.satellite = satellite;
	}

	public double getFrequency() {
		return frequency;
	}

	public void setFrequency(double frequency) {
		this.frequency = frequency;
	}

	public double getRate() {
		return rate;
	}

	public void setRate(double rate) {
		this.rate = rate;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}
	
	public String toString() {
		return this.longitude + " " + this.satellite + " " +this.time;
	}
}
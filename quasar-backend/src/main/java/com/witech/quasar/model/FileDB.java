package com.witech.quasar.model;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "files")
public class FileDB {
  @Id
  @GeneratedValue(generator = "uuid")
  @GenericGenerator(name = "uuid", strategy = "uuid2")
  private String id;

  private String name;
  
  private double longitude;
  
  private double latitude;
  
  private double altitude;
  
  private String satellite;
  
  private double frequency;
  
  private double rate;
  
  private String time;

  @Lob
  private byte[] data;

  public FileDB(String name, double longitude, 
		  double latitude, double altitude, String satellite, 
		  double frequency, double rate, String time, byte[] data) {
    this.name = name;
    this.longitude = longitude;
    this.latitude = latitude;
    this.altitude = altitude;
    this.satellite = satellite;
    this.frequency = frequency;
    this.rate = rate;
    this.time = time;  
    this.data = data;
  }

	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
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
	
	public byte[] getData() {
		return data;
	}
	
	public void setData(byte[] data) {
		this.data = data;
	}

}
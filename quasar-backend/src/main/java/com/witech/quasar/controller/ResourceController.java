package com.witech.quasar.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

import javax.validation.Valid;

import org.apache.commons.io.IOUtils;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.witech.quasar.model.User;
import com.witech.quasar.repository.UserRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.witech.quasar.model.FileRequest;
import com.witech.quasar.model.MessageResponse;
import com.witech.quasar.service.FileStorageService;

@RestController
@CrossOrigin(origins="http://localhost:3000", maxAge = 3600)
@RequestMapping("/")
public class ResourceController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private FileStorageService storageService;
	
	@GetMapping("/users")
	public List<User> getUsers(){
		return userRepository.findAll();
	}
	
	@PostMapping("/user-detail")
	public User getUserDetail(@Valid @RequestBody User user){
		return userRepository.findByUsername(user.getUsername())
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + user.getUsername()));
	}
	
	
	@PostMapping("/upload")
	public ResponseEntity<MessageResponse> uploadFile(@RequestParam("metas") String metas, @RequestParam("files") MultipartFile[] files, @RequestParam("username") String username) throws IOException{	
 		ObjectMapper objectMapper = new ObjectMapper();
		FileRequest[] fileRequests = objectMapper.readValue(metas, FileRequest[].class);
		
		String message = "";
	      
	    //System.out.println("files: " + files.length);
		
		// Read properties file
		String f = "src/main/resources/setting.properties";
		Properties props = new Properties();
		props.load(new FileInputStream(f));
		String filePath = props.getProperty("filePath");
		
		// store file and metaFile into local file system
		for (int i = 0; i < fileRequests.length; i++) {
			// get file
			MultipartFile file = files[i];
			FileRequest fileRequest = fileRequests[i];
			// store meta-date file
			String s1 = "longitude: " + fileRequest.getLatitude();
			String s2 = "latitude: " + fileRequest.getLatitude();
			String s3 = "altitude: " + fileRequest.getAltitude();
			String s4 = "satellite: " + fileRequest.getSatellite();
			String s5 = "frequency: " + fileRequest.getFrequency();
			String s6 = "rate: " + fileRequest.getRate();
			String s7 = "time: " + fileRequest.getTime();
			File meta_file = new File(filePath + username + "/meta/" + file.getOriginalFilename());
			// if folder doesn't exist, create new folder
			if (!meta_file.exists()) {
				File dir = new File(meta_file.getParent());
				dir.mkdirs();
				meta_file.createNewFile();
			}
			try {
				FileOutputStream outStream = new FileOutputStream(meta_file);
				outStream.write(s1.getBytes());
				outStream.write("\r\n".getBytes());
				outStream.write(s2.getBytes());
				outStream.write("\r\n".getBytes());
				outStream.write(s3.getBytes());
				outStream.write("\r\n".getBytes());
				outStream.write(s4.getBytes());
				outStream.write("\r\n".getBytes());
				outStream.write(s5.getBytes());
				outStream.write("\r\n".getBytes());
				outStream.write(s6.getBytes());
				outStream.write("\r\n".getBytes());
				outStream.write(s7.getBytes());
				outStream.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
			// store file
			try {
				File file_file = new File(filePath + username + "/file/" + file.getOriginalFilename());
				if (!file_file.exists()) {
					File dir = new File(file_file.getParent());
					dir.mkdirs();
					file_file.createNewFile();
				}
				file.transferTo(file_file);
			} catch (Exception e) {
				e.printStackTrace();
			}
			try {
				File decoded_data_folder = new File(filePath + "decoded_data/");
				if (!decoded_data_folder.exists()) {
					decoded_data_folder.mkdirs();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			try {
				File data_folder = new File(filePath + username + "/data/");
				if (!data_folder.exists()) {
					data_folder.mkdirs();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			try {
				File raw_data_folder = new File(filePath + username + "/raw_data/");
				if (!raw_data_folder.exists()) {
					raw_data_folder.mkdirs();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		try {
			  message = "Uploaded the file successfully";
			  return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
			} catch (Exception e) {
			  message = "Could not upload the file!";
			  return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
		}
	}
	
	// Get data image
	@GetMapping(value = "/data")
	public ResponseEntity getData(@RequestParam("username") String username) throws IOException {
		// Read properties file
		String propertyFile = "src/main/resources/setting.properties";
		Properties props = new Properties();
		props.load(new FileInputStream(propertyFile));
		String filePath = props.getProperty("filePath");
		String path = filePath + username + "/data/";
		File[] files = new File(path).listFiles();
		String imagePath = "";
		String[] postfixes_image = {"png", "jpg", "jpeg"};
		String[] postfixes_audio = {"wav", "ogg", "mp3"};
		String imageOrAudio = "";
		String type = "";
		for(File file : files) {
			for (String postfix : postfixes_image) {
				if(file.getName().endsWith(postfix)) {
					imagePath = file.getAbsolutePath();
					type = postfix;
					imageOrAudio = "image/";
					break;
				}
			}
			for (String postfix : postfixes_audio) {
				if(file.getName().endsWith(postfix)) {
					imagePath = file.getAbsolutePath();
					type = postfix;
					imageOrAudio = "audio/";
					break;
				}
			}
		}
		InputStream in = new FileInputStream(imagePath);
		HttpHeaders headers = new HttpHeaders();
	    headers.add(HttpHeaders.CONTENT_TYPE, imageOrAudio + type);
		return ResponseEntity.ok()
	            .headers(headers)
	            .body(IOUtils.toByteArray(in));
	}
	
	// Get raw data image
	@GetMapping(value = "/rawdata")
	public ResponseEntity getRawData(@RequestParam("username") String username) throws IOException {
		// Read properties file
		String propertyFile = "src/main/resources/setting.properties";
		Properties props = new Properties();
		props.load(new FileInputStream(propertyFile));
		String filePath = props.getProperty("filePath");
		String path = filePath + username + "/raw_data/";
		File[] files = new File(path).listFiles();
		String imagePath = "";
		String[] postfixes_image = {"png", "jpg", "jpeg"};
		String[] postfixes_audio = {"wav", "ogg", "mp3"};
		String imageOrAudio = "";
		String type = "";
		for(File file : files) {
			for (String postfix : postfixes_image) {
				if(file.getName().endsWith(postfix)) {
					imagePath = file.getAbsolutePath();
					type = postfix;
					imageOrAudio = "image/";
					break;
				}
			}
			for (String postfix : postfixes_audio) {
				if(file.getName().endsWith(postfix)) {
					imagePath = file.getAbsolutePath();
					type = postfix;
					imageOrAudio = "audio/";
					break;
				}
			}
		}
		InputStream in = new FileInputStream(imagePath);
		HttpHeaders headers = new HttpHeaders();
	    headers.add(HttpHeaders.CONTENT_TYPE, imageOrAudio + type);
		return ResponseEntity.ok()
	            .headers(headers)
	            .body(IOUtils.toByteArray(in));
	}
	
	// Get decoded data image
	@GetMapping(value = "/decodeddata", produces = MediaType.IMAGE_PNG_VALUE)
	public @ResponseBody byte[] getDecodedData() throws IOException {
		// Read properties file
		String propertyFile = "src/main/resources/setting.properties";
		Properties props = new Properties();
		props.load(new FileInputStream(propertyFile));
		String filePath = props.getProperty("filePath");
		String path = filePath + "decoded_data/";
		File[] files = new File(path).listFiles();
		String imagePath = "";
		for(File file : files) {
			if(file.getName().endsWith(".png")) {
				imagePath = file.getAbsolutePath();
				break;
			}
		}
		System.out.println("decoded: " + imagePath);
		// response with image
		InputStream in = new FileInputStream(imagePath);
		return IOUtils.toByteArray(in);
	}
	
}

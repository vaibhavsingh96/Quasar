package com.witech.quasar.controller;

import java.io.IOException;
import java.util.Date;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.witech.quasar.config.JwtUtil;
import com.witech.quasar.model.AuthenticationRequest;
import com.witech.quasar.model.AuthenticationResponse;
import com.witech.quasar.model.FileRequest;
import com.witech.quasar.model.MessageResponse;
import com.witech.quasar.model.User;
import com.witech.quasar.model.UserRequest;
import com.witech.quasar.repository.UserRepository;
import com.witech.quasar.service.JwtUserDetailsService;

/*
 * This file contains authentication rest API
 * receives the username and password for authentication
 * returns JWT token on successful response
 */

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping("/")
public class JwtAuthenticationController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private JwtUserDetailsService jwtUserDetailsService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private UserRepository userRepository;
	
	
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@RequestParam("user") String user, @RequestParam("file") MultipartFile file) throws IOException {
 		ObjectMapper objectMapper = new ObjectMapper();
		UserRequest userRequest = objectMapper.readValue(user, UserRequest.class);
		
		if (userRepository.existsByUsername(userRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(userRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		User new_user = new User(userRequest.getUsername(), 
							 userRequest.getEmail(),
							 userRequest.getLocation(),
							 bCryptPasswordEncoder.encode(userRequest.getPassword()),
							 file.getBytes()
						);

		userRepository.save(new_user);
		
		// send email to user, user.getEmail()
		try {
			sendmail(userRequest.getUsername(), userRequest.getEmail());
		} catch (AddressException e) {
			e.printStackTrace();
		} catch (MessagingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
	
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody AuthenticationRequest authenticationRequest) throws Exception {

		try {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),  authenticationRequest.getPassword())
			);
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}
		catch (BadCredentialsException e) {
			throw new Exception("Incorrect username or password", e);
		}
		
		final UserDetails userDetails = jwtUserDetailsService
				.loadUserByUsername(authenticationRequest.getUsername());

		final String jwt = jwtUtil.generateToken(userDetails);

		return ResponseEntity.ok(new AuthenticationResponse(jwt, authenticationRequest.getUsername()));
	}
	
	// write a method to send the email
	private void sendmail(String username, String email) throws AddressException, MessagingException, IOException {
		   Properties props = new Properties();
		   props.put("mail.smtp.auth", "true");
		   props.put("mail.smtp.starttls.enable", "true");
		   props.put("mail.smtp.host", "smtp.gmail.com");
		   props.put("mail.smtp.port", "587");
		   
		   Session session = Session.getInstance(props, new javax.mail.Authenticator() {
		      protected PasswordAuthentication getPasswordAuthentication() {
		         return new PasswordAuthentication("quasarservice1234@gmail.com", "Quasar@1234");
		      }
		   });
		   Message msg = new MimeMessage(session);
		   msg.setFrom(new InternetAddress("quasarservice1234@gmail.com", false));

		   msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
		   msg.setSubject("Registration Confirmation");
		   msg.setContent("Hello " + username + ", welcome to use Quasar App!", "text/html");
		   msg.setSentDate(new Date());

		   Transport.send(msg);   
		}
	
}

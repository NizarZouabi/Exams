package com.exam.lyricslab.services;

import java.util.List;
import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import com.exam.lyricslab.models.LoginUser;
import com.exam.lyricslab.models.Song;
import com.exam.lyricslab.models.User;
import com.exam.lyricslab.repositories.SongRepository;
import com.exam.lyricslab.repositories.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private SongRepository songRepository;
	
	public User register(User newUser, BindingResult result) {
		Optional<User> userEmail = userRepository.findByEmail(newUser.getEmail());
		
		if(userEmail.isPresent()) {
			result.rejectValue("email", "Exist", "this Email is already taken.");
			return null;
		}
		
		if(!newUser.getPassword().equals(newUser.getConfirmPass())) {
			result.rejectValue("confirmPass", "Matches", "The Password confirmation must match Password.");
			return null;
		}
		
		if (result.hasErrors()) {
			return null;
		}
		
		String hashed = BCrypt.hashpw(newUser.getPassword(), BCrypt.gensalt());
		newUser.setPassword(hashed);
		return userRepository.save(newUser);
	}
	
	public User login(LoginUser newLogin, BindingResult result) {
		Optional<User> userEmail = userRepository.findByEmail(newLogin.getEmail());
		
		if(!userEmail.isPresent()) {
			result.rejectValue("email", "NotExist", "Email doesn't exist.");
			return null;
		}
		
		User existingUser = userEmail.get();
			
		if (!BCrypt.checkpw(newLogin.getPassword(), existingUser.getPassword()) && newLogin.getPassword() != null) {
			result.rejectValue("password", "Matches", "Invalid Password.");
			return null;
		}
		
		if(result.hasErrors()) {
			return null;
		}
		
		return existingUser;
	}
	
	public User oneUser(Long id) {
		Optional<User> optionalUser = userRepository.findById(id);
		if(optionalUser.isPresent()) {
			User existingUser = optionalUser.get();
			return existingUser;
		} else {
			return null;
		}
	}
	
	public void linkUserWithSong(Long userId, Long songId) {
		Optional<Song> optionalSong = songRepository.findById(songId);
		User user = this.oneUser(userId);
		if (optionalSong.isPresent()) {
	        Song existingSong = optionalSong.get();
	        if (!user.getSongs().contains(existingSong)) {
	            user.getSongs().add(existingSong);
	            userRepository.save(user);
	        }
	    }
	}
	
	public void unlinkCreatorSong(Long songId, Long creatorId) {
		Optional<User> optionalUser = userRepository.findById(creatorId);
	    Optional<Song> optionalSong = songRepository.findById(songId);
	    if (optionalUser.isPresent() && optionalSong.isPresent()) {
	        User user = optionalUser.get();
	        Song song = optionalSong.get();
	        user.getSongs().remove(song);
	        userRepository.save(user);
	        boolean hasRemainingContributors = song.getUsers().isEmpty();

	        if (!hasRemainingContributors) {
	            List<User> users = userRepository.findAll();
	            for (User otherUser : users) {
	                otherUser.getSongs().remove(song);
	                userRepository.save(otherUser);
	            }
	        }
	    }
	}
}

package com.exam.lyricslab.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.exam.lyricslab.models.LoginUser;
import com.exam.lyricslab.models.Song;
import com.exam.lyricslab.models.User;
import com.exam.lyricslab.services.SongService;
import com.exam.lyricslab.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@Controller
public class MainController {
	@Autowired
    private UserService userService;
	
	@Autowired
	private SongService songService;
	
	@GetMapping("/")
    public String index(@ModelAttribute("newUser") User newUser, @ModelAttribute("newLogin") LoginUser newLogin, Model model, HttpSession session) {
		if (session.getAttribute("userId") != null) {
			return "redirect:/dashboard";
		}
		model.addAttribute("newUser", new User());
        model.addAttribute("newLogin", new LoginUser());
        return "login.jsp";
    }
    
    @GetMapping("/dashboard")
    public String home(Model model, HttpSession session) {
    	Long userId = (Long) session.getAttribute("userId");
    	String firstName = (String) session.getAttribute("firstName");
    	String lastName = (String) session.getAttribute("lastName");
    	List<Song> songs = songService.allSongs();
    	model.addAttribute("songs", songs);
    	if(userId == null) {
    		return "redirect:/";
    	} else {
    		model.addAttribute("userId", userId);
    		model.addAttribute("firstName", firstName);
    		model.addAttribute("lastName", lastName);
    		return "songslist.jsp";
    	}
    }
    
    @PostMapping("/register")
    public String register(@Valid @ModelAttribute("newUser") User newUser, 
            BindingResult result, Model model, HttpSession session) {
    	User user = userService.register(newUser, result);
        if(result.hasErrors()) {
            model.addAttribute("newLogin", new LoginUser());
            return "login.jsp";
        }
        
        userService.register(newUser, result);
        session.setAttribute("userId", user.getId());
        session.setAttribute("firstName", user.getFirstName());
        session.setAttribute("lastName", user.getLastName());
        return "redirect:/dashboard";
    }
    
    @PostMapping("/login")
    public String login(@Valid @ModelAttribute("newLogin") LoginUser newLogin, 
            BindingResult result, Model model, HttpSession session) {
    	User user = userService.login(newLogin, result);
        if(result.hasErrors()) {
            model.addAttribute("newUser", new User());
            return "login.jsp";
        } else {
        	session.setAttribute("userId", user.getId());
        	session.setAttribute("firstName", user.getFirstName());
            session.setAttribute("lastName", user.getLastName());
        	return "redirect:/dashboard";
        }
      }
    
    @PostMapping("/logout")
    public String logout(HttpSession session) {
    	session.invalidate();
    	return "redirect:/";
    }
    
    @GetMapping("/songs/new")
    public String addSong(@ModelAttribute("song") Song song, HttpSession session, Model model) {
    	Long userId = (Long) session.getAttribute("userId");
    	if(userId == null) {
    		return "redirect:/";
    		}
    	model.addAttribute("userId", userId);
    	return "newsong.jsp";
    }
    
    @PostMapping("/songs/create")
    public String createSong(@Valid @ModelAttribute("song") Song song, BindingResult result ,HttpSession session, @RequestParam("creatorId") Long creatorId) {
    	Long userId = (Long) session.getAttribute("userId");
    	if(result.hasErrors()) {
    		return "newsong.jsp";
    	}
        songService.addSong(song);
    	Long songId = song.getId();
    	userService.linkUserWithSong(userId, songId);
    	return "redirect:/dashboard";
    }
    
    @GetMapping("/songs/{songId}")
    public String songDetails(@PathVariable("songId") Long songId,@ModelAttribute("song") Song song, Model model,HttpSession session) {
    	Long userId = (Long) session.getAttribute("userId");
    	if(userId == null) {
    		return "redirect:/";
    		}
    	Song oneSong = songService.oneSong(songId);
    	User creator = userService.oneUser(oneSong.getCreatorId());
    	model.addAttribute("song", oneSong);
    	model.addAttribute("creator", creator);
    	return "details.jsp";
    }
    
    @GetMapping("/songs/{songId}/edit")
    public String contributing(@PathVariable("songId") Long songId, @ModelAttribute("song") Song song, Model model, HttpSession session) {
    	Long userId = (Long) session.getAttribute("userId");
    	if(userId == null) {
    		return "redirect:/";
    	} else {
    		model.addAttribute("userId", userId);
        	Song collabsong = songService.oneSong(songId);
        	model.addAttribute("song", collabsong);
        	return "contribution.jsp";
    	}
    }
    
    @PutMapping("/songs/{songId}/update")
    public String contribute(@PathVariable("songId") Long songId, @Valid @ModelAttribute("song") Song song, BindingResult result, HttpSession session, Model model,
    		@RequestParam("creatorId") Long creatorId) {
    	model.addAttribute("songId", songId);
    	if(result.hasErrors()) {
    		return "contribution.jsp";
    	} else {
    		Long userId = (Long) session.getAttribute("userId");
    		List<User> linkedUsers = songService.oneSong(songId).getUsers();
    		song.setUsers(linkedUsers);
    		songService.updateSong(songId, userId, song);
    		return "redirect:/dashboard";
    	}
    }
    
    @DeleteMapping("/songs/{songId}/delete/{creatorId}")
    public String remove(@PathVariable("songId") Long songId, @PathVariable("creatorId") Long creatorId) {
    	userService.unlinkCreatorSong(creatorId, songId);
    	songService.deleteSong(songId);
    	return "redirect:/dashboard";
    }
}

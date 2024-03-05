package com.exam.lyricslab.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.exam.lyricslab.models.Song;
import com.exam.lyricslab.models.User;
import com.exam.lyricslab.repositories.SongRepository;
import com.exam.lyricslab.repositories.UserRepository;

@Service
public class SongService {
	@Autowired
	private SongRepository songRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	
	public List<Song> allSongs(){
		return songRepository.findAll();
	}
	
	public Song addSong(Song song) {
		return songRepository.save(song);
	}
	
	public Song oneSong(Long id) {
		Optional<Song> optionalSong = songRepository.findById(id);
		if(optionalSong.isPresent()) {
		    Song existingSong = optionalSong.get();
			return existingSong;
		} else {
			return null;
		}
	}
	
	public Song updateSong(Long songId, Long userId, Song song) {
		Optional<Song> optionalSong = songRepository.findById(songId);
		if(optionalSong.isPresent()) {
			Song existingSong = optionalSong.get();
			existingSong.setTitle(song.getTitle());
			existingSong.setGenre(song.getGenre());
			String addLyrics = existingSong.getLyrics() + "\n" + song.getLyrics();
			existingSong.setLyrics(addLyrics);
			Optional<User> contributor = userRepository.findById(userId);
			if(contributor.isPresent()) {
				User existingContributor = contributor.get();
				if (!existingSong.getUsers().contains(existingContributor)) {
					existingContributor.getSongs().add(existingSong);
				}
			}
			
			
			songRepository.save(existingSong);
			return existingSong;
		} else {
			return null;
		}
	}
	
	public void deleteSong(Long songId) {
		songRepository.deleteById(songId);
		}
}

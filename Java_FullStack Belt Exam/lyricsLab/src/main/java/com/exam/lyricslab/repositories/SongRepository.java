package com.exam.lyricslab.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.exam.lyricslab.models.Song;

public interface SongRepository extends CrudRepository<Song,Long> {
	List<Song> findAll();
	Long findById(Song id);
	Long deleteById(Song id);
}

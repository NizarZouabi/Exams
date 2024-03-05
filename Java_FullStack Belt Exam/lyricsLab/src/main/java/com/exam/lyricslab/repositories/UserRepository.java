package com.exam.lyricslab.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.exam.lyricslab.models.User;

public interface UserRepository extends CrudRepository<User,Long> {
	Long findById(User id);
	Optional<User> findByEmail(String email);
	List<User> findAll();
}

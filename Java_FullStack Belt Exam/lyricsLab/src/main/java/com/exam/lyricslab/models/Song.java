package com.exam.lyricslab.models;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="songs")
public class Song {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotNull
	private Long creatorId;
	@NotEmpty(message="Title required.")
	@Size(min=3, max=128, message="Title must be at least 3 characters long.")
	private String title;
	@NotEmpty(message="Genre is required.")
	@Size(min=3, max=45, message="Genre must be at least 3 characters long.")
	private String genre;
	@NotEmpty(message="Lyrics is required.")
	@Size(min=5, max=800, message="Lyrics must be at least 5 characters long.")
	private String lyrics;
	@Column(updatable=false)
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date createdAt;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date updatedAt;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "users_songs", 
        joinColumns = @JoinColumn(name = "song_id"), 
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> users;
    
    public Song() {}
    
    public Song(Long creatorId, String title, String genre, String lyrics) {
    	this.creatorId = creatorId;
    	this.title = title;
    	this.genre = genre;
    	this.lyrics = lyrics;
    }
    
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(Long creatorId) {
		this.creatorId = creatorId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public String getLyrics() {
		return lyrics;
	}

	public void setLyrics(String lyrics) {
		this.lyrics = lyrics;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	@PrePersist
    protected void onCreate(){
        this.createdAt = new Date();
    }
	
    @PreUpdate
    protected void onUpdate(){
        this.updatedAt = new Date();
    }
}

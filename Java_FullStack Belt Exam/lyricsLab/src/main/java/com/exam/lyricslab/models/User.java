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
import jakarta.persistence.Transient;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="users")
public class User {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty(message="Firstname is required.")
    @Size(min=3, max=45, message="Firstname must be between 3 and 45 characters")
    private String firstName;
    @NotEmpty(message="Lastname is required.")
    @Size(min=3, max=45, message="Lastname must be between 3 and 45 characters")
    private String lastName;
    @NotEmpty(message="Email is required.")
    @Email(message="Please enter a valid email.")
    private String email;
    @NotEmpty(message="Password is required.")
    @Size(min=8, max=128, message="Password must be between 8 and 128 characters")
    private String password;
    @Transient
    @NotEmpty(message="Please confirm your password.")
    @Size(min=8, max=128, message="Confirm Password must be between 8 and 128 characters")
    private String confirmPass;
    @Column(updatable=false)
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date createdAt;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date updatedAt;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "users_songs", 
        joinColumns = @JoinColumn(name = "user_id"), 
        inverseJoinColumns = @JoinColumn(name = "song_id")
    )
    private List<Song> songs;
  
    public User() {}
    
    public User(String firstName, String lastName, String email, String password, String confirmPass) {
    	this.firstName = firstName;
    	this.lastName = lastName;
    	this.email = email;
    	this.password = password;
    	this.confirmPass = confirmPass;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmPass() {
		return confirmPass;
	}

	public void setConfirmPass(String confirmPass) {
		this.confirmPass = confirmPass;
	}
	
	public List<Song> getSongs() {
		return songs;
	}

	public void setSongs(List<Song> songs) {
		this.songs = songs;
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

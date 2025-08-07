package com.leavemanagement.leavemanagement.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leavemanagement.leavemanagement.model.User;
import com.leavemanagement.leavemanagement.services.UserService;




@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")

public class UserController {

    @Autowired
    private UserService userService;

    
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    // Get all users 
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Get a user by id 
    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // Update an existing user 
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userService.updateUser(id, updatedUser);
    }

    // Delete a user (Employee/Manager)
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
    @PostMapping("/login")
public User loginUser(@RequestBody Map<String, String> credentials) {
    String email = credentials.get("email");
    String password = credentials.get("password");
    return userService.login(email, password);
}

@PostMapping("/register")
public User registerUser(@RequestBody User user) {
    return userService.registerUser(user);
}
}
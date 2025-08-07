package com.leavemanagement.leavemanagement.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leavemanagement.leavemanagement.model.Role;
import com.leavemanagement.leavemanagement.model.User;
import com.leavemanagement.leavemanagement.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Create a new user (Admin creates users)
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by id
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Update an existing user
    public User updateUser(Long id, User updatedUser) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setRole(updatedUser.getRole());  // Managing roles like 'EMPLOYEE', 'MANAGER'
            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }

    // Delete a user
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // Assign role to user (admin only)
    public User assignRoleToUser(Long userId, Role role) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setRole(role);  // Assign the appropriate role (EMPLOYEE or MANAGER)
            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found with id: " + userId);
        }
    }


    public User login(String email, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getPassword().equals(password)) {
                //System.out.println("Login successful for user: ");
                return user;
            }
        }
        throw new RuntimeException("Invalid email or password");
    }

    public User registerUser(User user) {
    Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
    if (existingUser.isPresent()) {
        throw new RuntimeException("User already exists with email: " + user.getEmail());
    }

    return userRepository.save(user);
}
}
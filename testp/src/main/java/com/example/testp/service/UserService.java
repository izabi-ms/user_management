package com.example.testp.service;
import com.example.testp.model.User;
import org.springframework.stereotype.Service;
 
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;
 
@Service  // Marks this as a Spring-managed service
public class UserService {
    private final List<User> users = new ArrayList<>();
    private final AtomicLong counter = new AtomicLong(1);  // Auto-increment ID
 
    // Mock initial data
    public UserService() {
        users.add(new User(counter.getAndIncrement(), "John Doe", "john@example.com"));
        users.add(new User(counter.getAndIncrement(), "Jane Smith", "jane@example.com"));
    }
 
    // Get all users
    public List<User> getAllUsers() {
        return users;
    }
 
    // Get user by ID
    public Optional<User> getUserById(Long id) {
        return users.stream().filter(user -> user.getId().equals(id)).findFirst();
    }
 
    // Create a new user
    public User createUser(User user) {
        user.setId(counter.getAndIncrement());
        users.add(user);
        return user;
    }
}

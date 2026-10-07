package com.example.testp.controller;
import com.example.testp.model.User;
import com.example.testp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")  // Base URL for user endpoints
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
 
    private final UserService userService;
 
    @Autowired  // Inject UserService (Spring handles dependency injection)
    public UserController(UserService userService) {
        this.userService = userService;
    }
 
    // GET /api/users: Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
 
    // GET /api/users/{id}: Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }
 
    // POST /api/users: Create a new user
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)  // Return 201 Created on success
    public User createUser(@RequestBody User user) {  // @RequestBody parses JSON from request
        return userService.createUser(user);
    }
}

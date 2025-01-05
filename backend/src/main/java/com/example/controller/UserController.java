package com.example.controller;

import com.example.dto.UserRequest;
import com.example.model.Country;
import com.example.model.User;
import com.example.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;

    }
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        System.out.println("Received user: " + user.toString());
        // Save the user or process it
        return ResponseEntity.ok("User registered successfully with phone and notes!");
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/users")
    public ResponseEntity<String> addUser(@RequestBody UserRequest userRequest) {
        userService.prepareAndSaveUser(userRequest);
        return ResponseEntity.ok("User successfully registered!");
    }
    @PatchMapping("users/{id}/status")
    public ResponseEntity<String> updateUserStatus(@PathVariable Long id, @RequestBody Map<String, Boolean> statusUpdate) {
        boolean isActive = statusUpdate.get("isActive");
        userService.updateUserStatus(id, isActive);
        return ResponseEntity.ok("User status updated successfully");
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = userService.updateUser(id, updatedUser);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/users/search")
    public List<User> searchUsers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String surname,
            @RequestParam(required = false) Country country,
            @RequestParam(required = false) Integer birthDate) {

        name = (name != null) ? name.trim() : null;
        surname = (surname != null) ? surname.trim() : null;

        return userService.searchUsers(name, surname, country, birthDate);
    }
    @GetMapping("/users/sort")
    public List<User> getUsersSorted(
            @RequestParam(required = false, defaultValue = "id") String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String sortDir) {

        return userService.getUsersSorted(sortBy, sortDir);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/users/all")
    public ResponseEntity<Void> deleteAllUsersAndId() {
        userService.deleteAllUsersAndResetId();
        return ResponseEntity.noContent().build();
    }


}

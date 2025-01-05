package com.example.service;

import com.example.dto.UserRequest;
import com.example.model.Country;
import com.example.model.Course;
import com.example.model.Subcategory;
import com.example.model.User;
import com.example.repository.CourseRepository;
import com.example.repository.SubcategoryRepository;
import com.example.repository.UserRepository;
import jakarta.persistence.criteria.Predicate;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final SubcategoryRepository subcategoryRepository;
    private final PasswordEncoder passwordEncoder;
    private final Validator validator;

    public UserService(UserRepository userRepository, CourseRepository courseRepository, SubcategoryRepository subcategoryRepository, PasswordEncoder passwordEncoder, Validator validator) {
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.subcategoryRepository = subcategoryRepository;
        this.passwordEncoder = passwordEncoder;
        this.validator = validator;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User prepareAndSaveUser(UserRequest userRequest) {
        if (userRequest.getCourseId() == null) {
            throw new IllegalArgumentException("Course ID cannot be null");
        }
        Course course = courseRepository.findById(userRequest.getCourseId())
                .orElseThrow(() -> new IllegalArgumentException("Course not found"));

        // Find and set subcategory
        Subcategory subcategory = subcategoryRepository.findById(userRequest.getSubcategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Subcategory not found"));

        // Create and save user
        User user = new User();
        user.setName(userRequest.getFirstName());
        user.setSurname(userRequest.getLastName());
        user.setBirthYear(userRequest.getBirthYear());
        user.setEmail(userRequest.getEmail());
        user.setPhone(userRequest.getPhone());
        user.setNotes(userRequest.getNotes());
        user.setCountry(Country.valueOf(userRequest.getCountry()));
        user.setCourse(course);
        user.setSubcategory(subcategory);
        user.setPasswordHash(userRequest.getPassword());
        return saveUser(user);
    }

    public void toggleUserStatus(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setIsActive(!user.getIsActive());
        userRepository.save(user);
    }
    public void updateUserStatus(Long userId, boolean isActive) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setIsActive(isActive);
        userRepository.save(user);
    }

    public User saveUser(User user) {
        checkCategory(user);
        validateUserPassword(user);
        String hashedPassword = passwordEncoder.encode(user.getPasswordHash());
        user.setPasswordHash(hashedPassword);
        return userRepository.save(user);
    }

    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setName(updatedUser.getName());
            user.setSurname(updatedUser.getSurname());
            user.setBirthYear(updatedUser.getBirthYear());
            user.setEmail(updatedUser.getEmail());
            user.setPasswordHash(updatedUser.getPasswordHash());
            user.setCountry(updatedUser.getCountry());
            if (updatedUser.getCourse() != null) {
                user.setCourse(updatedUser.getCourse());
            }
            if (updatedUser.getSubcategory() != null) {
                user.setSubcategory(updatedUser.getSubcategory());
            }
            return userRepository.save(user);
        }).orElse(null);
    }

    public List<User> searchUsers(String name, String surname, Country country, Integer birthDate) {
        return userRepository.findAll((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (name != null && !name.isBlank()) {
                predicates.add(criteriaBuilder.like(root.get("name"), "%" + name + "%"));
            }
            if (surname != null && !surname.isBlank()) {
                predicates.add(criteriaBuilder.like(root.get("surname"), "%" + surname + "%"));
            }
            if (country != null) {
                predicates.add(criteriaBuilder.equal(root.get("country"), country));
            }
            if (birthDate != null) {
                predicates.add(criteriaBuilder.equal(root.get("birthYear"), birthDate));
            }


            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }

    public List<User> getUsersSorted(String sortBy, String sortDir) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDir), sortBy);
        return userRepository.findAll(sort);
    }


    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        if (!user.getIsActive()) {
            userRepository.delete(user);
        }

    }

    @Transactional
    public void deleteAllUsersAndResetId() {
        userRepository.truncateUsers();
    }

    private void checkCategory(User user){
        Subcategory subcategory = subcategoryRepository.findById(user.getSubcategory().getId())
                .orElseThrow(() -> new IllegalArgumentException("Subcategory not found"));
        if(!subcategory.getCourse().getId().equals(user.getCourse().getId())){
            throw new IllegalArgumentException("Subcategory does not belong to the selected course");
        }
    }
    private void validateUserPassword(User user) {
        Set<ConstraintViolation<User>> violations = validator.validate(user);
        if (!violations.isEmpty()) {
            throw new IllegalArgumentException("Validation failed: " + violations.iterator().next().getMessage());
        }
    }
  /*  public boolean authenticateUser(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return passwordEncoder.matches(rawPassword, user.getPasswordHash());
    }*/

}
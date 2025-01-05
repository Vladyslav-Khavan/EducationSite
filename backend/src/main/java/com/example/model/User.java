package com.example.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "Users")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Size(min = 2, max = 30)
    @Pattern(regexp = "^[a-zA-ZÀ-ÿ]+$", message = "Name must contain only letters")
    private String name;

    @Column(nullable = false)
    @Size(min = 2, max = 30)
    @Pattern(regexp = "^[a-zA-ZÀ-ÿ]+$", message = "Surname must contain only letters")
    private String surname;

    @Column(nullable = false)
    @Min(1900)
    @Max(2023)
    private Integer birthYear;

    @Column(nullable = false, unique = true)
    @Email
    @NotNull
    private String email;

    @Column(nullable = true)
    @Pattern(regexp = "^\\+?[0-9]{7,15}$", message = "Invalid phone number")
    private String phone;

    @Column(nullable = true)
    private String notes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Country country;

    @Column(nullable = false)
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?\":{}|<>]).{8,100}$",
            message = "Password must be 8-100 characters long, contain at least one digit, one letter, and one special character")
    private String passwordHash;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    public String getStatus(){
        return isActive !=null && isActive ? "Aktivny" : "Dokonceny";
    }

    @NotNull
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "subcategory_id")
    private Subcategory subcategory;

}

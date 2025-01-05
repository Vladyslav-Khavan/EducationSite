package com.example.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserRequest {
    private String firstName;
    private String lastName;
    private Integer birthYear;
    private String email;
    private String phone;
    private String notes;
    private String country;
    private Integer courseId;
    private Integer subcategoryId;
    private String password;
}

package com.example.model;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Country {
    SLOVAKIA,
    CZECH_REPUBLIC,
    POLAND,
    HUNGARY,
    GERMANY,
    UKRAINE,
    NETHERLANDS,
    AUSTRIA,
    DENMARK,
    ROMANIA;

    @JsonCreator
    public static Country fromString(String value) {
        try {
            return Country.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid country: " + value);
        }
    }

}

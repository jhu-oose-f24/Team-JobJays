package com.example.jobjays.dto.prefence;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public  class LocationDto {

    private String country;
    private String state;
    private String city;

    // Getters and setters
}

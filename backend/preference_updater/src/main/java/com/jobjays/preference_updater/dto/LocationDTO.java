package com.jobjays.preference_updater.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationDTO {
    private String country;
    private String state;
    private String city;

    // Constructors
    public LocationDTO() {}

    public LocationDTO(String country, String state, String city) {
        this.country = country;
        this.state = state;
        this.city = city;
    }
}

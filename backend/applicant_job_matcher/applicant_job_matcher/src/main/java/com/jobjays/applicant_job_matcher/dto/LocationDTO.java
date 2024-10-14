package com.jobjays.applicant_job_matcher.dto;

import lombok.Data;

@Data
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

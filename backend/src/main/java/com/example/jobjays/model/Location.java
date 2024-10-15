package com.example.jobjays.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class Location {

    private String country;
    private String state;
    private String city;

    // Constructors
    public Location() {
    }

    public Location(String country, String state, String city) {
        this.country = country;
        this.state = state;
        this.city = city;
    }

    // Getters and setters
    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}

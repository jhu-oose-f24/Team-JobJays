package com.example.jobjays.model;

public interface User {

  String getName();
  String getUsername();
  String getPassword();
  String getEmail();

  Profile getProfile();
  Long getID();
}

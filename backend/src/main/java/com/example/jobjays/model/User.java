package com.example.jobjays.model;

public interface User {

  String getName();
  String getUsername();
  String getPassword();
  String getEmail();

  Boolean getEnabled();
  String getToken();
  Profile getProfile();
  Long getID();
}

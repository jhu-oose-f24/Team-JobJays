package com.example.jobjays.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;


public interface User {
  String getUsername();
  String getPassword();
  String getEmail();

  Profile getProfile();
  Long getID();
}

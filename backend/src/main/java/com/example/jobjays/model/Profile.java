package com.example.jobjays.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;


public interface Profile {

  String getName();

  String getBio();

  void editProfile(String name, String bio);

  User getUser();

}

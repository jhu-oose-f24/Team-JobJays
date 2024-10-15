package com.example.jobjays.model;


public interface Profile {

  String getName();

  String getBio();

  void editProfile(String name, String bio);

  User getUser();

}

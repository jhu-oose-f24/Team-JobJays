package com.example.jobjays.model;


public interface Post {
  String getTitle();
  String getDescription();
  Location getLocation();
  Double getSalary();
  Long getID();

  void publish();
  void close();



}

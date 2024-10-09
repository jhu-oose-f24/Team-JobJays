package com.example.jobjays.model;



import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;


public interface Post {
  String getTitle();
  String getDescription();
  String getLocation();
  //Double getSalary(); //Later implementations dont need a salary
  Long getID();

  void publish();
  void close();



}

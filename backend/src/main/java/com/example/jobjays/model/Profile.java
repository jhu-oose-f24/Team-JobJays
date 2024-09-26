package com.example.jobjays.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.PROPERTY,
    property = "profileType"
)
@JsonSubTypes({
    @JsonSubTypes.Type(value = ApplicantProfile.class, name = "applicantProfile"),
    @JsonSubTypes.Type(value = EmployerProfile.class, name = "employerProfile")
})
public interface Profile {

  String getName();

  String getBio();

  void editProfile(String name, String bio);

  User getUser();
}

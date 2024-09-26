package com.example.jobjays.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,    // Use a name to identify the concrete type
    include = JsonTypeInfo.As.PROPERTY, // Include the type info as a property in the JSON
    property = "userType"              // Name of the property that indicates the type
)
@JsonSubTypes({
    @JsonSubTypes.Type(value = Applicant.class, name = "applicant"),
    @JsonSubTypes.Type(value = Employer.class, name = "employer")
})
public interface User {
  String getUsername();
  String getPassword();
  String getEmail();

  Profile getProfile();
}

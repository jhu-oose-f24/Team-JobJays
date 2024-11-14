package com.example.jobjays.dto.applicant;

import jakarta.persistence.Basic;
import jakarta.persistence.FetchType;
import jakarta.persistence.Lob;
import lombok.Data;
import org.springframework.boot.context.properties.bind.Name;

@Data
public class UpdateApplicantDto {
  String name;

  String bio;

  String website;

  String title;

  String nationality;

  String gender;

  String education;

  String dateOfBirth;

  String maritalStatus;
  String experience;

  Boolean enabled;

  String token;

  String resume;

  private byte[] photo;

  public String getName() {
    return this.name;
  }

  public String getBio() {
    return this.bio;
  }

  public String getResume() {
    return this.resume;
  }
}

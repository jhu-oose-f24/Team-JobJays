package com.example.jobjays.service;
import com.example.jobjays.dto.applicant.ResponseApplicantDto;
import com.example.jobjays.dto.applicant.SavedJobCollectionDto;
import com.example.jobjays.dto.employer.ResponseEmployerDto;
import com.example.jobjays.dto.jobPost.ResponseJobPostDto;
import com.example.jobjays.dto.profile.ResponseApplicantProfileDto;
import com.example.jobjays.dto.profile.ResponseEmployerProfileDto;
import com.example.jobjays.model.*;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class ResponseMapperService {
  public ResponseJobPostDto mapToResponseJobPostDto(JobPost jobPost) {

    return ResponseJobPostDto.builder()
        .id(jobPost.getID())
        .title(jobPost.getTitle())
        .companyName(jobPost.getEmployer().getProfile().getName())
        .jobType(jobPost.getJobType())
        .closedDate(jobPost.getClosedDate())
        .description(jobPost.getDescription())
        .industry(jobPost.getIndustry())
        .location(jobPost.getLocation())
        .maxSalary(jobPost.getMaxSalary())
        .minSalary(jobPost.getMinSalary())
        .postedDate(jobPost.getPostedDate())
        .skillsRequired(jobPost.getSkillsRequired())
        .tags(jobPost.getTags())
        .workTiming(jobPost.getWorkTiming())
        .numApplicants(jobPost.getApplicants().size())
        .build();

  }

  public SavedJobCollectionDto mapToSavedJobCollectionDto(SavedJobCollection savedJobCollection) {
    return SavedJobCollectionDto.builder()
        .id(savedJobCollection.getId())
        .name(savedJobCollection.getName())
        .jobPosts(savedJobCollection.getJobPosts().stream().map(this::mapToResponseJobPostDto).collect(Collectors.toSet()))
        .build();
  }


  public ResponseEmployerProfileDto mapToResponseEmployerProfileDto(EmployerProfile profile) {
    ResponseEmployerProfileDto responseProfileDto = new ResponseEmployerProfileDto();
    responseProfileDto.name = profile.getName();
    responseProfileDto.bio = profile.getBio();
    responseProfileDto.industry = profile.getIndustry();
    responseProfileDto.jobPostsSize = profile.getJobPosts().size();
    responseProfileDto.jobPosts = profile.getJobPosts().stream().map(this::mapToResponseJobPostDto).collect(Collectors.toList());
    return responseProfileDto;
  }

  public ResponseApplicantProfileDto mapToResponseApplicantProfileDto(ApplicantProfile profile) {
    ResponseApplicantProfileDto responseProfileDto = new ResponseApplicantProfileDto();

    responseProfileDto.name = profile.getName();
    responseProfileDto.bio = profile.getBio();
    responseProfileDto.appliedJobs = profile.getAppliedJobs().stream().map(this::mapToResponseJobPostDto)
        .collect(Collectors.toList());
    responseProfileDto.savedJobs = profile.getSavedJobs().stream().map(this::mapToSavedJobCollectionDto).collect(Collectors.toSet());
    responseProfileDto.dateOfBirth = profile.getDateOfBirth();
    responseProfileDto.education  = profile.getEducation();
    responseProfileDto.experience = profile.getExperience();
    responseProfileDto.gender = profile.getGender();
    responseProfileDto.maritalStatus = profile.getMaritalStatus();
    responseProfileDto.nationality = profile.getNationality();
    responseProfileDto.website = profile.getWebsite();
    responseProfileDto.title = profile.getTitle();
    return responseProfileDto;
  }

  public ResponseEmployerDto mapToResponseEmployerDto(Employer employer) {
    return ResponseEmployerDto.builder()
        .employer_id(employer.getID())
        .username(employer.getUsername())
        .employerProfile(mapToResponseEmployerProfileDto(employer.getProfile()))
        .build();
  }


  public ResponseApplicantDto mapToResponseApplicantDto(Applicant applicant) {
    return ResponseApplicantDto.builder()
        .applicantId(applicant.getID())
        .photo(applicant.getPhoto())
        .username(applicant.getUsername())
        .applicantProfile(mapToResponseApplicantProfileDto(applicant.getProfile()))
        .build();
  }






}

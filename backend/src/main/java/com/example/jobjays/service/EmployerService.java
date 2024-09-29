package com.example.jobjays.service;

import com.example.jobjays.dto.employer.CreateEmployerDto;
import com.example.jobjays.dto.employer.UpdateEmployerDto;
import com.example.jobjays.model.*;
import com.example.jobjays.repository.ApplicantRepository;
import com.example.jobjays.repository.EmployerRepository;
import com.example.jobjays.repository.JobPostRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class EmployerService {
  private final EmployerRepository employerRepository;
  private final JobPostRepository jobPostRepository;
  private final ApplicantRepository applicantRepository;

  public EmployerService(EmployerRepository employerRepository, ApplicantRepository applicantRepository, JobPostRepository jobPostRepository) {
    this.employerRepository = employerRepository;
    this.jobPostRepository = jobPostRepository;
    this.applicantRepository = applicantRepository;
  }

  public Employer addEmployer(CreateEmployerDto employer) {

    Employer newEmployer = new Employer(
      employer.getUsername(),
      employer.getPassword(), employer.getEmail(),
      employer.getEmployerName(),
      employer.getEmployerInfo()

    );

    assert newEmployer.getProfile() != null;

    return employerRepository.save(newEmployer);
  }

  public Employer updateEmployer(UpdateEmployerDto newEmployer, Long id) {
    Employer employerToUpdate = employerRepository.findById(id).orElse(null);

    if (employerToUpdate == null) {
      return null;
    }

    EmployerProfile profile = employerToUpdate.getProfile();

    if (newEmployer.getEmployerInfo() != null && !newEmployer.getEmployerInfo().isEmpty()) {
      profile.setBio(newEmployer.getEmployerInfo());
    }

    if (newEmployer.getEmployerName() != null && !newEmployer.getEmployerName().isEmpty()) {
      profile.setName(newEmployer.getEmployerInfo());
    }


    return employerRepository.save(employerToUpdate);
  }

  public void deleteEmployer(Long id) {
    EmployerProfile profile = Objects.requireNonNull(employerRepository.findById(id).orElse(null)).getProfile();
    if (profile != null) {
      List<JobPost> jobPosts = jobPostRepository.findJobPostsByEmployer_Profile_Name(profile.getName()).orElse(null);
      if (jobPosts != null) {
        for (JobPost jobPost : jobPosts) {
          for (Applicant applicant : jobPost.getApplicants()) {
            applicant.getProfile().getAppliedJobs().remove(jobPost);
            applicantRepository.save(applicant);
          }
        }
      }
    }
    employerRepository.deleteById(id);

    assert profile == null;
  }



  public Employer findEmployerById(Long id) {
    return employerRepository.findById(id).orElse(null);
  }

  public List<Employer> findAllEmployers() {
    return employerRepository.findAll();
  }

  public EmployerProfile findEmployerProfileById(Long id) {
    Employer employer = employerRepository.findById(id).orElse(null);
    assert employer != null;
    return employer.getProfile();
  }

  public Employer findEmployerByUsername(String username) {
    return employerRepository.findByUsernameIs(username);
  }


  public EmployerProfile findEmployerProfileByUsername(String username) {
    Employer employer = employerRepository.findByUsernameIs(username);
    return employer.getProfile();
  }

  public List<Employer> findEmployersByName(String name) {
    return employerRepository.findAllByEmployerNameIsLikeIgnoreCase(name);
  }

  public List<EmployerProfile> findEmployerProfilesByName(String name) {
    List<Employer> employers = employerRepository.findAllByEmployerNameIsLikeIgnoreCase(name);
    return employers.stream()
        .map(Employer::getProfile)  // Assuming getProfile() returns EmployerProfile
        .collect(Collectors.toList());
  }

  public List<Employer> findEmployersByEmail(String email) {
    return employerRepository.findAllByEmailIsLikeIgnoreCase(email);
  }

  public List<EmployerProfile> findEmployerProfilesByEmail(String email) {
    List<Employer> employers = employerRepository.findAllByEmailIsLikeIgnoreCase(email);
    return employers.stream()
        .map(Employer::getProfile)  // Assuming getProfile() returns EmployerProfile
        .collect(Collectors.toList());
  }

}

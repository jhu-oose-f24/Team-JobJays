package com.example.jobjays.service;

import com.amazonaws.services.dynamodbv2.xspec.L;
import com.example.jobjays.dto.applicant.CreateApplicantDto;
import com.example.jobjays.dto.applicant.UpdateApplicantDto;
import com.example.jobjays.model.Applicant;
import com.example.jobjays.model.ApplicantProfile;
import com.example.jobjays.model.JobPost;
import com.example.jobjays.repository.ApplicantRepository;
import jakarta.validation.constraints.Email;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

@Service
public class ApplicantService {
  private final ApplicantRepository applicantRepository;


  public ApplicantService(ApplicantRepository applicantRepository) {
    this.applicantRepository = applicantRepository;
  }

  public Applicant addApplicant(CreateApplicantDto applicant) {
    System.out.println("In service: " );
    Applicant newApplicant = new Applicant(
      applicant.getUsername(),
      applicant.getApplicantName(),
      applicant.getPassword(),
      applicant.getEmail(),
      applicant.getEnabled(),
      applicant.getResume(),
      applicant.getVerificationToken()
    );
    assert newApplicant.getProfile() != null;
    System.out.println("Applicant: " + newApplicant.toString());

    ApplicantProfile profile = newApplicant.getProfile();
    profile.setName(applicant.getApplicantName());
    profile.setBio(applicant.getApplicantInfo());

    System.out.println("Profile: " + profile.toString());
    System.out.println("Saving applicant: ");
    return applicantRepository.save(newApplicant);
  }

  public Applicant findByVerificationToken(String token){
    return applicantRepository.findByToken(token);

  }


  public Applicant updateApplicant(UpdateApplicantDto newApplicant, Long id) {
    Applicant applicantToUpdate = applicantRepository.findById(id).orElse(null);

    if (applicantToUpdate == null) {
      return null;
    }
    applicantToUpdate.setEnabled(newApplicant.getEnabled());
    ApplicantProfile profile = applicantToUpdate.getProfile();

    if (newApplicant.getResume() != null && !newApplicant.getResume().isEmpty()) {
      applicantToUpdate.setResume(newApplicant.getResume());
    }

    if (newApplicant.getBio() != null && !newApplicant.getBio().isEmpty()) {
      profile.setBio(newApplicant.getBio());
    }

    if (newApplicant.getName() != null && !newApplicant.getName().isEmpty()) {
      profile.setName(newApplicant.getName());
    }

    return applicantRepository.save(applicantToUpdate);
  }

  public Applicant updateApplicantNoDto(Applicant applicant, Long id) {
    Applicant applicantToUpdate = applicantRepository.findById(id).orElse(null);

    if (applicantToUpdate == null) {
      return null;
    }
    applicantToUpdate.setEnabled(applicant.getEnabled());
    ApplicantProfile profile = applicantToUpdate.getProfile();

    if (applicant.getResume() != null && !applicant.getResume().isEmpty()) {
      applicantToUpdate.setResume(applicant.getResume());
    }

    if (applicant.getProfile().getBio() != null && !applicant.getProfile().getBio().isEmpty()) {
      profile.setBio(applicant.getProfile().getBio());
    }

    if (applicant.getProfile().getName() != null && !applicant.getProfile().getName().isEmpty()) {
      profile.setName(applicant.getProfile().getName());
    }

    return applicantRepository.save(applicantToUpdate);
  }

  public void deleteApplicant(Long id) {
    ApplicantProfile profile = Objects.requireNonNull(applicantRepository.findById(id).orElse(null)).getProfile();
    applicantRepository.deleteById(id);
    assert profile == null;
  }

  public Applicant findApplicantById(Long id) {
    return applicantRepository.findById(id).orElse(null);
  }

  public ApplicantProfile findApplicantProfileById(Long id) {
    return Objects.requireNonNull(applicantRepository.findById(id).orElse(null)).getProfile();
  }

  public Applicant findApplicantByUsername(String username) {
    return applicantRepository.findByUsernameIsIgnoreCase(username);
  }

  public ApplicantProfile findApplicantProfileByUsername(String username) {
    return Objects.requireNonNull(applicantRepository.findByUsernameIsIgnoreCase(username)).getProfile();
  }

  public List<Applicant> findAllApplicants() {
    return applicantRepository.findAll();
  }

  public List<ApplicantProfile> findAllApplicantProfiles() {
    return applicantRepository.findAll().stream().map(Applicant::getProfile).toList();
  }

  public List<Applicant> findApplicantsByUsername(String username) {
    return applicantRepository.findAllByUsernameContainingIgnoreCase(username);
  }

  public List<ApplicantProfile> findApplicantProfilesByUsername(String username) {
    List<Applicant> applicants = applicantRepository.findAllByUsernameContainingIgnoreCase(username);
    return applicants.stream().map(Applicant::getProfile).toList();
  }

  public List<Applicant> findApplicantsByEmail(String email) {
    return applicantRepository.findAllByNameContainingIgnoreCase(email);
  }

  public List<ApplicantProfile> findApplicantProfilesByEmail(String email) {
    List<Applicant> applicants = applicantRepository.findAllByNameContainingIgnoreCase(email);
    return applicants.stream().map(Applicant::getProfile).toList();
  }



  public Set<JobPost> findSavedJobsByApplicantId(Long applicantId) {
    return applicantRepository.findSavedJobsByApplicantId(applicantId);
  }

  public void addSavedJob(ApplicantProfile applicantProfile, JobPost jobPost) {
//    applicantRepository.findSavedJobsByApplicantId(applicantId).add(jobPost);
    applicantProfile.addSavedJobs(jobPost);
  }
//
//
////  public Optional<JobPost> findJobPostByApplicantIdandJobId(Long applicantId, Long jobPostId) {
////    return;
////  }
//
//  public void deleteJobPostByApplicantId(Long applicantId, JobPost jobPost) {
//    applicantRepository.findSavedJobsByApplicantId(applicantId).remove(jobPost);
//  }




  public boolean isEmailInUse(@Email String email) {
    return applicantRepository.existsByEmail(email);
  }
}

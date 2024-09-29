package com.example.jobjays.service;

import com.example.jobjays.model.Employer;
import com.example.jobjays.model.EmployerProfile;
import com.example.jobjays.model.JobPost;
import com.example.jobjays.dto.jobPost.*;
import com.example.jobjays.repository.JobPostRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class JobPostService {
  private final JobPostRepository jobPostRepository;
  private final EmployerService employerService;


  public JobPostService(JobPostRepository jobPostRepository, EmployerService employerService) {
    this.jobPostRepository = jobPostRepository;
    this.employerService = employerService;
  }

  public JobPost addJobPost(CreateJobPostDto newJobPost) {

    Employer employer = employerService.findEmployerByUsername(newJobPost.getUsername());


    JobPost jobPost = new JobPost(
      newJobPost.getTitle(),
      newJobPost.getDescription(),
      newJobPost.getLocation(),
      newJobPost.getSalary(),
      newJobPost.getClosedDate(),
      employer
    );
    employer.postJob(jobPost); //Adding jobPost to employer's list of jobPosts

    return jobPostRepository.save(jobPost);
  }

  public JobPost updateJobPost(UpdateJobPostDto jobPost, Long id) {

    JobPost jobPostToUpdate = jobPostRepository.findById(id).orElse(null);

    if (jobPostToUpdate == null) {
      return null;
    }

    if (jobPost.getTitle() != null && !jobPost.getTitle().isEmpty()) {
      jobPostToUpdate.setTitle(jobPost.getTitle());
    }

    if (jobPost.getDescription() != null && !jobPost.getDescription().isEmpty()) {
      jobPostToUpdate.setDescription(jobPost.getDescription());
    }

    if (jobPost.getLocation() != null && !jobPost.getLocation().isEmpty()) {
      jobPostToUpdate.setLocation(jobPost.getLocation());
    }

    if (jobPost.getSalary() != null) {
      jobPostToUpdate.setSalary(jobPost.getSalary());
    }

    if (jobPost.getClosedDate() != null) {
      jobPostToUpdate.setClosedDate(jobPost.getClosedDate());
    }

    return jobPostRepository.save(jobPostToUpdate);
  }

  public void deleteJobPost(Long id) {
    EmployerProfile employerProfile = Objects.requireNonNull(jobPostRepository.findById(id).orElse(null)).getEmployer().getProfile();
    List<JobPost> employerJobPosts = employerProfile.getJobPosts();
    employerJobPosts.removeIf(jobPost -> jobPost.getID().equals(id));
    jobPostRepository.deleteById(id);
  }

  public List<JobPost> getJobPosts() {
    return jobPostRepository.findAll();
  }

  public JobPost getJobPostById(Long id) {
    return jobPostRepository.findById(id).orElse(null);
  }

  public List<JobPost> getJobPostsByEmployer(String employer) {
    return jobPostRepository.findJobPostsByEmployer_Profile_Name(employer).orElse(null);
  }

  public List<JobPost> getJobPostsByTitle(String title) {
    return jobPostRepository.findJobPostsByTitleIsLikeIgnoreCase(title).orElse(null);
  }

  public List<JobPost> getJobPostsByTitleContaining(String title) {
    return jobPostRepository.findJobPostsByTitleContainingIgnoreCase(title).orElse(null);
  }

}

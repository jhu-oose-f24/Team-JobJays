package com.example.jobjays.service;

import com.example.jobjays.kafka.JobPostPublisherService;
import com.example.jobjays.model.*;
import com.example.jobjays.dto.jobPost.*;
import com.example.jobjays.repository.JobPostRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
public class JobPostService {
  private final JobPostRepository jobPostRepository;
  private final JobPostPublisherService jobPostPublisherService;


  public JobPostService(JobPostRepository jobPostRepository, JobPostPublisherService jobPostPublisherService) {
    this.jobPostRepository = jobPostRepository;
      this.jobPostPublisherService = jobPostPublisherService;
  }

  public JobPost addJobPost(CreateJobPostDto newJobPost, Employer employer) {

    JobPost jobPost = new JobPost(
      newJobPost.getTitle(),
      newJobPost.getDescription(),
      newJobPost.getLocation(),
      newJobPost.getMinSalary(),
      newJobPost.getMaxSalary(),
      newJobPost.getClosedDate(),
      employer, newJobPost.getTags()
    );
    employer.postJob(jobPost); //Adding jobPost to employer's list of jobPosts

    JobPost newJobPostEntity =  jobPostRepository.save(jobPost);

    jobPostPublisherService.publishJobPost(newJobPostEntity);
    // now we need to send it to kafka topic

    return newJobPostEntity;
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

    if (jobPost.getLocation() != null) {
      jobPostToUpdate.setLocation(jobPost.getLocation());
    }

    if (jobPost.getMinSalary() != null) {
      jobPostToUpdate.setMinSalary(jobPost.getMinSalary());
    }
    if (jobPost.getMaxSalary() != null) {
      jobPostToUpdate.setMaxSalary(jobPost.getMaxSalary());
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
    return jobPostRepository.findJobPostsByEmployer_Profile_NameIgnoreCase(employer);
  }

  public List<JobPost> getJobPostsByTitle(String title) {
    return jobPostRepository.findJobPostsByTitleContainingIgnoreCase(title);
  }

  public List<JobPost> getJobPostsByTitleContaining(String title) {
    return jobPostRepository.findJobPostsByTitleContainingIgnoreCase(title);
  }

  public List<JobPost> getJobPostsByEmployerId(Long id) {
    return jobPostRepository.findJobPostsByEmployer_id(id);
  }

  public List<JobPost> getJobPostsByMinSalary(Double minSalary) {
    return jobPostRepository.findJobPostsByMinSalaryIsGreaterThanEqual(minSalary);
  }
  public List<JobPost> getJobPostsByMaxSalary(Double maxSalary) {
    return jobPostRepository.findJobPostsByMaxSalaryIsLessThanEqual(maxSalary);
  }

  public List<JobPost> getJobPostsBySalaryRange(Double minSalary, Double maxSalary) {
    return jobPostRepository.findJobPostsByMinSalaryIsGreaterThanEqualAndMaxSalaryIsLessThanEqual(minSalary, maxSalary);
  }

  public Set<Applicant> getApplicantsByJobPostId(Long jobID) {
    return jobPostRepository.findApplicantsByJobPostId(jobID);
  }

  public JobPost addApplicantToJobPost(JobPost jobPost, Applicant applicant) {

    jobPost.addApplicant(applicant);
    return jobPostRepository.save(jobPost);

  }

}

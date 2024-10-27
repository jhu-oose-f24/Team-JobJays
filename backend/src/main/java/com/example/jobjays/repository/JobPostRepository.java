package com.example.jobjays.repository;


import com.example.jobjays.model.Applicant;
import com.example.jobjays.model.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Set;


@Repository
public interface JobPostRepository extends JpaRepository<JobPost, Long> {


  List<JobPost> findJobPostsByEmployer_Profile_NameIgnoreCase(String employer);

  List<JobPost> findJobPostsByTitleContainingIgnoreCase(String title);

  @Query("SELECT j FROM JobPost j WHERE j.employer.employer_id = :id")
  List<JobPost> findJobPostsByEmployer_id(Long id);

  List<JobPost> findJobPostsByMinSalaryIsGreaterThanEqualAndMaxSalaryIsLessThanEqual(Double minSalary, Double maxSalary);

  List<JobPost> findJobPostsByMinSalaryIsGreaterThanEqual(Double minSalary);

  List<JobPost> findJobPostsByMaxSalaryIsLessThanEqual(Double maxSalary);

  @Query("SELECT j.applicants FROM JobPost j WHERE j.jobID = ?1")
  Set<Applicant> findApplicantsByJobPostId(Long jobID);

//  @Modifying
//  @Query(
//      value="INSERT INTO job_post_applicants (job_post_jobid, applicant_id) VALUES (:jobID, :applicantId)",
//      nativeQuery = true)
//  Set<Applicant> insertApplicantToJobPost(Long jobID, Long applicantId);





}

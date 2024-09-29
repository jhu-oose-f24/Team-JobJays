package com.example.jobjays.repository;


import com.example.jobjays.model.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobPostRepository extends JpaRepository<JobPost, Long> {


  Optional<List<JobPost>> findJobPostsByEmployer_Profile_Name(String employer);
  //Optional<List<JobPost>> findJobPostsByEmployer_Profile(EmployerProfile employer);
  Optional<List<JobPost>> findJobPostsByTitleIsLikeIgnoreCase(String title);

  Optional<List<JobPost>> findJobPostsByTitleContainingIgnoreCase(String title);


}

package com.example.jobjays.repository;


import com.example.jobjays.model.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface JobPostRepository extends JpaRepository<JobPost, Long> {


  List<JobPost> findJobPostsByEmployer_Profile_NameIgnoreCase(String employer);

  List<JobPost> findJobPostsByTitleContainingIgnoreCase(String title);




}

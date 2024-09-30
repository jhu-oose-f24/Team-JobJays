package com.example.jobjays.repository;

import com.example.jobjays.model.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ApplicantRepository extends JpaRepository<Applicant, Long> {

  List<Applicant> findAllByUsernameContainingIgnoreCase(String name);

  @Query("select a from Applicant a where upper(a.profile.name) like upper(concat('%', :name, '%'))")
  List<Applicant> findAllByNameContainingIgnoreCase(String name);

  Applicant findByUsernameIsIgnoreCase(String username);

  //TODO CREATE A JOB APPLICATION REPOSITORY










}

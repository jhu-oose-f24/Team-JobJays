package com.example.jobjays.repository;

import com.example.jobjays.model.Applicant;
import com.example.jobjays.model.ApplicantProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.jobjays.model.JobPost;

import java.util.List;

@Repository
public interface ApplicantRepository extends JpaRepository<Applicant, Long> {

  List<Applicant> findAllByUsernameIsLikeIgnoreCase(String name);

  List<Applicant> findAllByEmailIsLikeIgnoreCase(String email);

  List<Applicant> findByUsernameIs(String username);










}

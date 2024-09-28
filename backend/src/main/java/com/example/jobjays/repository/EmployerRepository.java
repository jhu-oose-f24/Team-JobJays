package com.example.jobjays.repository;

import com.example.jobjays.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployerRepository extends JpaRepository<Employer, Long> {
  List<Employer> findAllByEmployerNameIsLikeIgnoreCase(String name);

  List<Employer> findAllByEmailIsLikeIgnoreCase(String email);

  List<Employer> findByUsernameIs(String username);


/*
List<Employer> employers = employerRepository.findEmployersByUsername(username);
List<EmployerProfile> profiles = employers.stream()
                                          .map(Employer::getProfile)  // Assuming getProfile() returns EmployerProfile
                                          .collect(Collectors.toList());

 */





}

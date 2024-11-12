package com.example.jobjays.repository;

import com.example.jobjays.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EmployerRepository extends JpaRepository<Employer, Long> {

  List<Employer> findAllByEmployerNameContainingIgnoreCase(String name);

  List<Employer> findAllByEmailContainingIgnoreCase(String email);

  Employer findByUsernameIs(String username);

  Employer findByUsernameIsIgnoreCase(String username);

  Employer findByToken(String token);







}

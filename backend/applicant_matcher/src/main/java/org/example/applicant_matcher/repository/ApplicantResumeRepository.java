//package org.example.applicant_matcher.repository;
//
//import org.example.applicant_matcher.model.ApplicantResume;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.stereotype.Repository;
//
//import java.util.Optional;
//
//@Repository
//public interface ApplicantResumeRepository extends JpaRepository<ApplicantResume, Long> {
//
//    // 查询用户的完整简历，包括 file_data
//    @Query("SELECT a FROM ApplicantResume a WHERE a.userId = :userId")
//    Optional<ApplicantResume> findFirstByUserId(Long userId);
//}

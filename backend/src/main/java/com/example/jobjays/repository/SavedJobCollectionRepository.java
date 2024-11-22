package com.example.jobjays.repository;

import com.example.jobjays.model.SavedJobCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavedJobCollectionRepository extends JpaRepository<SavedJobCollection, Long> {
    @Query("select s from SavedJobCollection s where s.applicant.applicantId = :applicantId")
    List<SavedJobCollection> findByApplicant_id(Long applicantId);

    @Query("select s from SavedJobCollection s where s.applicant.applicantId = :applicantId and s.id = :id")
    SavedJobCollection findListByApplicant_IDAndAndId(Long applicantId, Long id);

    @Query("select s from SavedJobCollection s where s.applicant.applicantId = :applicantId and s.name = :name")
    SavedJobCollection findListByApplicant_IDAndName(Long applicantId, String name);

    @Modifying
    @Query("delete from SavedJobCollection s where s.applicant.applicantId = :applicantId and s.id = :id")
    void deleteByApplicantApplicantIdAndId(Long applicantId, Long id);


}

package com.example.jobjays.service;

import com.example.jobjays.exception.DuplicateSavedJobCollectionException;
import com.example.jobjays.exception.ResourceNotFoundException;
import com.example.jobjays.exception.UserNotFoundException;
import com.example.jobjays.model.Applicant;
import com.example.jobjays.model.JobPost;
import com.example.jobjays.model.SavedJobCollection;
import com.example.jobjays.repository.ApplicantRepository;
import com.example.jobjays.repository.JobPostRepository;
import com.example.jobjays.repository.SavedJobCollectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SavedJobCollectionService {
  @Autowired
  private SavedJobCollectionRepository savedJobCollectionRepository;

  @Autowired
  private ApplicantRepository applicantRepository;

  @Autowired
  private JobPostRepository jobPostRepository;

  public SavedJobCollection createNewList(Long applicantId, String listName) {
    Applicant applicant = applicantRepository.findById(applicantId)
        .orElseThrow(() -> new UserNotFoundException("Applicant not found"));

    SavedJobCollection existingList = savedJobCollectionRepository.findListByApplicant_IDAndName(applicantId, listName);
    if (existingList != null) {
      throw new DuplicateSavedJobCollectionException("List with that name already exists");
    }
    SavedJobCollection newList = new SavedJobCollection(applicant, listName);
    return savedJobCollectionRepository.save(newList);
  }

  public SavedJobCollection addJobToList(Long listId, Long jobId) {
    SavedJobCollection savedJobList = savedJobCollectionRepository.findById(listId)
        .orElseThrow(() -> new ResourceNotFoundException("List not found"));

    JobPost jobPost = jobPostRepository.findById(jobId)
        .orElseThrow(() -> new ResourceNotFoundException("JobPost not found"));

    savedJobList.getJobPosts().add(jobPost);
    return savedJobCollectionRepository.save(savedJobList);
  }

  public List<SavedJobCollection> getListsForApplicant(Long applicantId) {
    if (!applicantRepository.existsById(applicantId)) {
      throw new UserNotFoundException("Applicant not found");
    }
    return savedJobCollectionRepository.findByApplicant_id(applicantId);
  }

}

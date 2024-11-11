package com.example.jobjays.service;

import com.example.jobjays.model.ApplicantResume;
import com.example.jobjays.repository.ApplicantResumeRepository;
import org.hibernate.service.spi.ServiceException;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.time.LocalDateTime;

@Service
public class ResumeService {

    @Autowired
    private ApplicantResumeRepository resumeRepository;

    public ApplicantResume saveResume(MultipartFile file,String username, Long userId) throws IOException {
        String fileName = file.getOriginalFilename();
        String fileType = file.getContentType();
        if (fileType.isEmpty() || !fileType.equals("application/pdf")) {
            throw new ServiceException("File type not supported");
        }
        byte[] resumeData = file.getBytes();

        ApplicantResume resume = new ApplicantResume();
        resume.setResumeName(fileName);
        resume.setFileData(resumeData);
        resume.setUserName(username);
        resume.setUserId(userId);
        resume.setUploadedAt(LocalDateTime.now());
        return resumeRepository.save(resume);
    }

    // Method to retrieve a resume by ID, for example
    public ApplicantResume getResumeById(Long id) {
        return resumeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Resume not found"));
    }

    public void deleteById(Long id) {
        resumeRepository.deleteById(id);
    }

    public List<ApplicantResume> getAllResumesByUserId(Long userId){
        return resumeRepository.findByUserId(userId);
    }
}

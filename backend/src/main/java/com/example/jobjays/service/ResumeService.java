package com.example.jobjays.service;

import com.example.jobjays.model.ApplicantResume;
import com.example.jobjays.repository.ApplicantResumeRepository;
import org.hibernate.service.spi.ServiceException;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ResumeService {

    @Autowired
    private ApplicantResumeRepository resumeRepository;

    public ApplicantResume saveResume(MultipartFile file,String username, Long userId) throws IOException {
        String fileName = file.getOriginalFilename();
        String fileType = file.getContentType();
        if(fileType!=".pdf"){
            //not a pdf
            throw new ServiceException("File type is not PDF");
        }
        byte[] resumeData = file.getBytes();

        ApplicantResume resume = ApplicantResume.builder().resumeName(fileName).fileData(resumeData)
                .userName(username).userId(userId)
                .build();
        return resumeRepository.save(resume);
    }

    // Method to retrieve a resume by ID, for example
    public ApplicantResume getResumeById(Long id) {
        return resumeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Resume not found"));
    }
}

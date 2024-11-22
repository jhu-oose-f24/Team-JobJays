package com.example.jobjays.dto.applicant;


import com.example.jobjays.dto.jobPost.ResponseJobPostDto;
import com.example.jobjays.model.Applicant;
import com.example.jobjays.model.JobPost;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
public class SavedJobCollectionDto {

    private Long id;

    private String name;

    private Set<ResponseJobPostDto> jobPosts;




//    private Applicant applicant;

}

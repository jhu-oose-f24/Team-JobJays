package com.example.jobjays.kafka;

import com.example.jobjays.model.Location;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class JobPostDTO {
    private Long jobId;
    private String title;
    private String description;
    private Location location;
    private Double minSalary;
    private Double maxSalary;
    private String employerName;
    private LocalDateTime postedDate;
    private LocalDateTime closedDate;
    private List<String> tags;

    public JobPostDTO() {}

    public JobPostDTO(Long jobId, String title, String description, Location location,
                      Double minSalary, Double maxSalary, String employerName, LocalDateTime postedDate, LocalDateTime closedDate, List<String> tags) {
        this.jobId = jobId;
        this.title = title;
        this.description = description;
        this.location =  location;
        this.minSalary = minSalary;
        this.maxSalary = maxSalary;
        this.employerName = employerName;
        this.postedDate = postedDate;
        this.closedDate = closedDate;
        this.tags = tags;
    }
}

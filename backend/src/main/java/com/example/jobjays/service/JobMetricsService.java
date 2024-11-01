package com.example.jobjays.service;

import com.example.jobjays.model.ImpressionEvent;
import com.example.jobjays.model.Impressions;
import com.example.jobjays.model.JobPost;
import com.example.jobjays.repository.ImpressionEventRepository;
import com.example.jobjays.repository.ImpressionsRepository;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class JobMetricsService {
  private final ImpressionsRepository impressionsRepository;
  private final ImpressionEventRepository impressionEventRepository;

  public JobMetricsService(ImpressionsRepository impressionsRepository, ImpressionEventRepository impressionEventRepository) {
    this.impressionsRepository = impressionsRepository;
    this.impressionEventRepository = impressionEventRepository;
  }

  // For updating cumulative count
  public void addImpressionEvent(@NotNull JobPost jobPost) {
    ImpressionEvent newEvent = jobPost.addImpression(); //logs impression, creates and logs if there isnt an impression already
    impressionsRepository.save(jobPost.getImpressions());
    impressionEventRepository.save(newEvent); // Log event
  }

  // For querying between dates
  public List<ImpressionEvent> getImpressionsByDateRange(Long jobPostId, LocalDateTime start, LocalDateTime end) {
    return impressionEventRepository.findImpressionsBetween(jobPostId, start, end);
  }

  public Integer getImpressionsBeforeDate(Long jobPostId, LocalDateTime start) {
    return impressionEventRepository.findImpressionEventsBeforeDate(jobPostId, start);
  }

  // For getting total impressions
  public Integer getTotalImpressions(Long jobPostId) {
    Impressions impressions = impressionsRepository.findImpressionsByJobPost_ID(jobPostId);
    return impressions != null ? impressions.getTotalImpressions() : 0;
  }

}

package com.example.jobjays.dto;

import com.example.jobjays.model.ImpressionType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class ImpressionEventChartDto {
  private LocalDate date; // Aggregated date with Month, Day, Year
  private Long jobImpressions; // Total count of job impressions
  private Long profileImpressions; // Total count of profile impressions
  // Static factory method for creating a DTO
  public static ImpressionEventChartDto from(LocalDate date, Long jobImpressions, Long profileImpressions) {
    return new ImpressionEventChartDto(date, jobImpressions, profileImpressions);
  }
}

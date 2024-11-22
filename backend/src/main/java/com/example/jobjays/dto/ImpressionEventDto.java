package com.example.jobjays.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class ImpressionEventDto {
  private LocalDate date; // Aggregated date with Month, Day, Year
  private Long impressions; // Total count of impressions

  // Static factory method for creating a DTO
  public static ImpressionEventDto from(LocalDate date, Long impressions) {
    return new ImpressionEventDto(date, impressions);
  }
}

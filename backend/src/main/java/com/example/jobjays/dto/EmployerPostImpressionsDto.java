package com.example.jobjays.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class EmployerPostImpressionsDto {
  private LocalDate date; // Aggregated date with Month, Day, Year
  private Long totalImpressions; // Total count of impressions
  private Long postId; // Post ID
}

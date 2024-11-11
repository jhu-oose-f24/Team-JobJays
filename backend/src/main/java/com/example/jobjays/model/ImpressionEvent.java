package com.example.jobjays.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;


import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class ImpressionEvent {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "impressions_id", nullable = false)
  private Impressions impressions;

  private LocalDateTime eventDate;

  public ImpressionEvent(Impressions impressions) {
    this.impressions = impressions;
    this.eventDate = LocalDateTime.now();
  }
}

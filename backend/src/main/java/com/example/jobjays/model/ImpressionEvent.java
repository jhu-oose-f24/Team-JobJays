package com.example.jobjays.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;


import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@ToString
public class ImpressionEvent {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "impressions_id", nullable = false)
  private Impressions impressions;

  @Enumerated(EnumType.STRING)
  private ImpressionType impressionType;

  private LocalDateTime eventDate;

  public ImpressionEvent(Impressions impressions) {
    this.impressions = impressions;
    this.impressionType = impressions.getImpressionType();
    this.eventDate = LocalDateTime.now();
  }
}

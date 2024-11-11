package com.example.jobjays.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
//@Entity
//@Table(name = "post_metrics")
//@Inheritance(strategy = InheritanceType.JOINED)
@MappedSuperclass
public abstract class PostMetrics {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne
  @JoinColumn(name = "job_post_id", nullable = false, unique = true)
  @Setter
  private JobPost jobPost;

  @Column(name = "timestamp", nullable = false)
  private LocalDateTime timestamp;

  //public PostMetrics() {}

//  public PostMetrics(JobPost jobPost, LocalDateTime timestamp) {
//    this.jobPost = jobPost;
//    this.timestamp = LocalDateTime.now();
//  }

  protected PostMetrics() {
    this.timestamp = LocalDateTime.now();
  }

}

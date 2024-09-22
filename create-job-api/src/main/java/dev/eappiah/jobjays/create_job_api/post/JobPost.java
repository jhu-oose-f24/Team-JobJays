package dev.eappiah.jobjays.create_job_api.post;

import java.time.LocalDateTime;import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeName;



//TODO: Remove Id attribute
@JsonTypeName("jobPost")
public class JobPost implements Post {

  private Integer id;
  private String title ;
  private String description;
  private Employer employer;


  public JobPost(
      Integer id,
      String title,
      String description,
      LocalDateTime postDate,
      Employer employer) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.employer = employer;
  }

  public String getTitle() {
    return title;
  }
  public Integer getId() {
    return id;
  }

  public String getDescription() {
    return description;
  }

  public Employer getPostedBy() {
    return employer;
  }


}

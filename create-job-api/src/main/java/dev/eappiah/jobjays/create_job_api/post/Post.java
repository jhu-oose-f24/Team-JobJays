package dev.eappiah.jobjays.create_job_api.post;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,    // Use a name to identify the concrete type
    include = JsonTypeInfo.As.PROPERTY, // Include the type info as a property in the JSON
    property = "type"              // Name of the property that indicates the type
)
@JsonSubTypes({
    @JsonSubTypes.Type(value = JobPost.class, name = "jobPost")
})
public interface Post {


  Integer getId();
  String getTitle();
  String getDescription();
  Employer getPostedBy();  // Association with Employer to be implemented once Employer class is created
}

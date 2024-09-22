package dev.eappiah.jobjays.create_job_api.post;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class PostNotFoundException extends RuntimeException {
  public PostNotFoundException() {
    super("Post Not Found");
  }
}

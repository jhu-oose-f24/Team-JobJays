package dev.eappiah.jobjays.create_job_api.post;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository

public class PostRepository {
  private List<Post> posts = new ArrayList<>();

  public void addPost(Post post) {
    if (post instanceof JobPost) {
      posts.add(post);
    } else {
      throw new IllegalArgumentException("Unsupported post type");
    }
  }

  public List<Post> findAll() {
    return posts;
  }

  Optional<Post> findById(Integer id) {
    return posts.stream().filter(post -> post.getId().equals(id)).findFirst();
  }

  //TODO this method does not update the LocalDateTime field
  // returns null for LocalDateTime field for some reason
  void update(Post post, Integer id) {
//    Optional<Post> postToUpdate = findById(id);
//    if (postToUpdate.isEmpty()) {
//      throw new IllegalArgumentException("Post not found");
//    }
//    Post postFound = postToUpdate.get();
//    postFound.editTitle(post.getTitle());
//    postFound.editDescription(post.getDescription());

    Optional<Post> postToUpdate = findById(id);
    postToUpdate.ifPresent(value -> posts.set(posts.indexOf(value), post));
  }

  void delete(Integer id) {
//    Optional<Post> postToDelete = findById(id);
//    postToDelete.ifPresent(posts::remove);
    posts.removeIf(post -> post.getId().equals(id));

  }

  //if we have a post object passed in
  void deleteByPost(Post post) {
    posts.remove(post);
  }

}

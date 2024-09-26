package com.example.jobjays.post;

import com.example.jobjays.model.JobPost;
import com.example.jobjays.model.Post;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
/*
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}

 */
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

  Optional<Post> findById(String id) {
    return posts.stream().filter(post -> post.getID().equals(id)).findFirst();
  }

  //  Optional<Post> findByTitle(String title) {return posts.stream().filter(post -> post.getTitle().equals(title)).findFirst();}
  Optional<Post> findByTitle(String title) {
    return posts.stream()
            .filter(post -> post.getTitle().toLowerCase().contains(title.toLowerCase()))
            .findFirst();
  }

  Optional<Post> findByCompany(String company) {

    //posts.stream().findFirst()
    return posts.stream()
        .filter(post -> post instanceof JobPost)
        .map(post -> (JobPost) post)
        .filter(jobPost -> jobPost.getEmployer().getProfile().getName().equalsIgnoreCase(company))
        .map(jobPost -> (Post) jobPost)
        .findFirst();

    //return posts.stream().filter(post -> post.getPostedBy().equals(company)).findFirst();
  }


  void update(Post post, String id) {
//    Optional<Post> postToUpdate = findById(id);
//    if (postToUpdate.isEmpty()) {
//      throw new IllegalArgumentException("Post not found");
//    }
//    Post postFound = postToUpdate.get();
//    postFound.editTitle(post.getTitle());
//    postFound.editDescription(post.getDescription());

    Optional<Post> postFromGivenID = findById(id);
    if(postFromGivenID.isEmpty()) {
      throw new PostNotFoundException();
    }


    JobPost updatePost = (JobPost) postFromGivenID.get();
    JobPost editedPost = (JobPost) post; //object to hold new information to transfer to updatePost

    //doing it this way to avoid new ID being generated
    updatePost.setTitle(editedPost.getTitle()); //update the title
    updatePost.setDescription(editedPost.getDescription()); //update the description
    updatePost.setLocation(editedPost.getLocation()); //update the location
    updatePost.setSalary(editedPost.getSalary()); //update the salary
    editedPost.setPostedDate(((JobPost) post).getPostedDate()); //update the posted date
    updatePost.setClosedDate(editedPost.getClosedDate()); //update the closed date

    //postToUpdate.ifPresent(value -> posts.set(posts.indexOf(value), editedPost));

  }

  void delete(String id) {
//    Optional<Post> postToDelete = findById(id);
//    postToDelete.ifPresent(posts::remove);
    posts.removeIf(post -> post.getID().equals(id));

  }

  //if we have a post object passed in
  void deleteByPost(Post post) {
    posts.remove(post);
  }

}

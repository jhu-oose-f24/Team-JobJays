package com.example.jobjays.controller;


import com.example.jobjays.model.Post;
import com.example.jobjays.exception.PostNotFoundException;
import com.example.jobjays.repository.PostRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
public class PostController {

  private final PostRepository postRepository;

  public PostController(PostRepository postRepository) {
    this.postRepository = postRepository;
  }

  @GetMapping("")
  public List<Post> findAll() {
    return postRepository.findAll();
  }

  @GetMapping("/{id}")
  Post findById(@PathVariable String id) {
    Optional<Post> post = postRepository.findById(id);
    if (post.isEmpty()) {
      throw new PostNotFoundException();
    }
    return post.get();
  }

  @GetMapping("/title")
  Post findByTitle(@RequestParam String title) {
    Optional<Post> post = postRepository.findByTitle(title);
    if (post.isEmpty()) {
      throw new PostNotFoundException();
    }
    return post.get();
  }

  @GetMapping("/company")
  Post findByCompany(@RequestParam String company) {
    Optional<Post> post = postRepository.findByCompany(company);
    if (post.isEmpty()) {
      throw new PostNotFoundException();
    }
    return post.get();
  }

  @ResponseStatus(HttpStatus.CREATED)
  @PostMapping("")
  void addPost(@RequestBody Post post) {
    postRepository.addPost(post);
  }

  @ResponseStatus(HttpStatus.NO_CONTENT)
  @PutMapping("/{id}")
  void updatePost(@RequestBody Post post, @PathVariable String id) {
    postRepository.update(post, id);
  }

  @ResponseStatus(HttpStatus.NO_CONTENT)
  @DeleteMapping("/{id}")
  void deletePost(@PathVariable String id) {
    postRepository.delete(id);
  }

}

package com.example.backendv1.controller;



import com.example.backendv1.model.Story;
import com.example.backendv1.repository.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/stories")
public class StoryController {

  @Autowired
  private StoryRepository storyRepository;

  @GetMapping
  public List<Story> getAllStories() {
    return storyRepository.findAll();
  }

  @PostMapping
  public Story createStory(@RequestBody Story story) {
    return storyRepository.save(story);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Story> getStoryById(@PathVariable Long id) {
    Optional<Story> story = storyRepository.findById(id);
    return story.map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<Story> updateStory(@PathVariable Long id, @RequestBody Story storyDetails) {
    Optional<Story> storyOptional = storyRepository.findById(id);
    if(storyOptional.isPresent()){
      Story story = storyOptional.get();
      story.setTitle(storyDetails.getTitle());
      story.setContent(storyDetails.getContent());
      story.setDepartment(storyDetails.getDepartment());
      Story updatedStory = storyRepository.save(story);
      return ResponseEntity.ok(updatedStory);
    }
    return ResponseEntity.notFound().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteStory(@PathVariable Long id) {
    Optional<Story> storyOptional = storyRepository.findById(id);
    if(storyOptional.isPresent()){
      storyRepository.deleteById(id);
      return ResponseEntity.noContent().build();
    }
    return ResponseEntity.notFound().build();
  }
}

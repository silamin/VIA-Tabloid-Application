package com.example.backendv1.repository;

import com.example.backendv1.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryRepository extends JpaRepository<Story, Long>
{
}

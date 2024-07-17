package com.aj.chatgpt_clone.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.aj.chatgpt_clone.Entity.Prompt;

@Repository
public interface PromptRepo extends MongoRepository<Prompt,String> {

    
} 
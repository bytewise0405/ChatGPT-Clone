package com.aj.chatgpt_clone;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatResponse;

import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.aj.chatgpt_clone.Entity.Prompt;
import com.aj.chatgpt_clone.repo.PromptRepo;

import reactor.core.publisher.Flux;

@RestController
public class ChatController {

    private ArrayList<String> history = new ArrayList<>();
    private final OpenAiChatModel chatModel;

    @Autowired
    public ChatController(OpenAiChatModel chatModel) {
        this.chatModel = chatModel;
    }
    @Autowired
    PromptRepo promptRepo;

    @GetMapping("/ai/generateStream")
    public Flux<String> generateStream(@RequestParam(value = "message", defaultValue = "Tell me a joke") String message) {
        return chatModel.stream(message);
    }

    @PostMapping("/ai/generateStream/{id}/{title}")
    public Flux<String> add(@RequestBody String message, @PathVariable String id, @PathVariable String title) {
        Optional<Prompt> p = promptRepo.findById(id);
        if (p.isPresent()) {
            Prompt up = p.get();
            up.getTitles().add(title);
            promptRepo.save(up);
        } else {
            List<String> v = new ArrayList<>();
            v.add(title);
            Prompt n = new Prompt(id, v);
            promptRepo.save(n);
        }
        return chatModel.stream(message);
    }

    @GetMapping("/ai/generatedHistory/{id}")
    public ResponseEntity<List<String>> getMethodName(@PathVariable String id) {
        Optional<Prompt> p = promptRepo.findById(id);
        if (p.isPresent()) {
            Prompt up = p.get();
            return new ResponseEntity<>(up.getTitles(), HttpStatus.OK);
        }
        List<String> error = new ArrayList<>();
        error.add("id is in valid");
        return new ResponseEntity<>(error, HttpStatus.NO_CONTENT);
    }

}

package com.aj.chatgpt_clone.Entity;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Prompt {

    @Id
    private String id;

    @Field
    private List<String> titles;

    public List<String> getTitles() {
        return titles;
    }

}

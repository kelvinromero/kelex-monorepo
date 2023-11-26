package com.kelex.consumers.shared.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.LinkedHashMap;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(indexName = "podcasts", createIndex = true)
public class Podcast {
    @Id
    private int id;
    @Field(type = FieldType.Text)
    private String title;
    @Field(type = FieldType.Text)
    private String description;
    @Field(type = FieldType.Text)
    private String cover_art;

    public static Podcast from(LinkedHashMap payload) {
        return new Podcast(
                (int) payload.get("id"),
                (String) payload.get("title"),
                (String) payload.get("description"),
                (String) payload.get("cover_art")
        );
    }

}

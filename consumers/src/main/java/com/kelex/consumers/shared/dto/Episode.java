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
@Document(indexName = "episodes", createIndex = false)
public class Episode {
    @Id
    private String id;
    @Field(type = FieldType.Text)
    private String title;
    @Field(type = FieldType.Text)
    private String description;
    @Field(type = FieldType.Text)
    private String mediaUrl;
    @Field(type = FieldType.Nested, includeInParent = true)
    private Podcast podcast;

    public static Episode from(LinkedHashMap payload) {
        return new Episode(
                (int) payload.get("id") + "",
                (String) payload.get("title"),
                (String) payload.get("description"),
                (String) payload.get("media_url"),
                Podcast.from((LinkedHashMap) payload.get("podcast"))
        );
    }
}

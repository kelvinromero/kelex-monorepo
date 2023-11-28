package com.kelex.webplayerbff.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TranscriptLine {
    @Field(type = FieldType.Text)
    private String text;
    @Field(type = FieldType.Text)
    private String start;
    @Field(type = FieldType.Text)
    private String duration;
}

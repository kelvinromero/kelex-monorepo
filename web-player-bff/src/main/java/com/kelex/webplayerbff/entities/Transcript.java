package com.kelex.webplayerbff.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Transcript {
    @Field(type = FieldType.Nested)
    private ArrayList<TranscriptLine> lines;

    public void addLine(String text, String start, String duration) {
        lines.add(new TranscriptLine(text, start, duration));
    }
}

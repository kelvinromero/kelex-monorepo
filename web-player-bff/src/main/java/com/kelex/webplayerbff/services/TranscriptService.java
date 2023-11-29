package com.kelex.webplayerbff.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kelex.webplayerbff.controllers.EpisodeController;
import io.opentelemetry.instrumentation.annotations.SpanAttribute;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import com.kelex.webplayerbff.entities.Transcript;
import io.opentelemetry.instrumentation.annotations.WithSpan;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class TranscriptService {

    private final WebClient webClient;
    private static final Logger log = LoggerFactory.getLogger(EpisodeController.class);

    public TranscriptService() {
        this.webClient = WebClient.builder().baseUrl("http://cortex").build();
    }

    @WithSpan
    @Cacheable(cacheNames = "transcripts")
    public Transcript getTranscript(@SpanAttribute("video_id") String video_id) {
        String jsonResponse = webClient.get()
                .uri("/transcript?video_id=" + video_id)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        Transcript transcript = new Transcript(new ArrayList<>() );
        for (LinkedHashMap item : getDeserializedLines(jsonResponse)) {
            transcript.addLine(
                    (String) item.get("text"),
                    item.get("start").toString(),
                    item.get("duration").toString()
            );
        }
         return transcript;
    }

    @WithSpan
    private ArrayList<LinkedHashMap> getDeserializedLines(String json) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            Map<String, Object> jsonObj =  objectMapper.readValue(json, Map.class);
            return (ArrayList<LinkedHashMap>) jsonObj.get("transcript");
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error deserializing JSON", e);
        }
    }
}
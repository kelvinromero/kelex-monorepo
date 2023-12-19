package com.kelex.webplayerbff.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kelex.webplayerbff.controllers.EpisodeController;
import com.kelex.webplayerbff.entities.Message;
import com.kelex.webplayerbff.entities.Transcript;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class WordDefinitionService {

    private final WebClient webClient;
    private static final Logger log = LoggerFactory.getLogger(EpisodeController.class);

    public WordDefinitionService() {
        this.webClient = WebClient.builder().baseUrl("http://cortex").build();
    }

    @Cacheable(cacheNames = "definitions")
    public ArrayList<String> getWordDefinition(String word) {
        String jsonResponse = webClient.get()
                .uri("/word_definitions/" + word)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return getDeserializedLines(jsonResponse);
    }

    private ArrayList<String> getDeserializedLines(String json) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            Map<String, Object> jsonObj =  objectMapper.readValue(json, Map.class);
            ArrayList<String> definitions = new ArrayList<>();
            for (Object definition : (ArrayList) jsonObj) {
                definitions.add((String) (definition));
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error deserializing JSON", e);
        }
        return null;
    }
}
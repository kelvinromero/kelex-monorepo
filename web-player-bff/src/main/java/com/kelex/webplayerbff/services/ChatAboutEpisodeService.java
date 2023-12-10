package com.kelex.webplayerbff.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kelex.webplayerbff.controllers.EpisodeController;
import com.kelex.webplayerbff.entities.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class ChatAboutEpisodeService {

    private final WebClient webClient;
    private static final Logger log = LoggerFactory.getLogger(EpisodeController.class);

    public ChatAboutEpisodeService() {
        this.webClient = WebClient.builder().baseUrl("http://cortex").build();
    }

    public Message sendMessage(String episodeId, String content) {
        Message message = new Message(content);

        String jsonResponse = webClient.post()
                .uri("/episode/" + episodeId + "/chat")
                .bodyValue(message)
                .retrieve()
                .bodyToMono(String.class)
                .block();

         return getDeserializedLines(jsonResponse);
    }

    private Message getDeserializedLines(String json) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            Map<String, Object> jsonObj =  objectMapper.readValue(json, Map.class);
            return new Message(
                    (String) jsonObj.get("content"),
                    (String) jsonObj.get("role")
            );
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error deserializing JSON", e);
        }
    }
}
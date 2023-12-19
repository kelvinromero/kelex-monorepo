package com.kelex.consumers.services;

import com.kelex.consumers.episodes.Receiver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;


@Service
public class TranscriptService {

    private final WebClient webClient;
    private static final Logger log = LoggerFactory.getLogger(Receiver.class);

    public TranscriptService() {
        this.webClient = WebClient.builder().baseUrl("http://cortex").build();
    }

    public void generateTranscript(String episode_id, String video_id) {
        String jsonResponse = webClient.post()
                .uri("/episode/" + episode_id + "/generate_transcript/" + video_id)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        log.info("Transcript generated: " + jsonResponse);
    }
}
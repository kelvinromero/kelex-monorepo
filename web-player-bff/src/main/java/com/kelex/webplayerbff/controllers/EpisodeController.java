package com.kelex.webplayerbff.controllers;

import com.kelex.webplayerbff.entities.Episode;
import com.kelex.webplayerbff.repositories.EpisodeRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Controller
public class EpisodeController
{
    private final EpisodeRepository episodeRepository;
    private static final Logger log = LoggerFactory.getLogger(EpisodeController.class);

    private final  WebClient webClient = WebClient.builder().baseUrl("http://cortex").build();
    public EpisodeController(EpisodeRepository episodeRepository) {
        this.episodeRepository = episodeRepository;
    }

    @QueryMapping
    List<Episode> episodes()
    {
        log.info("episodes");
        return episodeRepository.findAll();
    }

    @QueryMapping
    List<Episode> episodesByTitle(@Argument String title)
    {
        log.info("episodesByTitle");
        return episodeRepository.findByTitle(title);
    }

    @QueryMapping
    List<Episode> findEpisodeByFuzzyTitle(@Argument String title)
    {
        log.info("findEpisodeByFuzzyTitle");
        return episodeRepository.findByFuzzyTitle("*" + title + "*");
    }

    @QueryMapping
    Episode episodeById(@Argument String id)
    {
        log.info("episodeById");
        Episode episode = episodeRepository.findById(id).orElse(null);

        try {
            String video_id = episode.getMediaUrl().split("v=")[1];

            log.info("getTranscript video_id: " + video_id);
            String transcript = this.webClient.get()
                    .uri("/transcript?video_id=" + video_id)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            log.info("transcript: " + transcript);

            episode.setTranscript(transcript);
        } catch (Exception e) {
            log.error("Error getting transcript: " + e);
        }

        return episode;
    }
}


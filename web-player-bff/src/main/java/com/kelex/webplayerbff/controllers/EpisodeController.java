package com.kelex.webplayerbff.controllers;

import com.kelex.webplayerbff.entities.Episode;
import com.kelex.webplayerbff.entities.Message;
import com.kelex.webplayerbff.entities.Transcript;
import com.kelex.webplayerbff.repositories.EpisodeRepository;
import com.kelex.webplayerbff.services.ChatAboutEpisodeService;
import com.kelex.webplayerbff.services.TranscriptService;
import com.kelex.webplayerbff.services.WordDefinitionService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.List;

@Controller
public class EpisodeController
{
    private final EpisodeRepository episodeRepository;
    private static final Logger log = LoggerFactory.getLogger(EpisodeController.class);

    private final TranscriptService transcriptService;
    private final ChatAboutEpisodeService chatService;
    private final WordDefinitionService wordDefinitionService;
    public EpisodeController(EpisodeRepository episodeRepository,
                             TranscriptService transcriptService,
                             ChatAboutEpisodeService chatService,
                                WordDefinitionService wordDefinitionService
    ) {
        this.episodeRepository = episodeRepository;
        this.transcriptService = transcriptService;
        this.chatService = chatService;
        this.wordDefinitionService = wordDefinitionService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
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
            transcriptService.getTranscript(video_id);
            episode.setTranscript(transcriptService.getTranscript(video_id));
        } catch (Exception e) {
            log.error("Error getting transcript: " + e);
        }

        return episode;
    }

    @SchemaMapping(typeName = "Mutation", field = "chatAboutEpisode")
    public Message chatAboutEpisode(
            @Argument String episodeId,
            @Argument String message
    ) {

        return this.chatService.sendMessage(episodeId, message);
    }

    @QueryMapping
    ArrayList<String> getWordDefinition(@Argument String word) {
        return this.wordDefinitionService.getWordDefinition(word);
    }
}


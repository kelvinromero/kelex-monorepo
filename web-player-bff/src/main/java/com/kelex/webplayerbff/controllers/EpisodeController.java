package com.kelex.webplayerbff.controllers;

import com.kelex.webplayerbff.entities.Episode;
import com.kelex.webplayerbff.repositories.EpisodeRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Controller
public class EpisodeController
{
    private final EpisodeRepository episodeRepository;
    private static final Logger log = LoggerFactory.getLogger(EpisodeController.class);

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
}


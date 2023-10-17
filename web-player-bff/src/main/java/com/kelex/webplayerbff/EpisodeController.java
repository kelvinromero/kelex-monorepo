package com.kelex.webplayerbff;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class EpisodeController
{
    private final EpisodeRepository episodeRepository;

    public EpisodeController(EpisodeRepository episodeRepository) {
        this.episodeRepository = episodeRepository;
    }

    @QueryMapping
    List<Episode> episodes()
    {
        return episodeRepository.findAll();
    }

    @QueryMapping
    List<Episode> episodesByTitle(@Argument String title)
    {
        return episodeRepository.findByTitle(title);
    }

    @QueryMapping
    List<Episode> findEpisodeByFuzzyTitle(@Argument String title)
    {
        return episodeRepository.findByFuzzyTitle("*" + title + "*");
    }
}

package com.kelex.consumers.repositories;

import com.kelex.consumers.shared.dto.Episode;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface EpisodeRepository extends ElasticsearchRepository<Episode, Integer> {
}

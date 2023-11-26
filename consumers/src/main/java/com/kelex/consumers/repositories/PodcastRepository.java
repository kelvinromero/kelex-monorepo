package com.kelex.consumers.repositories;

import com.kelex.consumers.shared.dto.Podcast;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface PodcastRepository extends ElasticsearchRepository<Podcast, Integer> {
}

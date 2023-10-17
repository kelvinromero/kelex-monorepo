package com.kelex.webplayerbff;


import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface EpisodeRepository extends ElasticsearchRepository<Episode, String> {

    @Query("{\"match\": {\"title\": {\"query\": \"?0\"}}}")
    List<Episode> findByTitle(String title);

    List<Episode> findAll();

    @Query("{\"fuzzy\": {\"title\": {\"value\": \"?0\", \"fuzziness\": \"AUTO\"}}}")
    List<Episode> findByFuzzyTitle(String title);
}

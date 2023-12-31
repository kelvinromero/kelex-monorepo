package com.kelex.consumers.episodes;

import com.kelex.consumers.shared.dto.Episode;
import com.kelex.consumers.repositories.EpisodeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.LinkedHashMap;

@RabbitListener(queues = {"${episodes.queue.name}"})
public class Receiver {

    @Autowired
    private EpisodeRepository repository;

    private static final Logger log = LoggerFactory.getLogger(Receiver.class);

    @RabbitHandler
    public void receive(LinkedHashMap episode) {
        process(Episode.from(episode));
    }

    private void process(Episode episode) {
        try {
            log.info("Saving episode: " + episode);
            repository.save(episode);
            log.info("Episode saved: " + episode);
        } catch (Exception e) {
            log.error("Error saving episode: " + episode, e);
        }
    }
}

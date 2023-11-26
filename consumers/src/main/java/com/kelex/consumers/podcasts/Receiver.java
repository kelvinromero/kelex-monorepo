package com.kelex.consumers.podcasts;

import com.kelex.consumers.repositories.PodcastRepository;
import com.kelex.consumers.shared.dto.Podcast;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.LinkedHashMap;

@RabbitListener(queues = "${podcasts.queue.name}")
public class Receiver {

    @Autowired
    private PodcastRepository repository;

    private static final Logger log = LoggerFactory.getLogger(Receiver.class);

    @RabbitHandler
    public void receive(LinkedHashMap podcast) {
        process(Podcast.from(podcast));
    }

    private void process(Podcast podcast) {
        try {
            log.info("Saving podcast: " + podcast);
            repository.save(podcast);
            log.info("Podcast saved: " + podcast);
        } catch (Exception e) {
            log.error("Error saving podcast: " + podcast, e);
        }
    }

}

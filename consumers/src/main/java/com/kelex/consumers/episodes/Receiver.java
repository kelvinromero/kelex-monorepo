package com.kelex.consumers.episodes;

import com.kelex.consumers.dto.Episode;
import com.kelex.consumers.repositories.EpisodeRepository;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

import java.util.LinkedHashMap;

@RabbitListener(queues = {"${episodes.queue.name}"})
public class Receiver {

    @Autowired
    private EpisodeRepository repository;

    @RabbitHandler
    public void receive(Episode episode) {
        System.out.println("Received" + episode);
    }

    @RabbitHandler
    public void receive(LinkedHashMap episode) {
        process(episode);
    }

    private void process(LinkedHashMap episode) {
        System.out.println("Received" + Episode.from(episode).toString());
        repository.save(Episode.from(episode));
    }
}

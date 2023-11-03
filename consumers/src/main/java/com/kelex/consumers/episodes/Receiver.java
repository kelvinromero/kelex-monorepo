package com.kelex.consumers.episodes;

import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;

@RabbitListener(queues = "podcast.episode.published")
public class Receiver {

    @RabbitHandler
    public void receive(String payload) {
        System.out.println("Received <" + payload + ">");
    }
}

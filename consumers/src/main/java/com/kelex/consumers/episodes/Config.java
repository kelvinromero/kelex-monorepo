package com.kelex.consumers.episodes;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;


@Profile({"episodes"})
@Configuration
public class Config {

    @Bean
    public Queue queue() {
        return new Queue("podcast.episode.published", false);
    }

    @Profile("receiver")
    @Bean
    public Receiver receiver() {
        return new Receiver();
    }
}

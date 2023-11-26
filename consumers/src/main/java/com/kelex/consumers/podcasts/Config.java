package com.kelex.consumers.podcasts;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile({"podcasts"})
@Configuration
public class Config {

    @Value("${podcasts.queue.name}")
    private String QUEUE_NAME;

    @Value("${podcasts.queue.durable}")
    private String DURABLE;

    @Bean
    public Queue queue() {
        return new Queue(QUEUE_NAME, Boolean.parseBoolean(DURABLE));
    }

    @Profile("receiver")
    @Bean
    public Receiver receiver() {
        return new Receiver();
    }

    @Bean
    public MessageConverter converter(){
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public AmqpTemplate amqpTemplate(ConnectionFactory connectionFactory){
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(converter());
        return rabbitTemplate;
    }
}

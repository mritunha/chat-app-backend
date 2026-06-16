package com.substring.chat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    // this is used to configure message broker which is used to route the messages to the clients
public void configureMessageBroker(MessageBrokerRegistry config) {
    // srever will send the messages to the clients with the prefix /topic
    config.enableSimpleBroker("/topic");
    //  /topics is the prefix for the messages 
    config.setApplicationDestinationPrefixes("/app");
// this is used to configure the endpoint for the clients to connect to the server
}
@Override
public void registerStompEndpoints(StompEndpointRegistry registry) {
    // people will subscribe to the chat endpoint to receive the messages from the server
  registry.addEndpoint("/chat")
    .setAllowedOrigins("http://localhost:5173")
    .withSockJS();// it will enables fallback of sopjs
    
}
// /chat endpint pr hmara connection establish hoga and uske baad hm /app prefix ke sath messages bhejenge aur /topic prefix ke sath messages receive krenge
}

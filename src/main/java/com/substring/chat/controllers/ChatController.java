package com.substring.chat.controllers;

import java.time.LocalDateTime;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.substring.chat.config.AppConstants;
import com.substring.chat.entities.Message;
import com.substring.chat.entities.Room;
import com.substring.chat.playload.MessageRequest;
import com.substring.chat.repositories.RoomRepository;

@Controller
@CrossOrigin(AppConstants.FRONTEND_BASE_URL)
public class ChatController {


    private RoomRepository roomRepository;
    public ChatController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }
    // for sending and receving messages
    // yaha pr room id aur message decide ho rha hai ki konsa message konsa room ko jana chahiye
    @MessageMapping("/sendMessage/{roomId}")
    // yha pr hmne /topic/room/{roomId} ko subscribe kiya hai to uske baad hm /app/sendMessage/{roomId} pr message bhejenge 
    @SendTo("/topic/room/{roomId}")
    public Message sendMessage( 
        @DestinationVariable String roomId,
        @RequestBody MessageRequest request) 
    {
        


       Room room = roomRepository.findByRoomId(request.getRoomId());
       Message message = new Message();
         message.setContent(request.getContent());
         message.setSender(request.getSender());
         message.setTimestamp(LocalDateTime.now());
         if(room!= null){
            room.getMessages().add(message);
            roomRepository.save(room);
         } else{
            throw new RuntimeException("Room not found buddy");
         }
         return message;
    }

}

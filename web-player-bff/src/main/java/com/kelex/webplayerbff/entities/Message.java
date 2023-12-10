package com.kelex.webplayerbff.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    private String content;
    private String role;

    public Message(String content) {
        this.content = content;
        this.role = "user";
    }

    @Override
    public String toString() {
        return "Message{" +
                "content='" + content + '\'' +
                ", role='" + role + '\'' +
                '}';
    }

}

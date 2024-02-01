"use client";

import io from "socket.io-client";
import React, { useEffect, useState, useRef } from "react";

function Page() {
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_serverUrl, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.on("connect", () => {
      console.log("Connected:", socketRef.current.id);
      socketRef.current.emit("chatMessage", "Hello World has connected");
    });

    socketRef.current.on("connect_error", (error) => {
      console.error("Connection error:", error);
      // Implement error handling, maybe show an error message to the user
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected:", socketRef.current.id);
      socketRef.current.emit("chatMessage", "Hello World has disconnected");
    });

    socketRef.current.on("chatMessage", (message) => {
      console.log("Received message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    if (chat.trim() !== "") {
      socketRef.current.emit("chatMessage", chat);
      setChat("");
    }
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          className="p-4 border"
          placeholder="Enter message"
          value={chat}
          onChange={(e) => setChat(e.target.value)}
        />
        <button className="border p-4">Send Message</button>
      </form>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </div>
  );
}

export default Page;

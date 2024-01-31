"use client";

import { io } from "socket.io-client";
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
      retries: 5,
    });

    socketRef.current.on("connect", () => {
      console.log("Connected:", socketRef.current.id);
    });

    socketRef.current.on("connect_error", () => {
      console.log("Attempting to reconnect...");
      setTimeout(() => {
        socketRef.current.connect();
      }, 1000);
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected:", socketRef.current.id);
    });

    socketRef.current.on("chatMessage", (message) => {
      console.log("Received message:", message);
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (chat.trim() !== "") {
      socketRef.current.emit("chatMessage", chat);
      setChat("");
    }
  };
  return (
    <div>
      <div>
        <input
          type="text"
          className="p-4 border"
          placeholder="Enter message"
          value={chat}
          onChange={(e) => setChat(e.target.value)}
        />
        <button onClick={() => sendMessage()} className="border p-4">
          Send Message
        </button>
        <div>
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;

"use client";

import io from "socket.io-client";
import { List } from "react-virtualized";
import React, { useEffect, useState, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase.config";

function Page() {
  const [chat, setChat] = useState("");
  const socketRef = useRef(null);
  const [userDetails, setUserDetails] = useState({
    email: "",
    displayName: "",
    photoURL: "",
  });
  const containerRef = useRef(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("User not found");
        router.push("/");
      } else {
        setUserDetails({
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      }
    });
  }, []);

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_serverUrl, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.on("connect", () => {
      console.log("Connected: ", socketRef.current.id);
      socketRef.current.emit("user-joined", userDetails.displayName);
    });

    socketRef.current.on("user-joined", (user) => {
      console.log("Received User : ", user);
    });

    socketRef.current.on("chatMessage", (message) => {
      console.log("Received message:", message);
      appendElement(message);
    });

    socketRef.current.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected:", socketRef.current.id);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [userDetails]);

  function handleSubmit(e) {
    e.preventDefault();
    if (chat.trim() !== "") {
      socketRef.current.emit("chatMessage", { text: chat, userDetails });
      console.log("Sent Message : ", { text: chat, userDetails, type: "sent" });
      appendElement({ text: chat, userDetails, type: "sent" });
      setChat("");
    }
  }

  const appendElement = ({ text, userDetails, type }) => {
    const newElement = document.createElement("div");
    newElement.textContent = `${userDetails.displayName} : ${text}`;
    newElement.classList.add(
      "p-4",
      "border",
      "m-4",
      "w-1/2",
      "rounded-lg",
      type === "sent" ? "bg-green-200" : "bg-blue-200",
      type === "sent" ? "float-right" : "float-left"
    );
    containerRef.current.prepend(newElement);
    newElement.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  return (
    <div className="relative h-screen w-screen">
      <form onSubmit={(e) => handleSubmit(e)} className="border w-full flex">
        <input
          type="text"
          className="p-4 border w-full"
          placeholder="Enter message"
          value={chat}
          onChange={(e) => setChat(e.target.value)}
        />
        <button className=" p-4 whitespace-nowrap">Send Message</button>
      </form>
      <div ref={containerRef}></div>,
    </div>
  );
}

export default Page;

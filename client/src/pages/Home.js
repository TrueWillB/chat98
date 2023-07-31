import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import GiphySearchBar from "../components/giphySearchBar";

// Madeline to do: add logic so chat screen automatically scrolls/jumps down when new message is sent

export default function Home() {
  // hooks for socket instance, current message input, and array of messages
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // effect hook to set up socket connection and message event listener
  useEffect(() => {
    // create socket connection to server
    const newSocket = io.connect("http://localhost:3001");
    setSocket(newSocket);
    //listens for message event from server
    newSocket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => newSocket.close();
  }, [setSocket]);

  const handleSelectGif = (url) => {
    const gifElement = <img alt="Selected GIF" src={url} />;
    setMessages((prevMessages) => [
      ...prevMessages,
      { senderId: "1", receiverId: "2", content: gifElement },
    ]);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    //If theres a socket connection, emit a message event with the current message input
    if (socket) {
      socket.emit("message", {
        senderId: "1",
        receiverId: "2",
        content: message,
      });
      setMessage("");
    }
  };

  return (
    <div id="chatScreen">
      <Card
        sx={{
          width: "95%",
          border: 0.3,
          borderColor: "#e5e5e5",
          maxHeight: "75vh",
          margin: "auto",
          overflowY: "auto",
        }}
      >
        {messages.map((message, i) => (
          <div
            key={i}
            id={message.senderId === "1" ? "sentChat" : "receivedChat"}
          >
            <p>
              From: User {message.senderId} To: User {message.receiverId} :{" "}
              {message.content}
            </p>
          </div>
        ))}
      </Card>
      <div id="textareaContainer">
        <textarea
          id="chatTextarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div id="textareaButtons">
          <CardActions style={{ flexDirection: "column", margin: "8" }}>
            <Button variant="contained" onClick={sendMessage}>
              Send
            </Button>
          </CardActions>
        </div>
      </div>
      <GiphySearchBar onSelectGif={handleSelectGif} />
    </div>
  );
}

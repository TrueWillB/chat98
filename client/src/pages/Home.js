import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import GiphySearchBar from "../components/giphySearchBar";
import EmojiPicker from "emoji-picker-react"; // remember there's a dark theme for emmoji picker!

// Madeline to do: add logic so chat screen automatically scrolls/jumps down when new message is sent

export default function Home() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGiphySearch, setShowGiphySearch] = useState(false);
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

  const handleToggleGiphySearch = () => {
    setShowGiphySearch((prevShow) => !prevShow);
  };

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

  const handleEmojiButtonClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <div id="chatContainer">
      <div id="chatHeader" class="chatHeader">
        <Button
          class="homeButtons"
          id="chatXButton"
          onClick={() => console.log("Button clicked")}
        >
          ×
        </Button>
        <p id="chatHeaderText">Chat with (Username)</p>
      </div>
      <div id="chatScreen">
        {messages.map((message, i) => (
          <div
            key={i}
            id={message.senderId === "1" ? "sentChat" : "receivedChat"}
          >
            <p id="messageContent">
              {message.content}{" "}
              <p id="fromMessageText">
                From User{message.senderId}, to User
                {message.receiverId}
              </p>
            </p>
          </div>
        ))}
      </div>
      <div id="textareaContainer">
        <textarea
          id="chatTextarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div id="textareaSendButton">
          <Button class="homeButtons" onClick={sendMessage}>
            Send
          </Button>
          <div>
            {" "}
            <div id="textareaButtons">
              <button class="homeButtons" onClick={handleEmojiButtonClick}>
                Emoji
              </button>
              {showEmojiPicker && (
                <div
                  className="emojiPickerContainer"
                  style={{ marginBottom: 1 }}
                >
                  <EmojiPicker height={400} width={500} />
                </div>
              )}
            </div>
            <button class="homeButtons" onClick={handleToggleGiphySearch}>
              GIFs
            </button>
            {showGiphySearch && (
              <GiphySearchBar onSelectGif={handleSelectGif} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState, useContext, useRef } from "react";
import io from "socket.io-client";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import GiphySearchBar from "../components/giphySearchBar";
import EmojiPicker from "emoji-picker-react"; // remember there's a dark theme for emmoji picker!

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER_CHATS } from "../utils/queries";
import { SEND_MESSAGE } from "../utils/mutations";
import auth from "../utils/auth";
import { SelectedFriendContext } from "../components/SelectedFriendContext";

// Madeline to do: add logic so chat screen automatically scrolls/jumps down when new message is sent

export default function Home() {
  const [chat, setChat] = useState(null);
  const [chatId, setChatId] = useState(null);
  const { selectedFriendId } = useContext(SelectedFriendContext);
  const profile = auth.getProfile();
  const [sendMessageMutation] = useMutation(SEND_MESSAGE);
  const { loading, error, data } = useQuery(QUERY_USER_CHATS, {
    variables: { userId: profile.data._id, friendId: selectedFriendId },
    skip: !selectedFriendId,
  });

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGiphySearch, setShowGiphySearch] = useState(false);

  // hooks for socket instance, current message input, and array of messages
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatScreenRef = useRef(null);
  // effect hook to set up socket connection and message event listener
  useEffect(() => {
    // create socket connection to server
    const newSocket = io.connect("http://localhost:3001");

    // const newSocket = io();

    setSocket(newSocket);
    //listens for message event from server
    newSocket.on("message", (message) => {
      setChat((chat) => ({
        ...chat,
        messages: [
          ...chat.messages,
          {
            senderId: message.senderId._id,
            receiverId: message.receiverId._id,
            content: message.content,
          },
        ],
      }));
    });

    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    setChat(null);
    setChatId(null);
    if (!loading && data?.userChats?.messages) {
      const updatedChat = {
        ...data.userChats,
        messages: data.userChats.messages.map((msg) => ({
          ...msg,
          senderId: msg.senderId?._id,
          receiverId: msg.receiverId?._id,
        })),
      };
      setChat(updatedChat);
      setChatId(data.userChats._id);
    }
  }, [loading, data]);

  const handleToggleGiphySearch = () => {
    setShowGiphySearch((prevShow) => !prevShow);
  };

  const handleSelectGif = (url) => {
    const gifElement = <img alt="Selected GIF" src={url} />;
    setChat((chat) => ({
      ...chat,
      messages: [
        ...chat.messages,
        { senderId: "1", receiverId: "2", content: gifElement },
      ],
    }));
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (socket) {
      socket.emit("message", {
        senderId: profile.data._id,
        receiverId: selectedFriendId,
        content: message,
      });

      try {
        const { data } = await sendMessageMutation({
          variables: {
            chatId,
            senderId: profile.data._id,
            content: message,
          },
        });

        if (data) {
          // update chat in state
          setChat((chat) => ({
            ...chat,
            messages: [
              ...chat.messages,
              {
                senderId: profile.data._id,
                receiverId: selectedFriendId,
                content: message,
              },
            ],
          }));
        }
        setMessage("");
      } catch (error) {
        console.log("Error");
      }
    }
  };

  useEffect(() => {
    const chatScreenElement = chatScreenRef.current;
    if (chatScreenElement) {
      chatScreenElement.scrollTop = chatScreenElement.scrollHeight;
    }
  }, [messages]);

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
      <div id="chatScreen" ref={chatScreenRef}>
        {messages.map((message, i) => (
          <div
            key={i}
            id={
              message.senderId === profile.data._id
                ? "sentChat"
                : "receivedChat"
            }
          >
            <p>{message.content}</p>
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

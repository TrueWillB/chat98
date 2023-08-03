import React, { useEffect, useState, useContext, useRef } from "react";
import io from "socket.io-client";
import Button from "@mui/material/Button";
import GiphySearchBar from "../components/giphySearchBar";
/*import EmojiPicker from "emoji-picker-react";*/

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER_CHATS, QUERY_USER_BY_ID } from "../utils/queries";
import { SEND_MESSAGE } from "../utils/mutations";
import auth from "../utils/auth";
import { SelectedFriendContext } from "../components/SelectedFriendContext";

export default function Home() {
  const [chat, setChat] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [friendUsername, setFriendUsername] = useState(null);
  const { selectedFriendId } = useContext(SelectedFriendContext);
  const chatRef = useRef(null);

  const profile = auth.getProfile();

  const [sendMessageMutation] = useMutation(SEND_MESSAGE);
  const { loading, error, data } = useQuery(QUERY_USER_CHATS, {
    variables: { userId: profile.data._id, friendId: selectedFriendId },
    skip: !selectedFriendId,
  });

  const { data: friendData } = useQuery(QUERY_USER_BY_ID, {
    variables: { userID: selectedFriendId },
    skip: !selectedFriendId,
  });

  useEffect(() => {
    if (friendData) {
      setFriendUsername(friendData.userByID.username);
    }
  }, [friendData]);

  /* const [showEmojiPicker, setShowEmojiPicker] = useState(false); */
  const [showGiphySearch, setShowGiphySearch] = useState(false);

  // hooks for socket instance, current message input, and array of messages
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");

  // effect hook to set up socket connection and message event listener
  useEffect(() => {
    // create socket connection to server
    // const newSocket = io.connect("http://localhost:3001");

    const newSocket = io();

    setSocket(newSocket);
    //listens for message event from server
    newSocket.on("message", (message) => {
      //this will skip if the message was sent by current user (avoids duplicate msg)
      if (message.senderId === profile.data._id) {
        return;
      }
      setChat((chat) => ({
        ...chat,
        messages: chat
          ? [
              ...chat.messages,
              {
                senderId: message.senderId._id,
                receiverId: message.receiverId._id,
                content: message.content,
              },
            ]
          : [],
      }));
    });

    return () => newSocket.close();
  }, [setSocket, profile.data._id]);

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

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

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
      try {
        const { data } = await sendMessageMutation({
          variables: {
            chatId,
            senderId: profile.data._id,
            content: message,
          },
        });

        if (data) {
          socket.emit("message", {
            senderId: profile.data._id,
            receiverId: selectedFriendId,
            content: message,
          });
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
  /*
  const handleEmojiButtonClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
*/
  return (
    <div id="chatContainer">
      <div id="chatAndSidebarHeader" className="chatAndSidebarHeader">
        <button
          className="sidebarHeaderButtons"
          id="chatXButton"
          onClick={() => console.log("Button clicked")}
        >
          ×
        </button>
        {!friendData ? (
          <p id="chatHeaderText">Select a friend to chat with</p>
        ) : (
          <p id="chatHeaderText">Chat with {friendUsername}</p>
        )}
      </div>
      <div id="chatScreen">
        {chat?.messages?.map((message, i) => (
          <div
            key={i}
            id={
              message.senderId === profile.data._id
                ? "sentChat"
                : "receivedChat"
            }
          >
            <p>{message.content}</p>
            <div ref={chatRef} />
          </div>
        ))}
      </div>
      <div id="textareaContainer">
        <textarea
          id="chatTextarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div id="textareaButtons">
          <button className="homeButtons" id="sendButton" onClick={sendMessage}>
            Send
          </button>
          <button className="homeButtons" onClick={handleToggleGiphySearch}>
            GIFs
          </button>
        </div>
      </div>
      {showGiphySearch && (
        <div id="gifSearchContainer" className="gifSearchContainer">
          <GiphySearchBar onSelectGif={handleSelectGif} />
        </div>
      )}
    </div>
  );
}

import React, { useState, useContext } from "react";
import { UserPlus, UserMinus, User } from "feather-icons-react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_USERS } from "../utils/queries";
import {
  REMOVE_FRIEND,
  SEND_FRIEND_REQUEST,
  START_CHAT,
} from "../utils/mutations";
import { TextField, Tabs, Tab } from "@mui/material";
import auth from "../utils/auth";
import { SelectedFriendContext } from "./SelectedFriendContext";

const FriendsList = () => {
  const profile = auth.getProfile();
  const { loading, error, data, refetch } = useQuery(QUERY_USER, {
    variables: { username: profile.data.username },
  });

  const {
    loading: loadingAllUsers,
    error: errorAllUsers,
    data: allUserData,
  } = useQuery(QUERY_USERS);
  const [userSearch, setUserSearch] = useState("");
  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST);
  const [tabValue, setTabValue] = useState(0);

  const handleAddFriend = async (friendIdToAdd) => {
    try {
      await sendFriendRequest({
        variables: { senderId: data.user._id, receiverId: friendIdToAdd },
      });
      console.log("Friend request sent!");
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const [removeFriend] = useMutation(REMOVE_FRIEND);
  const [startChat] = useMutation(START_CHAT);
  const { setSelectedFriendId } = useContext(SelectedFriendContext);

  const handleRemoveFriend = async (friendId) => {
    try {
      await removeFriend({
        variables: { username: profile.data.username, friendId: friendId },
      });
      alert("Friend removed!");
      refetch();
    } catch (err) {
      alert(err);
    }
  };

  const handleStartChat = async (friendId) => {
    setSelectedFriendId(friendId);
    try {
      await startChat({
        variables: { user1Id: profile.data._id, user2Id: friendId },
      });
      alert("Chat started!");
    } catch (err) {
      alert(err);
    }
  };

  if (loading || loadingAllUsers) return <p>Loading...</p>;
  if (error || errorAllUsers) return <p>Error :</p>;

  return (
    <React.Fragment>
      <Tabs
        value={tabValue}
        onChange={(event, newValue) => setTabValue(newValue)}
      >
        <Tab label="Friends Search" />
        <Tab label="User Search" />
      </Tabs>
      {tabValue === 0 && (
        <div>
          {data?.user?.friends?.map((friend) => (
            <div key={friend._id} className="userList">
              <span
                className="username"
                onClick={() => handleStartChat(friend._id)}
              >
                {friend.username}
              </span>
              <button
                className="friendButton"
                onClick={() => handleRemoveFriend(friend._id)}
              >
                <UserMinus stroke="red" size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
      {tabValue === 1 && (
        <div>
          <TextField
            label="Search Usernames"
            onChange={(e) => setUserSearch(e.target.value)}
          />
          {allUserData.users
            .filter((user) =>
              user.username.toLowerCase().includes(userSearch.toLowerCase())
            )
            .map((user) => (
              <div key={user._id} className="userList">
                <span className="username">{user.username}</span>
                <button
                  className="friendButton"
                  onClick={() => handleAddFriend(user._id)}
                >
                  <UserPlus stroke="blue" size={16} />
                </button>
              </div>
            ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default FriendsList;

import React, { useState, useContext } from "react";
import { UserPlus, UserMinus, User, UserCheck } from "feather-icons-react";
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

  //id of the current user
  const currentUserId = data?.user?._id;

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
      // console.log("clicked friend add button");
      // console.log("friendIdToAdd: ", friendIdToAdd);
      // console.log("currentUserId: ", currentUserId);
      await sendFriendRequest({
        variables: { senderId: await data.user._id, receiverId: friendIdToAdd },
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
    try {
      await startChat({
        variables: { user1Id: profile.data._id, user2Id: friendId },
      });
      setSelectedFriendId(friendId);
      alert("Chat started!");
    } catch (err) {
      alert(err);
    }
  };

  if (loading || loadingAllUsers) return <p>Loading...</p>;
  if (error || errorAllUsers) return <p>Error :</p>;

  const listForFilter =
    allUserData?.users.filter((user) => user._id != currentUserId) || [];

  return (
    <div>
      <div id="friendsAndUsersContainer">
        <button
          id="sidebarUserButtons"
          className={`sidebarTabs ${tabValue === 1 ? "active" : ""}`}
          onClick={() => setTabValue(1)}
        >
          Search Users
        </button>
        <button
          id="sidebarUserButtons"
          className={`sidebarTabs ${tabValue === 0 ? "active" : ""}`}
          onClick={() => setTabValue(0)}
        >
          Your Friends
        </button>
      </div>
      {tabValue === 0 && (
        <div id="friendsListPopulate">
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
          <input
            type="text"
            placeholder="Search Usernames"
            onChange={(e) => setUserSearch(e.target.value)}
            className="sidebarSearch"
          />
          {listForFilter
            .filter((user) =>
              user.username.toLowerCase().includes(userSearch.toLowerCase())
            )
            .map((user, index) => (
              <div className="userList" key={user._id}>
                <span className="username">{user.username}</span>
                {/* This is a conditional render to prevent button from loading if they are already a pending friend */}
                {user.pendingFriends
                  .map((user) => user._id)
                  .includes(currentUserId) ? (
                  <button className="friendButton">
                    <User stroke="Gray" size={16} />
                  </button>
                ) : user.friends
                    .map((friend) => friend._id)
                    .includes(currentUserId) ? (
                  <button
                    className="friendButton"
                    onClick={() => console.log("clicked remove friend button")}
                  >
                    <UserCheck stroke="Green" size={16} />
                  </button>
                ) : (
                  <button
                    className="friendButton"
                    onClick={() => handleAddFriend(user._id)}
                  >
                    <UserPlus stroke="Blue" size={16} />
                  </button>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
export default FriendsList;

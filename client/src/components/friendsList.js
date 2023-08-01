import React, { useState } from "react";
import { UserPlus, UserMinus, User } from "feather-icons-react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USERS, QUERY_USER } from "../utils/queries";
import { REMOVE_FRIEND, SEND_FRIEND_REQUEST } from "../utils/mutations";
// import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import auth from "../utils/auth";

const FriendsList = (props) => {
  const profile = auth.getProfile();
  const {
    loading,
    error,
    data: currentUserData,
    refetch,
  } = useQuery(QUERY_USER, {
    variables: { username: profile.data.username },
  });

  //this is the userId of the currently logged in user. To be used for friend add/remove
  const currentUser = currentUserData?.user;
  const currentUserId = currentUserData?.user?._id;

  const {
    loading: loadingAllUsers,
    error: errorAllUsers,
    data: userListData,
  } = useQuery(QUERY_USERS);
  const [userSearch, setUserSearch] = useState("");

  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST);

  const handleAddFriend = async (friendIdToAdd) => {
    console.log("clicked friend add button");
    console.log("friendIdToAdd: ", friendIdToAdd);
    console.log("currentUserId: ", currentUserId);
    try {
      await sendFriendRequest({
        variables: { senderId: currentUserId, receiverId: friendIdToAdd },
      });
      console.log("Friend request sent!");
      refetch();
    } catch (err) {
      console.log(err);
    }
  };
  console.log("Here's list of all users");
  console.log(userListData?.users);

  // const [removeFriend] = useMutation(REMOVE_FRIEND);
  //
  // const handleRemoveFriend = async (friendId) => {
  //   try {
  //     await removeFriend({
  //       variables: { username: profile.data.username, friendId: friendId },
  //     });
  //     alert("Friend removed!");
  //     refetch();
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

  //listForAutocomplete is an array of all the user objects
  const listForAutocomplete = userListData?.users || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <React.Fragment>
      <div className="searchbarContainer">
        <ul style={{ listStyleType: "none" }}>
          <TextField
            label="Search Usernames"
            onChange={(e) => setUserSearch(e.target.value)}
          />
          {listForAutocomplete
            .filter((user) =>
              user.username.toLowerCase().includes(userSearch.toLowerCase())
            )
            .map((user, index) => (
              <li className="user-in-user-list" key={user.username}>
                {user.username}
                {/* This is a conditional render to prevent button from loading if they are already a pending friend */}
                {user.pendingFriends
                  .map((user) => user._id)
                  .includes(currentUserId) ? (
                  <User stroke="Gray" size={25} />
                ) : user.friends
                    .map((friend) => friend._id)
                    .includes(currentUserId) ? (
                  <UserMinus
                    onClick={() => console.log("clicked remove friend button")}
                    stroke="Red"
                    size={25}
                  />
                ) : (
                  <UserPlus
                    onClick={() => handleAddFriend(user._id)}
                    stroke="Blue"
                    size={25}
                  />
                )}
              </li>
            ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default FriendsList;

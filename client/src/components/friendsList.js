import React, { useState } from "react";
import { UserPlus, UserMinus } from "feather-icons-react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USERS, QUERY_USER } from "../utils/queries";
import { REMOVE_FRIEND } from "../utils/mutations";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import auth from "../utils/auth";

const FriendsList = (props) => {
  const profile = auth.getProfile();
  const { loading, error, data, refetch } = useQuery(QUERY_USER, {
    variables: { username: profile.data.username },
  });

  const {
    loading: loadingAllUsers,
    error: errorAllUsers,
    data: userListData,
  } = useQuery(QUERY_USERS);
  const [userSearch, setUserSearch] = useState("");

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

  const listForAutocomplete = userListData?.users?.map((user) => user.username);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <React.Fragment>
      <div class="searchbarContainer">
        <Autocomplete
          className="searchInput"
          type="text"
          options={listForAutocomplete}
          sx={{ width: 300 }}
          placeholder="Find friends"
          onChange={(e) => setUserSearch(e.target.value)}
          renderInput={(params) => (
            <TextField {...params} label="Search Usernames" />
          )}
        />
      </div>
      {/* <div id="usersContainer">
        {data?.user?.friends?.map((friend) => (
          <div key={friend._id} className="userList">
            <span className="username">{friend.username}</span>
            <button
              className="friendButton"
              onClick={() => handleRemoveFriend(friend._id)}
            >
              <UserMinus stroke="red" size={16} />
            </button>
          </div>
        ))}
      </div> */}
    </React.Fragment>
  );
};

export default FriendsList;

import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { SEND_FRIEND_REQUEST } from "../utils/mutations";
import auth from "../utils/auth";

const UserSearch = () => {
  const [search, setSearch] = useState("");
  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { username: search },
    skip: !search,
  });
  // console.log(data);

  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST);

  let profile = auth.getProfile();
  // console.log(profile);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.elements.search.value);
  };

  const handleAddFriend = async (receiverId) => {
    console.log({ senderId: profile._id, receiverId });
    try {
      await sendFriendRequest({
        variables: { senderId: profile.data._id, receiverId },
      });
      alert("Friend request sent!");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input name="search" type="text" placeholder="Search derek's" />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error :(</p>}
      {data?.user && (
        <div>
          <h2>{data.user.username}</h2>
          <p>{data.user.email}</p>
          <button onClick={() => handleAddFriend(data.user._id)}>
            Add Friend
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSearch;

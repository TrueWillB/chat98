import React from "react";
import { UserPlus, UserMinus } from "feather-icons-react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { REMOVE_FRIEND } from "../utils/mutations";
import auth from "../utils/auth";

const FriendsList = () => {
  const profile = auth.getProfile();
  const { loading, error, data, refetch } = useQuery(QUERY_USER, {
    variables: { username: profile.data.username },
  });

  const [removeFriend] = useMutation(REMOVE_FRIEND);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <React.Fragment>
      <div class="searchbarContainer">
        <input
          className="searchInput"
          type="text"
          placeholder="Find friends"
          disabled
        />
      </div>
      <div id="usersContainer">
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
      </div>
    </React.Fragment>
  );
};

export default FriendsList;

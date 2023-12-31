import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import {
  APPROVE_FRIEND_REQUEST,
  REJECT_FRIEND_REQUEST,
} from "../utils/mutations";
import auth from "../utils/auth";

const FriendRequests = () => {
  const profile = auth.getProfile();
  const { loading, error, data, refetch } = useQuery(QUERY_USER, {
    variables: { username: profile.data.username },
  });

  const [approveFriendRequest] = useMutation(APPROVE_FRIEND_REQUEST);
  const [rejectFriendRequest] = useMutation(REJECT_FRIEND_REQUEST);

  const handleApproveFriend = async (senderId) => {
    try {
      await approveFriendRequest({
        variables: { senderId: senderId, receiverId: profile.data._id },
      });
      alert("Friend request approved!");
      refetch();
    } catch (err) {
      alert(err);
    }
  };

  const handleRejectFriend = async (senderId) => {
    try {
      await rejectFriendRequest({
        variables: { senderId: senderId, receiverId: profile.data._id },
      });
      alert("Friend request rejected!");
      refetch();
    } catch (err) {
      alert(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleBackButtonClick = () => {
    window.history.back();
  };

  return (
    <div>
      <button
        class="homeButtons"
        id="friendRequestButtons"
        onClick={handleBackButtonClick}
      >
        Back
      </button>
      <h2 id="friendsRequestPageHeader">Friend Requests</h2>
      {data?.user.pendingFriends.length > 0 ? (
        data.user.pendingFriends.map((friend) => (
          <div key={friend._id}>
            <p>{friend.username} sent you a friend request!</p>
            <button
              id="friendRequestPageButtons"
              onClick={() => handleApproveFriend(friend._id)}
            >
              Approve
            </button>
            <button
              id="friendRequestPageButtons"
              onClick={() => handleRejectFriend(friend._id)}
            >
              Reject
            </button>
          </div>
        ))
      ) : (
        <p id="friendRequestStatus">No pending friend requests</p>
      )}
    </div>
  );
};

export default FriendRequests;

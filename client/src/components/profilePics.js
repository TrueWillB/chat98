import React, { useEffect } from "react";
import avatars from "../assets/avatar.js";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER_BY_ID } from "../utils/queries";
import { SelectedFriendContext } from "../components/SelectedFriendContext";
import britney from "../assets/images/britney.png";

const FriendsList = () => {
  const [friendAvatar, setFriendAvatar] = React.useState(0);

  const { selectedFriendId } = React.useContext(SelectedFriendContext);

  const { data: friendData } = useQuery(QUERY_USER_BY_ID, {
    variables: { userID: selectedFriendId },
    skip: !selectedFriendId,
  });

  useEffect(() => {
    if (friendData) {
      setFriendAvatar(friendData.userByID.avatar);
    }
  }, [friendData]);

  const { data, loading, error } = useQuery(QUERY_ME);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(JSON.stringify(error));
    return <div>Something went wrong...</div>;
  }
  const user = data?.me || {};
  console.log(data);

  return (
    <div id="profilePicContainer">
      <div className="profilePics">
        <img
          className="userPhoto"
          src={friendAvatar ? avatars[friendAvatar] : britney}
          alt="Friend's Profile Pic"
        />
      </div>
      <div className="profilePics">
        <img
          className="userPhoto"
          src={avatars[user.avatar]}
          alt="Your Profile Pic"
        />
      </div>
    </div>
  );
};

export default FriendsList;

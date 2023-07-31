import React, { useState } from "react";

const FriendsList = ({ friendProfilePicUrl }) => {
  const [userProfilePicUrl, setUserProfilePicUrl] = useState(null);

  // temporary: allow user to upload an avatar

  const handleUserProfilePicChange = (event) => {
    const file = event.target.files[0];
    setUserProfilePicUrl(URL.createObjectURL(file));
  };

  return (
    <div id="profilePicContainer">
      <div className="profilePics">
        <img
          className="userPhoto"
          src={friendProfilePicUrl || "https://via.placeholder.com/150"}
          alt="Friend's Profile Pic"
        />
      </div>
      <div className="profilePics">
        <img
          className="userPhoto"
          src={userProfilePicUrl || "https://via.placeholder.com/150"}
          alt="Your Profile Pic"
        />
        <input type="file" onChange={handleUserProfilePicChange} />
      </div>
    </div>
  );
};

export default FriendsList;

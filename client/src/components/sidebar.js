import React, { useState } from "react";
import ProfilePics from "./profilePics";
import FriendsList from "./friendsList";
import { X, UserPlus } from "feather-icons-react";

const Sidebar = () => {
  const [showBackButton, setShowBackButton] = useState(false);
  const [showProfilePics, setShowProfilePics] = useState(true);

  const showProfilePicsHandler = () => {
    setShowBackButton(false);
    setShowProfilePics(true);
  };

  const showFriendsListHandler = () => {
    setShowBackButton(true);
    setShowProfilePics(false);
  };

  const handleBackButtonClick = () => {
    setShowBackButton(false);
    setShowProfilePics(true);
  };
  // will be replacing "userPlus" button with something nicer
  return (
    <div id="sidebarContainer">
      {showBackButton && (
        <div class="searchbarContainer">
          <button className="sidebarBackButton" onClick={handleBackButtonClick}>
            <X size={16} />
          </button>
        </div>
      )}
      {!showBackButton && (
        <button
          className="sidebarFriendButton"
          onClick={showFriendsListHandler}
        >
          <UserPlus stroke="gray" size={25} />
        </button>
      )}
      {showProfilePics ? <ProfilePics /> : <FriendsList />}
    </div>
  );
};

export default Sidebar;

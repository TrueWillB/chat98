import React, { useState } from "react";
import ProfilePics from "./profilePics";
import FriendsList from "./friendsList";

const Sidebar = () => {
  const [showBackButton, setShowBackButton] = useState(false);
  const [showProfilePics, setShowProfilePics] = useState(true);
  const [showAllUsers, setshowAllUsers] = useState(false); //I use "showAllUsers" to determing whether the search function will show all users in the DB or just the users you are friends with. passed as a prop to <FriendsList />
  const [showFriendsList, setShowFriendsList] = useState(false);

  const showAllUsersHandler = () => {
    setshowAllUsers(true);
    setShowProfilePics(false); //This might need to be changed
    setShowBackButton(true);
    // setShowFriendsList(false);
  };

  const showProfilePicsHandler = () => {
    setShowBackButton(false);
    setShowProfilePics(true);
    setshowAllUsers(false);
    // setShowFriendsList(false);
  };

  const showFriendsListHandler = () => {
    setShowBackButton(true);
    setShowProfilePics(false);
    setshowAllUsers(false);
    // setShowFriendsList(true);
  };

  const handleBackButtonClick = () => {
    setShowBackButton(false);
    setShowProfilePics(true);
    setshowAllUsers(false);
    // setShowFriendsList(false);
  };
  // will be replacing "userPlus" button with something nicer
  return (
    <div id="sidebarContainer">
      <div id="sidebarHeader" className="chatHeader">
        <button
          className="homeButtons"
          id="sidebarBackButton"
          onClick={handleBackButtonClick}
        >
          ×
        </button>{" "}
        <div id="friendsAndUsersButtons">
          <button
            class="homeButtons"
            itemID="sidebarFriendButton"
            onClick={showFriendsListHandler}
          >
            Start Chat
          </button>
        </div>{" "}
      </div>
      {showBackButton && <div className="searchbarContainer"></div>}
      {!showBackButton && <div></div>}

      {showProfilePics ? <ProfilePics /> : <FriendsList props={showAllUsers} />}
    </div>
  );
};

export default Sidebar;

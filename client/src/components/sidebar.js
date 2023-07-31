import React, { useState } from "react";
import ProfilePics from "./profilePics";
import FriendsList from "./friendsList";
import { X, UserPlus } from "feather-icons-react";
import Button from "@mui/material/Button";

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
      {showBackButton && (
        <div class="searchbarContainer">
          <button className="sidebarBackButton" onClick={handleBackButtonClick}>
            <X size={16} />
          </button>
        </div>
      )}
      {!showBackButton && (
        <div>
          <button
            className="sidebar-search-new-friends-button"
            variant="contained"
            onClick={showAllUsersHandler}
          >
            SEARCH
          </button>
          <button
            className="sidebarFriendButton"
            onClick={showFriendsListHandler}
          >
            <UserPlus stroke="gray" size={25} />
          </button>
        </div>
      )}

      {showProfilePics ? <ProfilePics /> : <FriendsList props={showAllUsers} />}
    </div>
  );
};

export default Sidebar;

import React, { useState } from "react";
import { UserPlus, UserMinus } from "feather-icons-react";

// example usernames
const FriendsList = () => {
  const initialUsernames = [
    "Lernantino",
    "Andrick",
    "Will",
    "Jordan",
    "Derek",
    "Madeline",
  ];

  const checkFriendshipStatus = () => {
    // insert check friendship status logic
    return false;
  };

  const [isFriend, setIsFriend] = useState(checkFriendshipStatus());
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsernames, setFilteredUsernames] = useState(initialUsernames);

  const handleFriendButtonClick = () => {
    setIsFriend(!isFriend);
  };

  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    filterUsernames(value);
  };

  const filterUsernames = (query) => {
    const filtered = initialUsernames.filter((username) =>
      username.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsernames(filtered);
  };

  // span elements labeled "replaceMe" exist for styling purposes. Replace/modify as needed for back end

  return (
    <React.Fragment>
      <div class="searchbarContainer">
        <input
          className="searchInput"
          type="text"
          placeholder="Find friends"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <div id="usersContainer">
        {filteredUsernames.map((username, index) => (
          <div key={index} className="userList">
            <span className="username" id="replaceMe">
              {username}
            </span>{" "}
            <button className="friendButton" onClick={handleFriendButtonClick}>
              {isFriend ? (
                <>
                  <UserMinus stroke="red" size={16} />
                </>
              ) : (
                <>
                  <UserPlus stroke="green" size={16} />
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default FriendsList;

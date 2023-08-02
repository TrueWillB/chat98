import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Login from "./modals/login";
import Logo from "./Chat98.png";
import Auth from "../utils/auth";
// temporary: friend request button is a placeholder for alerting user to new requests

const Toolbar = () => {
  return (
    <div id="toolbar">
      <div id="toolbarButtonsLeft">
        <img src={Logo} alt="Chat98 Logo" id="logo" />
        <Login class="homeButtons" />
        <Button class="homeButtons">Time Travel</Button>
      </div>
      {!Auth.loggedIn(true) ? (
        <div></div>
      ) : (
        <div id="toolbarButtonsRight">
          <Button
            class="homeButtons"
            id="homeButton"
            component={Link}
            to="/home"
          >
            Home
          </Button>
          <Button class="homeButtons" component={Link} to="/friend-requests">
            Requests
          </Button>
        </div>
      )}
    </div>
  );
};

export default Toolbar;

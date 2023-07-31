import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Login from "./modals/login";

// temporary: friend request button is a placeholder for alerting user to new requests

const Toolbar = () => {
  return (
    <div id="toolbar">
      <div id="toolbarButtons">
        {" "}
        <Stack spacing={2} direction="row">
          <Button variant="contained">Theme</Button>
          <Login />
          <Button variant="contained">Requests</Button>
        </Stack>
      </div>
    </div>
  );
};

export default Toolbar;

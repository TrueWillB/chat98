import React from "react";
import { Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { ADD_AVATAR } from "../utils/mutations";
import avatars from "../assets/avatar";

const AvatarGenerator = () => {
  const [addAvatar] = useMutation(ADD_AVATAR);

  const handleAvatarSelection = async (event) => {
    try {
      console.log(event.target);
      await addAvatar({ variables: { avatar: event.target.id } });
      window.location.replace("/home");
    } catch (error) {
      console.error("Error adding avatar", error);
    }
  };

  const styles = {
    avatarContainer: {
      display: "grid",
      justifyContent: "center",
      gridTemplateColumns: "repeat(4, 20%)",
      gap: "10px",
    },
    avatarImage: {
      width: "50%",
      height: "auto",
    },
  };

  return (
    <div>
      <p id="avatarPickerMessage">Select an avatar that represents you!</p>
      <div style={styles.avatarContainer}>
        {Object.entries(avatars).map(([name, image], index) => (
          <div key={index}>
            <img
              class="avatarImages"
              src={image}
              alt={name}
              style={styles.avatarImage}
            />
            <Button
              id={name}
              class="avatarButtons"
              onClick={handleAvatarSelection}
            >
              This Avatar is So Me!
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarGenerator;

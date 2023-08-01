import React from "react";
import { Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { ADD_AVATAR } from "../utils/mutations";
import Carl from "../assets/images/Carl.png";
import Cora from "../assets/images/Cora.png";
import Daniel from "../assets/images/Daniel.png";
import Glen from "../assets/images/Glen.png";
import Jen from "../assets/images/Jen.png";
import Jethro from "../assets/images/Jethro.png";
import Jim from "../assets/images/Jim.png";
import Kane from "../assets/images/Kane.png";
import Kevin from "../assets/images/Kevin.png";
import Kim from "../assets/images/Kim.png";
import Les from "../assets/images/Les.png";
import Loki from "../assets/images/Loki.png";
import Mary from "../assets/images/Mary.png";
import Nels from "../assets/images/Nels.png";
import Randel from "../assets/images/Randel.png";
import Rita from "../assets/images/Rita.png";
import Sam from "../assets/images/Sam.png";
import Stacey from "../assets/images/Stacey.png";
import Tory from "../assets/images/Tory.png";
import Trevor from "../assets/images/Trevor.png";

const AvatarGenerator = () => {
  const avatars = [
    { image: Carl },
    { image: Cora },
    { image: Daniel },
    { image: Glen },
    { image: Jen },
    { image: Jethro },
    { image: Jim },
    { image: Kane },
    { image: Kevin },
    { image: Kim },
    { image: Les },
    { image: Loki },
    { image: Mary },
    { image: Nels },
    { image: Randel },
    { image: Rita },
    { image: Sam },
    { image: Stacey },
    { image: Tory },
    { image: Trevor },
  ];

  const [addAvatar] = useMutation(ADD_AVATAR);

  const handleAvatarSelection = async (image) => {
    try {
      await addAvatar({ variables: { avatar: image } });
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
      <h1>Avatar Generator</h1>
      <p>Kindly select an avatar that represents you best!</p>
      <div style={styles.avatarContainer}>
        {avatars.map((avatar, index) => (
          <div key={index}>
            <img
              src={avatar.image}
              alt={avatar.image}
              style={styles.avatarImage}
            />
            <Button onClick={() => handleAvatarSelection(avatar.image)}>
              This Avatar is So Me!
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarGenerator;

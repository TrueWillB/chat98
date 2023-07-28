import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

export default function BasicCard() {
  return (
    <div id="chatScreen">
      <Card
        sx={{
          width: 1070,
          maxHeight: "400px",
          margin: "auto",
          overflowY: "auto",
        }}
      >
        <div id="sentChat">Sent</div>
        <div id="sentChat">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
          aliquam labore? Sapiente sunt vero earum laudantium. Quam itaque earum
          vel officia minus delectus vitae. Consequatur, ut veniam unde, non
          itaque quaerat sapiente vitae nisi ratione minus veritatis quibusdam
          tempore, quis natus quod corporis deserunt sunt esse vero in officiis
          debitis? Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Ipsam, aliquam labore? Sapiente sunt vero earum laudantium. Quam
          itaque earum vel officia minus delectus vitae. Consequatur, ut veniam
          unde, non itaque quaerat sapiente vitae nisi ratione minus veritatis
          quibusdam tempore, quis natus quod corporis deserunt sunt esse vero in
          officiis debitis?
        </div>
        <div id="receivedChat">Received</div>
        <div id="receivedChat">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
          aliquam labore? Sapiente sunt vero earum laudantium. Quam itaque earum
          vel officia minus delectus vitae. Consequatur, ut veniam unde, non
          itaque quaerat sapiente vitae nisi ratione minus veritatis quibusdam
          tempore, quis natus quod corporis deserunt sunt esse vero in officiis
          debitis? Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Ipsam, aliquam labore? Sapiente sunt vero earum laudantium. Quam
          itaque earum vel officia minus delectus vitae. Consequatur, ut veniam
          unde, non itaque quaerat sapiente vitae nisi ratione minus veritatis
          quibusdam tempore, quis natus quod corporis deserunt sunt esse vero in
          officiis debitis?
        </div>
      </Card>
      <div id="textareaContainer">
        <textarea id="chatTextarea">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua."
        </textarea>
        <div id="textareaButtons">
          <CardActions style={{ flexDirection: "column", margin: "8" }}>
            <Button variant="contained">Send</Button>
          </CardActions>
        </div>
      </div>
    </div>
  );
}

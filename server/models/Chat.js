const { Schema, model } = require("mongoose");

const chatSchema = new Schema({
  user1Id: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  user2Id: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "message",
    },
  ],
});

const Chat = model("chat", chatSchema);

module.exports = Chat;

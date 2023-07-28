const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  content: {
    type: String,
    required: true,
  },
  readStatus: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = model("message", messageSchema);

module.exports = Message;

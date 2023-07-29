const { AuthenticationError } = require("apollo-server-express");
const { User, Chat, Message } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate("friends").populate("pendingFriends");
    },
    user: async (parent, { username }, context) => {
      return await User.findOne({ username })
        .populate("friends")
        .populate("pendingFriends");
    },
    //come back and refactor with context
    userChats: async (parent, { userId }, context) => {
      try {
        const chats = await Chat.find({
          $or: [{ user1Id: userId }, { user2Id: userId }],
        }).populate("messages");
        return chats;
      } catch (err) {
        throw err;
      }
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    removeFriend: async (parent, { username, friendId }, context) => {
      try {
        const updatedUser = await User.findOneAndDelete(
          { username },
          { $pull: { friends: { _id: friendId } } },
          { new: true }
        );
        if (!updatedUser) {
          throw new Error("Friend not found!");
        }
        return updatedUser;
      } catch (err) {
        throw err;
      }
    },
    sendFriendRequest: async (parent, { senderId, receiverId }) => {
      try {
        // const temp = await User.findOne({ _id: receiverId });
        // console.log(temp);
        const receivingUser = await User.findOneAndUpdate(
          { _id: receiverId },
          { $addToSet: { pendingFriends: senderId } },
          { new: true }
        );
        if (!receivingUser) {
          throw new Error("Invalid friend request");
        }
        return receivingUser;
      } catch (err) {
        throw err;
      }
    },
    approveFriendRequest: async (parent, { senderId, receiverId }) => {
      try {
        // console.log(senderId);
        // console.log(receiverId);
        const receivingUser = await User.findOneAndUpdate(
          { _id: receiverId },
          {
            $addToSet: { friends: senderId },
            $pull: { pendingFriends: senderId },
          },
          { new: true }
        );
        // console.log(receivingUser);
        if (!receivingUser) {
          throw new Error("Invalid friend request");
        }
        const sendingUser = await User.findOneAndUpdate(
          { _id: senderId },
          { $addToSet: { friends: receiverId } },
          { new: true }
        );
        // console.log(sendingUser);
        if (!sendingUser) {
          throw new Error("Invalid friend request");
        }
        return receivingUser;
      } catch (err) {
        throw err;
      }
    },
    rejectFriendRequest: async (parent, { senderId, receiverId }) => {
      try {
        const receivingUser = await User.findOneAndUpdate(
          { _id: receiverId },
          { $pull: { pendingFriends: senderId } },
          { new: true }
        );
        if (!receivingUser) {
          throw new Error("Invalid friend request");
        }
        return receivingUser;
      } catch (err) {
        throw err;
      }
    },
    startChat: async (parent, { user1Id, user2Id }) => {
      try {
        // console.log(user1Id);
        // console.log(user2Id);
        let existingChat = await Chat.findOne({
          $or: [
            { user1Id, user2Id },
            { user1Id: user2Id, user2Id: user1Id },
          ],
        });
        if (!existingChat) {
          const newChat = await Chat.create({ user1Id, user2Id, messages: [] });
          return newChat;
        }
        return existingChat;
      } catch (err) {
        throw err;
      }
    },
    sendMessage: async (parent, { chatId, senderId, content }) => {
      const newMessage = await Message.create({
        senderId,
        content,
        readStatus: false,
      });
      await Chat.findByIdAndUpdate(chatId, {
        $push: { messages: newMessage._id },
      });
      await newMessage.populate("senderId", "username");
      return newMessage;
    },
  },
};

module.exports = resolvers;

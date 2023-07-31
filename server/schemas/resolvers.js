const { AuthenticationError } = require("apollo-server-express");
const { User, Chat, Message } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate("friends").populate("pendingFriends");
    },
    userByID: async (parent, { userID }, context) => {
      return await User.findById(userID)
        .populate("friends")
        .populate("pendingFriends");
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
        //Get user ID of user who is removing friend. Doing it this way to preserve any front end work that has already happened
        const removerUser = await User.findOne({ username });
        const removerUserId = removerUser._id;
        console.log(removerUser.friends);
        console.log(username);
        console.log(removerUserId);
        console.log(friendId);
        const remover = await User.findOneAndUpdate(
          { username },
          { $pull: { friends: { $in: [friendId] } } },
          { new: true }
        );
        console.log(remover);
        if (!remover) {
          throw new Error("User attempting to remove friend was not found");
        }
        const removee = await User.findOneAndUpdate(
          { _id: friendId },
          { $pull: { friends: { $in: [removerUserId] } } },
          { new: true }
        );
        if (!removee) {
          throw new Error("Friend to be removed was not found");
        }
        return remover;
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
        const user1 = await User.findById(user1Id);
        const user2 = await User.findById(user2Id);

        if (!user1 || !user2) {
          throw new Error("One or both users not found");
        }

        let existingChat = await Chat.findOne({
          $or: [
            { user1Id, user2Id },
            { user1Id: user2Id, user2Id: user1Id },
          ],
        })
          .populate("user1Id user2Id")
          .populate("messages");
        if (!existingChat) {
          const newChat = await Chat.create({ user1Id, user2Id, messages: [] });
          return await newChat.populate("user1Id user2Id");
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

      const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        { $push: { messages: newMessage._id } },
        { new: true }
      ).populate({
        path: "messages",
        model: "message",
        populate: {
          path: "senderId",
          model: "user",
        },
      });
      if (!updatedChat) {
        throw new Error("Chat not found");
      }
      return newMessage;
    },
  },
};

module.exports = resolvers;

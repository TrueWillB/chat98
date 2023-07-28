const { AuthenticationError } = require("apollo-server-express");
const { User, Chat, Message } = require("../models");
// const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate("friends");
    },
    user: async (parent, { username }, context) => {
      return await User.findOne({ username }).populate("friends");
    },
    userChats: async (parent, { username }, context) => {
      return await Chat.find({
        $or: [{ user1Id: User }, { user2Id: User }],
      }).populate({
        path: "messages",
        populate: { path: "sender" },
      });
    },
    chat: async (parent, { chatId }, context) => {
      return await Chat.findById(chatId).populate({
        path: "messages",
        populate: { path: "sender" },
      });
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
    addFriend: async (parent, { username, friendUsername }, context) => {
      const user = await User.findOne({ username });
      const newFriend = await User.findOne({ username: friendUsername });

      if (!user || !newFriend) {
        throw new Error("Friend not found!");
      }
      await User.updateOne(
        { username },
        { $addToSet: { friends: newFriend._id } }
      );
      const updatedUser = await User.findOne({ username }).populate("friends");
      return updatedUser;
    },
  },
};

module.exports = resolvers;
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    avatar: String!
    senderId: ID!
    receiverId: ID!
    pendingFriends: [User]
    friends: [User]
  }

  type Message {
    _id: ID
    senderId: User
    receiverId: User
    content: String!
    readStatus: Boolean
  }

  type Chat {
    _id: ID
    user1Id: User
    user2Id: User
    messages: [Message]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    userByID(userID: ID!): User
    userChats(userID: ID!): [Chat]
    me: [User]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addAvatar(avatar: String!): User
    login(email: String!, password: String!): Auth
    removeFriend(username: String!, friendId: ID!): User
    sendFriendRequest(senderId: ID!, receiverId: ID!): User
    approveFriendRequest(senderId: ID!, receiverId: ID!): User
    rejectFriendRequest(senderId: ID!, receiverId: ID!): User
    startChat(user1Id: ID!, user2Id: ID!): Chat
    sendMessage(chatId: ID!, senderId: ID!, content: String!): Message
  }
`;

module.exports = typeDefs;

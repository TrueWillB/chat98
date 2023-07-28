const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
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
    message: [Message]
    userChats(username: String!): [Chat]
    chat(chatId: ID!): Chat
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addFriend(username: String!, friendUsername: String!): User
  }
`;

module.exports = typeDefs;

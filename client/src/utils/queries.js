import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      friends {
        _id
        username
        email
      }
      pendingFriends {
        _id
        username
        email
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friends {
        _id
        username
        email
      }
      pendingFriends {
        _id
        username
        email
      }
    }
  }
`;

//untested, may need to be fixed
export const QUERY_MESSAGE = gql`
  query message($messageId: ID!) {
    message(messageId: $messageId) {
      _id
      senderId
      receiverId
      content
      readStatus
    }
  }
`;

//untested, may need to be fixed
export const QUERY_USER_CHATS = gql`
  query userChats($username: String!) {
    userChats(username: $username) {
      _id
      user1Id {
        _id
        username
      }
      user2Id {
        _id
        username
      }
      messages {
        _id
        senderId
        receiverId
        content
        readStatus
      }
    }
  }
`;

//untested, may need to be fixed
export const QUERY_CHAT = gql`
  query chat($chatId: ID!) {
    chat(chatId: $chatId) {
      _id
      user1Id {
        _id
        username
      }
      user2Id {
        _id
        username
      }
      messages {
        _id
        senderId
        receiverId
        content
        readStatus
      }
    }
  }
`;

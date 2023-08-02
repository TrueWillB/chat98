import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      avatar
      friends {
        _id
        username
        email
        avatar
      }
      pendingFriends {
        _id
        username
        email
        avatar
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
      avatar
      friends {
        _id
        username
        email
        avatar
      }
      pendingFriends {
        _id
        username
        email
        avatar
      }
    }
  }
`;

export const QUERY_USER_BY_ID = gql`
  query userByID($userID: ID!) {
    userByID(userID: $userID) {
      _id
      username
      email
      avatar
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

export const QUERY_USER_CHATS = gql`
  query userChats($userId: ID!, $friendId: ID!) {
    userChats(userId: $userId, friendId: $friendId) {
      _id
      user1Id {
        _id
      }
      user2Id {
        _id
      }
      messages {
        senderId {
          _id
        }
        content
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      avatar
      friends {
        _id
        username
        email
        avatar
      }
      pendingFriends {
        _id
        username
        email
        avatar
      }
    }
  }
`;

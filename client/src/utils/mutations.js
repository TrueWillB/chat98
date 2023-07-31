import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($username: String!, $friendId: ID!) {
    removeFriend(username: $username, friendId: $friendId) {
      _id
      username
      friends {
        _id
      }
    }
  }
`;

export const SEND_FRIEND_REQUEST = gql`
  mutation SendFriendRequest($senderId: ID!, $receiverId: ID!) {
    sendFriendRequest(senderId: $senderId, receiverId: $receiverId) {
      _id
      username
      pendingFriends {
        _id
      }
    }
  }
`;

export const APPROVE_FRIEND_REQUEST = gql`
  mutation approveFriendRequest($senderId: ID!, $receiverId: ID!) {
    approveFriendRequest(senderId: $senderId, receiverId: $receiverId) {
      _id
      username
      friends {
        _id
      }
    }
  }
`;

export const REJECT_FRIEND_REQUEST = gql`
  mutation rejectFriendRequest($senderId: ID!, $receiverId: ID!) {
    rejectFriendRequest(senderId: $senderId, receiverId: $receiverId) {
      _id
      username
      pendingFriends {
        _id
      }
    }
  }
`;

// export const START_CHAT = gql`
//     mutation startChat($user1Id: ID!, user2Id: ID!) {
//         startChat(user1Id: $user1Id, user2Id: $user2Id) {
//             _id
//             user1Id
//             user2Id
//             messages {
//                 _id
//                 senderId {
//                     _id
//                     username
//                 }
//                 content
//                 readStatus
//             }
//         }
//     }
// `;

// export const SEND_MESSAGE = gql`
//   mutation sendMessage($chatId: ID!, $senderId: ID!, $content: String!) {
//     sendMessage(chatId: $chatId, senderId: $senderId, content: $content) {
//       _id
//       senderId {
//         _id
//         username
//       }
//       content
//       readStatus
//     }
//   }
// `;

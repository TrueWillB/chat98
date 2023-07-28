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

// //This might need to be changed. I think the logical thing would be to receive back information about the request sender and information about the request receiver.
// export const ADD_FRIEND = gql`
// mutation addFriend(username:String!, friendUsername:String!){
//     addFriend(username:$username, friendUsername:$friendUsername){
//         _id
//         username
//         friends{
//             _id
//             username
//         }
//     }
// }
// `;

//same here, this might need to be changed
export const REMOVE_FRIEND = gql`
removeFriend(username:String!, friendId:ID!){
    removeFriend(username:$username, friendId:$friendId){
        _id
        username
        friends{
            _id
            username
        }
    }
}
`;

export const SEND_FRIEND_REQUEST = gql`
sendFriendRequest(senderId:ID!, receiverId:ID!){
    sendFriendRequest(senderId:$senderId, receiverId:$receiverId){
        _id
        username
        pendingFriends{
            _id
            username
        }
    }
}
`;

export const APPROVE_FRIEND_REQUEST = gql`
approveFriendRequest(senderId:ID!, receiverId:ID!){
    approveFriendRequest(senderId:$senderId, receiverId:$receiverId){
        _id
        username
        friends{
            _id
            username
        }
    }
}
`;

export const REJECT_FRIEND_REQUEST = gql`
rejectFriendRequest(senderId:ID!, receiverId:ID!){
    rejectFriendRequest(senderId:$senderId, receiverId:$receiverId){
        _id
        username
        pendingFriends{
            _id
            username
        }
    }
}
    
    `;

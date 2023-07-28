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

//This might need to be changed. I think the logical thing would be to receive back information about the request sender and information about the request receiver.
export const ADD_FRIEND = gql`
mutation addFriend(username:String!, friendUsername:String!){
    addFriend(username:$username, friendUsername:$friendUsername){
        _id
        username
        friends{
            _id
            username
        }
    }
}
`;

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

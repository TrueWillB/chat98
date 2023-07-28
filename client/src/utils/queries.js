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
    }
  }
`;

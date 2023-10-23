import { gql } from '@apollo/client';

export default gql`
  mutation Register(
    $email: String!
    $password: String!
    $displayName: String!
    $username: String!
  ) {
    user(
      input: {
        email: $email
        password: $password
        displayName: $displayName
        username: $username
      }
    ) @rest(type: "User", path: "account/register", method: "POST") {
      displayName
      token
      userName
      error
    }
  }
`;

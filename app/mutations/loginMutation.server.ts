import { gql } from '@apollo/client';

export default gql`
  mutation Login($email: String!, $password: String!) {
    user(input: { email: $email, password: $password })
      @rest(type: "[User]", path: "account/login", method: "POST") {
      displayName
      token
      username
      error
    }
  }
`;

import { gql } from '@apollo/client';

export default gql`
  mutation CreateTask(
    $title: String!
    $deadline: String!
    $category_lkp_id: String!
    $created_at: String!
  ) {
    task(
      input: {
        title: $title
        deadline: $deadline
        category_lkp_id: $category_lkp_id
        created_at: $created_at
      }
    ) @rest(type: "Task", path: "activities", method: "POST") {
      error
    }
  }
`;

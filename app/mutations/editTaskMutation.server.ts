import { gql } from '@apollo/client';

export default gql`
  mutation EditTask(
    $title: String!
    $deadline: String!
    $category_lkp_id: String!
    $created_at: String!
    $updated_at: String!
    $id: String!
    $status_lkp_id: String!
  ) {
    task(
      id: $id
      input: {
        title: $title
        deadline: $deadline
        category_lkp_id: $category_lkp_id
        created_at: $created_at
        updated_at: $updated_at
        status_lkp_id: $status_lkp_id
      }
    ) @rest(type: "Task", path: "activities/{args.id}", method: "PUT") {
      NoResponse
    }
  }
`;

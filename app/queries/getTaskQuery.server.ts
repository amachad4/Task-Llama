import { gql } from '@apollo/client';

export default gql`
  query getTaskQuery($id: String!) {
    task(id: $id)
      @rest(type: "Task", path: "activities/{args.id}", method: "GET") {
      data {
        id
        title
        deadline
        status_lkp_id
        category_lkp_id
        created_at
      }
    }
  }
`;

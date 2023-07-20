import { gql } from '@apollo/client';

export default gql`
  query getTasksQuery {
    tasks @rest(type: "[Task]", path: "activities", method: "GET") {
      data {
        id
        title
        deadline
        status_lkp_id
      }
    }
  }
`;

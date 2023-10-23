import { gql } from '@apollo/client';

export default gql`
  mutation DeleteTask($id: String!) {
    deleteTask(id: $id)
      @rest(type: "Task", path: "activities/{args.id}", method: "DELETE") {
      NoResponse
    }
  }
`;

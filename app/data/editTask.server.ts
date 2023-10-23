import { initApollo } from '~/context/apollo';
import editTaskMutation from '~/mutations/editTaskMutation.server';

export default async function editTask(token: string, body: any) {
  const client = initApollo(token);
  const mutate = client.mutate({
    mutation: editTaskMutation,
    variables: body
  });
  return (await mutate).data;
}

import { initApollo } from '~/context/apollo';
import deleteTaskMutation from '~/mutations/deleteTaskMutation.server';

export default async function deleteTask(token: string, body: any) {
  const client = initApollo(token);
  const mutate = client.mutate({
    mutation: deleteTaskMutation,
    variables: body
  });
  return (await mutate).data;
}

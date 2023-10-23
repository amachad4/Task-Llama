import { initApollo } from '~/context/apollo';
import createTaskMutation from '~/mutations/createTaskMutation.server';

export default async function createTask(token: string, body: any) {
  const client = initApollo(token);
  const mutate = client.mutate({
    mutation: createTaskMutation,
    variables: body
  });
  return (await mutate).data;
}

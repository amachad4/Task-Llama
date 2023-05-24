import { initApollo } from '~/context/apollo';
import loginMutation from '~/mutations/loginMutation.server';

export default async function login(body: any) {
  const client = initApollo();
  const mutate = client.mutate({
    mutation: loginMutation,
    variables: body,
  });
  return (await mutate).data;
}

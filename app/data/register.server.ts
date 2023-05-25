import { initApollo } from '~/context/apollo';
import registerMutation from '~/mutations/registerMutation.server';

export default async function register(body: any) {
  const client = initApollo();
  const mutate = client.mutate({
    mutation: registerMutation,
    variables: body
  });
  return (await mutate).data;
}

import { initApollo } from '~/context/apollo';
import getTaskQuery from '~/queries/getTaskQuery.server';
import type { Task } from '~/types/types';

export default async function getTask(token: string, body: any) {
  const client = initApollo(token);
  const query = client.query<{ task: { data: Task } }>({
    query: getTaskQuery,
    variables: body
  });
  return (await query).data;
}

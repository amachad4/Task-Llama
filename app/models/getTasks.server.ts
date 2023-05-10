import { initApollo } from '~/context/apollo';
import getTasksQuery from '~/queries/getTasksQuery.server';
import type { AtLeast, Task } from '~/types/types';

type getTasksQueryResponse = {
  tasks: { data: AtLeast<Task, 'id' | 'title' | 'deadline'> };
};

export default async function getTasks() {
  const client = initApollo();
  const query = client.query<getTasksQueryResponse>({
    query: getTasksQuery
  });
  return (await query).data;
}

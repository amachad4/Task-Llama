import { DndContext } from '@dnd-kit/core';
import type { UniqueIdentifier, DragEndEvent } from '@dnd-kit/core';
import { Outlet, useFetcher, useLoaderData } from '@remix-run/react';
import type { FetcherWithComponents } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import LeftNav from '~/route_components/LeftNav';
import getTasks from '~/data/getTasks.server';
import type { LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { getSession } from '~/auth/session.server';
import { Route } from '~/types/constants';
import { Droppable } from '~/route_components/Droppable';
import type { Task } from '~/types/types';
import TaskCard from '~/route_components/TaskCard';
import LoadingComponenet from '~/route_components/LoadingComponent';

export async function loader({ request }: LoaderArgs) {
  const token = await getSession(request);
  if (!token) throw redirect(`${Route.Login.toLowerCase()}`);
  const queryTasks = await getTasks(token);
  const {
    tasks: { data: todoList }
  } = queryTasks;
  return { todoList };
}

function updateStatusId(
  statusId: string,
  taskId: UniqueIdentifier,
  taskStatusLkpId: any,
  fetcher: FetcherWithComponents<any>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
): void {
  console.log(taskStatusLkpId);
  fetcher.submit(
    { status_lkp_id: statusId },
    {
      method: 'post',
      action: `${Route.EditTask.toLowerCase()}/${taskId}`
    }
  );
  if (taskStatusLkpId.toString() !== statusId) setLoading(true);
}

// TODO: create an enum for status ids
export default function TaskLlamaAppLayout() {
  const data = useLoaderData();

  const fetcher = useFetcher();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 1500);
  }, [setLoading]);

  if (loading) {
    return <LoadingComponenet />;
  }

  // TODO: Make loader transparent, speed up loader a few mili secs

  function handleDragEnd(event: DragEndEvent) {
    if (event.over) {
      console.log(event);
      switch (event.over.id) {
        case 'unstarted':
          updateStatusId(
            '1',
            event.active.id,
            event.active.data.current?.statusLkpId,
            fetcher,
            setLoading
          );
          break;
        case 'progress':
          updateStatusId(
            '2',
            event.active.id,
            event.active.data.current?.statusLkpId,
            fetcher,
            setLoading
          );
          break;
        case 'completed':
          updateStatusId(
            '3',
            event.active.id,
            event.active.data.current?.statusLkpId,
            fetcher,
            setLoading
          );
          break;
        default:
          break;
      }
    }
  }

  // TODO: Abstract this component into usable route components

  return (
    <>
      <Grid celled className='min-h-full m-0'>
        <Grid.Row>
          <Grid.Column width={3} className='bg-task-llama-light-gray'>
            <LeftNav />
          </Grid.Column>
          <Grid.Column width={13} className='shadow-none'>
            <Grid columns={3} divided className='min-h-full'>
              <Grid.Row>
                <DndContext onDragEnd={handleDragEnd}>
                  <Grid.Column>
                    <Header as='h3'>Unstarted</Header>
                    <Droppable id='unstarted'>
                      {data.todoList
                        .filter((task: Task) => task.status_lkp_id === 1)
                        .map((task: Task) => (
                          <TaskCard
                            task={task}
                            key={task.id + task.status_lkp_id}
                          />
                        ))}
                    </Droppable>
                  </Grid.Column>
                  <Grid.Column>
                    <Header as='h3'>In Progress</Header>
                    <Droppable id='progress'>
                      {data.todoList
                        .filter((task: Task) => task.status_lkp_id === 2)
                        .map((task: Task) => (
                          <TaskCard
                            task={task}
                            key={task.id + task.status_lkp_id}
                          />
                        ))}
                    </Droppable>
                  </Grid.Column>
                  <Grid.Column>
                    <Header as='h3'>Completed</Header>
                    <Droppable id='completed'>
                      {data.todoList
                        .filter((task: Task) => task.status_lkp_id === 3)
                        .map((task: Task) => (
                          <TaskCard
                            task={task}
                            key={task.id + task.status_lkp_id}
                          />
                        ))}
                    </Droppable>
                  </Grid.Column>
                </DndContext>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Outlet />
    </>
  );
}

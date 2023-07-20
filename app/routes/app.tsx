import { DndContext } from '@dnd-kit/core';
import { Outlet, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import LeftNav from '~/route_components/LeftNav';
import NavBar from '~/route_components/NavBar';
import getTasks from '~/data/getTasks.server';
import type { LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { getSession } from '~/auth/session.server';
import { Route } from '~/types/constants';
import { Droppable } from '~/route_components/Droppable';
import type { Task } from '~/types/types';
import TaskCard from '~/route_components/TaskCard';

export async function loader({ request }: LoaderArgs) {
  const token = await getSession(request);
  if (!token) throw redirect(`${Route.Login.toLowerCase()}`);
  const queryTasks = await getTasks(token);
  const {
    tasks: { data: todoList }
  } = queryTasks;
  return { todoList };
}

// TODO: create an enum for status ids
export default function TaskLlamaAppLayout() {
  const data = useLoaderData();

  const [unstartedTasks, setUnstartedTasks] = useState<Task[]>(
    data.todoList.filter((task: Task) => task.status_lkp_id === 1)
  );

  const [startedTasks, setStartedTasks] = useState<Task[]>(
    data.todoList.filter((task: Task) => task.status_lkp_id === 2)
  );

  const [finishedTasks, setFinishedTasks] = useState<Task[]>(
    data.todoList.filter((task: Task) => task.status_lkp_id === 3)
  );

  const findDuplicate = (id: string, taskList: Task[]) => {
    return taskList.map((task: Task) => task.id).indexOf(id) > -1;
  };

  function handleDragEnd(event: any) {
    if (event.over) {
      switch (event.over.id) {
        case 'unstarted':
          if (findDuplicate(event.active.id, unstartedTasks)) {
            break;
          }
          if (findDuplicate(event.active.id, startedTasks)) {
            setStartedTasks(
              startedTasks.filter((task: Task) => task.id !== event.active.id)
            );
          }
          if (findDuplicate(event.active.id, finishedTasks)) {
            setFinishedTasks(
              finishedTasks.filter((task: Task) => task.id !== event.active.id)
            );
          }
          setUnstartedTasks((prev) => [
            ...prev,
            data.todoList.find((item: Task) => item.id === event.active.id)
          ]);
          break;
        case 'progress':
          if (findDuplicate(event.active.id, startedTasks)) {
            break;
          }
          if (findDuplicate(event.active.id, unstartedTasks)) {
            setUnstartedTasks(
              unstartedTasks.filter((task: Task) => task.id !== event.active.id)
            );
          }
          if (findDuplicate(event.active.id, finishedTasks)) {
            setFinishedTasks(
              finishedTasks.filter((task: Task) => task.id !== event.active.id)
            );
          }
          setStartedTasks((prev) => [
            ...prev,
            data.todoList.find((item: Task) => item.id === event.active.id)
          ]);
          break;
        case 'completed':
          if (findDuplicate(event.active.id, finishedTasks)) {
            break;
          }
          if (findDuplicate(event.active.id, unstartedTasks)) {
            setUnstartedTasks(
              unstartedTasks.filter((task: Task) => task.id !== event.active.id)
            );
          }
          if (findDuplicate(event.active.id, startedTasks)) {
            setStartedTasks(
              startedTasks.filter((task: Task) => task.id !== event.active.id)
            );
          }
          setFinishedTasks((prev) => [
            ...prev,
            data.todoList.find((item: Task) => item.id === event.active.id)
          ]);
          break;
        default:
          break;
      }
    }
  }

  // TODO: Abstract this component into usable route components
  // TODO: Fix drag and drop reorder issue, figure out lane drag and drop
  return (
    <>
      <NavBar />
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
                      {unstartedTasks.map((task: Task) => (
                        <TaskCard task={task} key={task.id} />
                      ))}
                    </Droppable>
                  </Grid.Column>
                  <Grid.Column>
                    <Header as='h3'>In Progress</Header>
                    <Droppable id='progress'>
                      {startedTasks.map((task: Task) => (
                        <TaskCard task={task} key={task.id} />
                      ))}
                    </Droppable>
                  </Grid.Column>
                  <Grid.Column>
                    <Header as='h3'>Completed</Header>
                    <Droppable id='completed'>
                      {finishedTasks.map((task: Task) => (
                        <TaskCard task={task} key={task.id} />
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

import type { DragEndEvent } from '@dnd-kit/core';
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { Outlet, useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import LeftNav from '~/route_components/LeftNav';
import NavBar from '~/route_components/NavBar';
import TaskCard from '~/route_components/TaskCard';
import type { AtLeast, Task } from '~/types/types';
import getTasks from '~/data/getTasks.server';
import type { LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { getSession } from '~/auth/session.server';
import { Route } from '~/types/constants';

interface loaderData {
  todoList: AtLeast<Task, 'id' | 'title' | 'deadline'>[];
}

export async function loader({ request }: LoaderArgs) {
  const token = await getSession(request);
  if (!token) throw redirect(`${Route.Login.toLowerCase()}`);
  const queryTasks = await getTasks(token);
  const {
    tasks: { data: todoList }
  } = queryTasks;
  return { todoList };
}

export default function TaskLlamaAppLayout() {
  const loaderData = useLoaderData<loaderData>();
  const { todoList } = loaderData;
  const [items, setItems] = useState<loaderData['todoList']>(todoList);
  const sensor = useSensor(PointerSensor);

  useEffect(() => {
    setItems(todoList);
  }, [todoList]);

  const handleDrag = ({ active, over }: DragEndEvent) => {
    if (over) {
      if (active.id !== over.id) {
        setItems((array) => {
          const oldIndex = array.findIndex((item) => item.id === active.id);
          const newIndex = array.findIndex((item) => item.id === over.id);
          return arrayMove(array, oldIndex, newIndex);
        });
      }
    }
  };

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
            <DndContext
              sensors={[sensor]}
              collisionDetection={closestCenter}
              onDragEnd={handleDrag}
            >
              <Grid columns={3} divided className='min-h-full'>
                <Grid.Row>
                  <Grid.Column>
                    <Header as='h3'>Unstarted</Header>

                    <SortableContext
                      items={todoList.map((todo) => todo.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {items.map((item) => {
                        return <TaskCard key={item.id} task={item} />;
                      })}
                    </SortableContext>
                  </Grid.Column>
                  <Grid.Column>
                    <Header as='h3'>In Progress</Header>
                  </Grid.Column>
                  <Grid.Column>
                    <Header as='h3'>Completed</Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </DndContext>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Outlet />
    </>
  );
}

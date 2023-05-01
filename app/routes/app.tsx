import { Outlet, useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import LeftNav from '~/route_components/LeftNav';
import NavBar from '~/route_components/NavBar';
import TaskCard from '~/route_components/TaskCard';
import { Activity } from '~/types/types';
import {
  DndContext,
  useSensor,
  PointerSensor,
  closestCenter,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable';

interface loaderData {
  todoList: Activity[];
}

export async function loader(): Promise<loaderData> {
  const todoListQuery = await fetch('http://localhost:5000/api/activities', {
    method: 'GET'
  });
  if (!todoListQuery.ok) throw new Error('Could not fetch your todo list');
  const todoListArray = await todoListQuery.json();

  return { todoList: todoListArray };
}

export default function TaskLlamaAppLayout() {
  const loaderData = useLoaderData<loaderData>();
  const { todoList } = loaderData;
  const [items, setItems] = useState<Array<Activity>>(todoList);
  const sensor = useSensor(PointerSensor);

  useEffect(() => {
    setItems(todoList);
  }, [todoList.length]);

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
                        return <TaskCard key={item.id} activity={item} />;
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

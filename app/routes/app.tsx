import { DndContext } from '@dnd-kit/core';
import { Outlet } from '@remix-run/react';
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
import { Draggable } from '~/route_components/Draggable';

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
  const [isDropped, setIsDropped] = useState({
    unstarted: true,
    progress: false,
    done: false
  });
  const draggableMarkup = <Draggable>Drag me</Draggable>;

  function handleDragEnd(event: any) {
    if (event.over) {
      switch (event.over.id) {
        case 'unstarted':
          console.log('ran');
          setIsDropped({
            unstarted: true,
            progress: false,
            done: false
          });
          break;
        case 'progress':
          setIsDropped({
            unstarted: false,
            progress: true,
            done: false
          });
          break;
        case 'completed':
          setIsDropped({
            unstarted: false,
            progress: false,
            done: true
          });
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
                      {isDropped.unstarted ? draggableMarkup : 'Drop here'}
                    </Droppable>
                  </Grid.Column>
                  <Grid.Column>
                    <Header as='h3'>In Progress</Header>
                    <Droppable id='progress'>
                      {isDropped.progress ? draggableMarkup : 'Drop here'}
                    </Droppable>
                  </Grid.Column>
                  <Grid.Column>
                    <Header as='h3'>Completed</Header>
                    <Droppable id='completed'>
                      {isDropped.done ? draggableMarkup : 'Drop here'}
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

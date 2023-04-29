import { Outlet } from '@remix-run/react';
import { Grid } from 'semantic-ui-react';
import LeftNav from '~/route_components/LeftNav';
import NavBar from '~/route_components/NavBar';

export default function TaskLlamaAppLayout() {
  return (
    <>
      <NavBar />
      <Grid celled className='min-h-full m-0'>
        <Grid.Row>
          <Grid.Column width={3} className='bg-task-llama-light-gray'>
            <LeftNav />
          </Grid.Column>
          <Grid.Column width={13} className='shadow-none'>
            <Outlet />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

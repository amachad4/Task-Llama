import { Outlet } from '@remix-run/react';
import { Container } from 'semantic-ui-react';

export default function auth() {
  return (
    <Container className='bg-task-llama-teal min-w-full min-h-screen'>
      <Outlet />
    </Container>
  );
}

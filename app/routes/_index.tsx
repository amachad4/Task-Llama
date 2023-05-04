import type { V2_MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { Button, Container, Header, Segment } from 'semantic-ui-react';
import { Route } from '~/types/constants';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Welcome to Task Llama!' }];
};

export default function Index() {
  return (
    <Container className='bg-task-llama-teal min-w-full min-h-screen flex flex-col items-center justify-center'>
      <Container className='mt-[-7rem]'>
        <Header className='text-heading text-task-llama-white m-0 text-center pb-5'>
          Welcome to Task Llama 🦙 Test branch
        </Header>
        <Container className='text-center'>
          <Header.Subheader className='text-task-llama-white pb-4 text-sub-heading'>
            A better way to track your day to day tasks, say goodbye to chaos
            and hello to productivity!
          </Header.Subheader>
          <Button
            as={Link}
            to={`${Route.App.toLowerCase()}`}
            inverted
            className='font-body text-task-llama-white hover:!bg-task-llama-white hover:text-task-llama-teal'
          >
            Get Started
          </Button>
        </Container>
      </Container>
    </Container>
  );
}

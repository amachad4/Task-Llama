import { Link } from '@remix-run/react';
import { Button, Container, Header } from 'semantic-ui-react';
import { Route } from '~/types/constants';

export default function SplashPage() {
  return (
    <Container className='mt-[-7rem]'>
      <Header className='text-heading text-task-llama-white m-0 text-center pb-5'>
        Welcome to Task Llama 🦙
      </Header>
      <Container className='text-center'>
        <Header.Subheader className='text-task-llama-white pb-4 text-sub-heading'>
          A better way to track your day to day tasks, say goodbye to chaos and
          hello to productivity!
        </Header.Subheader>
        <Button
          as={Link}
          to={`${Route.Auth.toLowerCase()}`}
          inverted
          className='font-body text-task-llama-white hover:bg-task-llama-white hover:text-task-llama-gray-dark hover:border-task-llama-gray-dark m-0'
        >
          Get Started
        </Button>
      </Container>
    </Container>
  );
}

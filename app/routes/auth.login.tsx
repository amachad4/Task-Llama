import { Container, Header } from 'semantic-ui-react';
import LoginForm from '~/route_components/LoginForm';
import { Route } from '~/types/constants';

const ACCOUNT_LOGIN_HEADER = 'Welcome Back to Task Llama 🦙!';

const ACCOUNT_LOGIN_BLURB = `Sign in to Task Llama 🦙 now and experience a world of efficient task management at your fingertips. Let's make each day count together!`;

export default function Login() {
  return (
    <Container className='p-10'>
      <Header
        as='h1'
        className='text-task-llama-white text-center text-heading m-0'
      >
        {ACCOUNT_LOGIN_HEADER}
      </Header>
      <Header as='h3' className='text-task-llama-white text-center mt-1'>
        {ACCOUNT_LOGIN_BLURB}
      </Header>
      <Container className='bg-task-llama-white py-5 px-12 w-1/2 rounded-lg'>
        <LoginForm action={Route.UserLogin} />
      </Container>
    </Container>
  );
}

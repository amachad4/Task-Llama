import { Container, Header } from 'semantic-ui-react';
import RegisterForm from '~/route_components/RegisterForm';
import { Route } from '~/types/constants';

const ACCOUNT_REGISTRATION_HEADER =
  'Sign up for a free Task Llama 🦙 account today!';

const ACCOUNT_REGISTRATION_BLURB =
  'Unleash your productivity potential and embark on a journey towards efficient task management. Task Llama 🦙 is your trusted ally, empowering you to conquer your day, one task at a time.';

export default function Register() {
  return (
    <Container className='p-10'>
      <Header
        as='h1'
        className='text-task-llama-white text-center text-heading m-0'
      >
        {ACCOUNT_REGISTRATION_HEADER}
      </Header>
      <Header as='h3' className='text-task-llama-white text-center mt-1'>
        {ACCOUNT_REGISTRATION_BLURB}
      </Header>
      <Container className='bg-task-llama-white py-5 px-12 w-1/2 rounded-lg'>
        <RegisterForm action={Route.UserRegistration} />
      </Container>
    </Container>
  );
}

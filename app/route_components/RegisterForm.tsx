import { Link, useFetcher } from '@remix-run/react';
import { Button, Form, Header, Input } from 'semantic-ui-react';
import { FetcherState, Route } from '~/types/constants';

interface RegisterFormProps {
  action: Route;
}

export default function RegisterForm({ action }: RegisterFormProps) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form
      className='ui form'
      action={`${action.toLowerCase()}`}
      method='post'
    >
      <Header as='h2'>Register for a free account</Header>
      <Form.Field>
        <p>
          Already have an account?&nbsp;
          <Link
            className='text-task-llama-teal hover:border-b-2 hover:border-task-llama-teal'
            to={`${Route.Login.toLowerCase()}`}
          >
            Log In!
          </Link>
        </p>
        {fetcher.data?.error && (
          <p className='text-red-500'>{fetcher.data.error}</p>
        )}
      </Form.Field>
      <Form.Field required>
        <label>Email</label>
        <Input
          iconPosition='left'
          placeholder='Email'
          type='email'
          name='email'
          icon='at'
        />
      </Form.Field>
      <Form.Field required>
        <label>Username</label>
        <Input
          type='text'
          placeholder='Username'
          name='username'
          icon='user'
          iconPosition='left'
        />
      </Form.Field>
      <Form.Field required>
        <label>Display Name</label>
        <Input type='text' placeholder='Display Name' name='displayName' />
      </Form.Field>
      <Form.Field required>
        <label>Password</label>
        <Input
          type='password'
          placeholder='Password'
          name='password'
          iconPosition='left'
          icon='lock'
        />
      </Form.Field>

      <Button.Group>
        <Button
          content='Go Back!'
          icon='arrow left'
          as={Link}
          to={Route.Root}
          negative
        />
        <Button
          content='Sign Up'
          type='submit'
          icon='signup'
          loading={fetcher.state !== FetcherState.Idle.toLocaleLowerCase()}
          positive
        />
      </Button.Group>
    </fetcher.Form>
  );
}

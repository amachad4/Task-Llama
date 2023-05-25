import { Link, useFetcher } from '@remix-run/react';
import { Button, Form, Header, Input } from 'semantic-ui-react';
import { FetcherState, Route } from '~/types/constants';

interface LoginFormProps {
  action: Route;
}

export default function LoginForm({ action }: LoginFormProps) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form
      method='post'
      action={`${action.toLowerCase()}`}
      className='ui form'
    >
      <Header as='h2'>Sign In</Header>
      <Form.Field>
        <p>
          Don't have an account yet?&nbsp;
          <Link
            className='text-task-llama-teal hover:border-b-2 hover:border-task-llama-teal'
            to={`${Route.Register.toLowerCase()}`}
          >
            Sign Up!
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
        <label>Password</label>
        <Input
          placeholder='Password'
          name='password'
          type='password'
          iconPosition='left'
          icon='lock'
        />
      </Form.Field>
      <Button.Group>
        <Button
          content='Back to Home'
          as={Link}
          to={`${Route.Root.toLowerCase()}`}
          icon='home'
          negative
        />
        <Button
          content='Log In'
          type='submit'
          icon='sign-in'
          loading={fetcher.state !== FetcherState.Idle.toLocaleLowerCase()}
          positive
        />
      </Button.Group>
    </fetcher.Form>
  );
}

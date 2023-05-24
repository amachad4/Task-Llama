import { useFetcher } from '@remix-run/react';
import { Button, Form, Input } from 'semantic-ui-react';

export default function Login() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method='post' className='ui form'>
      <Form.Field>
        <label>Email</label>
        <Input placeholder='Email' name='email' />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <Input placeholder='Password' name='password' type='password' />
      </Form.Field>
      <Button type='submit'>Log In</Button>
    </fetcher.Form>
  );
}

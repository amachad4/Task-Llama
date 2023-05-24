import { Form } from '@remix-run/react';

export default function RegisterForm() {
  return (
    <Form className='ui form' action='/user-registration' method='post'>
      <input type='text' placeholder='email' name='email' />
      <input type='password' placeholder='password' name='password' />
      <input type='text' placeholder='displayName' name='displayName' />
      <input type='text' placeholder='username' name='username' />
      <input type='submit' />
    </Form>
  );
}

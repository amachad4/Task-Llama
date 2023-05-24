import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { createUserSession } from '~/auth/session.server';
import { Route } from '~/types/constants';

export function loader() {
  return redirect(`${Route.Root}`);
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const body = Object.fromEntries(formData.entries());
  const rawResponse = await fetch(
    'http://localhost:5000/api/account/register',
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  );

  const response = await rawResponse.json();

  if (response.token) {
    return createUserSession(response.token, Route.App);
  }
  return redirect('');
}

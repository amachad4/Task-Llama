import type { ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { createUserSession } from '~/auth/session.server';
import register from '~/data/register.server';
import { Route } from '~/types/constants';

export function loader() {
  return redirect(`${Route.Root}`);
}

const createSignInError = (errorMessage: string) =>
  json({ error: errorMessage });

// TODO: Validate form data
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const body = Object.fromEntries(formData.entries());
  let token: undefined | string;
  try {
    const userRegisterResponse = await register(body);
    token = userRegisterResponse.user.token;
  } catch (e: any) {
    const error = e.networkError.result;
    if (error.status === 400) {
      return createSignInError('Please complete the sign up form');
    }
    return createSignInError('Could not register your account');
  }

  if (token) {
    return createUserSession(token, Route.App);
  }
  return createSignInError('Please complete the sign up form');
}

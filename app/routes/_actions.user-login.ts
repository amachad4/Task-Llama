import { json } from '@remix-run/node';
import type { ActionArgs } from '@remix-run/node';
import userLogin from '~/data/login.server';
import { Route } from '~/types/constants';
import { createUserSession } from '~/auth/session.server';

const createSignInError = (errorMessage: string) =>
  json({ error: errorMessage });

// TODO: Validate form data
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const body = Object.fromEntries(formData.entries());
  let token: undefined | string;
  try {
    const userLoginResponse = await userLogin(body);
    token = userLoginResponse.user.token;
  } catch (e: any) {
    const error = e.networkError.result;
    if (error.status === 401) {
      return createSignInError('Incorrect Username or Password');
    }
    return createSignInError('Could not sign you in');
  }

  if (token) {
    return createUserSession(token, Route.App);
  }

  return createSignInError('Incorrect Username or Password');
}

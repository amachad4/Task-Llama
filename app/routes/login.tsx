import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import LoginForm from '~/route_components/LoginForm';
import userLogin from '~/data/login.server';
import { Route } from '~/types/constants';
import { createUserSession } from '~/auth/session.server';

// TODO: handle 401 with graphql and style the login

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const body = Object.fromEntries(formData.entries());
  const userLoginResponse = await userLogin(body);

  const {
    user: { token },
  } = userLoginResponse;

  if (token) {
    return createUserSession(token, Route.App);
  }

  return redirect('');
}

export default function Login() {
  return <LoginForm />;
}

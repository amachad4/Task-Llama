import { json, redirect } from '@remix-run/node';
import type { ActionArgs } from '@remix-run/node';
import { getSession } from '~/auth/session.server';
import deleteTask from '~/data/deleteTask.server';
import { Route } from '~/types/constants';

export function loader() {
  throw redirect(Route.App.toLowerCase());
}

export async function action({ request, params }: ActionArgs) {
  const token = await getSession(request);
  if (!token) throw redirect(`${Route.Login.toLowerCase()}`);
  const { id } = params;
  try {
    await deleteTask(token, { id });
  } catch (e: any) {
    throw json({ error: 'Could not delete task omg' }, { status: 422 });
  }

  return redirect(Route.App.toLowerCase());
}

import type { LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { getSession } from '~/auth/session.server';
import { Route } from '~/types/constants';

export async function loader({ request }: LoaderArgs) {
  const token = await getSession(request);
  if (!token) throw redirect(Route.Register.toLowerCase());
  throw redirect(Route.App.toLowerCase());
}

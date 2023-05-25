import type { ActionArgs } from '@remix-run/node';
import { destroyUserSession } from '~/auth/session.server';

export async function action({ request }: ActionArgs) {
  return destroyUserSession(request);
}

import { createCookieSessionStorage, redirect } from '@remix-run/node';
import type { Route } from '~/types/constants';

const SESSION_SECRET = process.env.SESSION_SECRET;

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    secrets: [SESSION_SECRET],
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
  },
});

export async function createUserSession(token: string, redirectPath: Route) {
  const session = await sessionStorage.getSession();
  session.set('jwt', token);
  return redirect(redirectPath.toLowerCase(), {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
}

export async function getSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );
  const token = session.get('jwt');
  return token;
}

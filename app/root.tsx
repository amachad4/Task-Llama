import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react';
import tailwindStyles from './styles/tailwind.css';
import semanticUiStyles from 'semantic-ui-css/semantic.min.css';
import ApolloContext from './context/apollo';
import { useContext } from 'react';
import NavBar from './route_components/NavBar';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: semanticUiStyles },
  { rel: 'stylesheet', href: tailwindStyles }
];

// TODO: check for session token and dynamically render navbar

export default function App() {
  const initialState = useContext(ApolloContext);
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <NavBar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_STATE__=${JSON.stringify(
              initialState
            ).replace(/</g, '\\u003c')};`
          }}
        />
      </body>
    </html>
  );
}

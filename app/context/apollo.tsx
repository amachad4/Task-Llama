import { createContext } from 'react';

import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

const isBrowser = typeof window !== 'undefined';
const initialState = isBrowser ? window.__INITIAL_STATE__ : {};

export function initApollo(
  token: string | undefined = undefined,
  ssrMode = true
) {
  const restLink = new RestLink({
    uri: 'http://localhost:5000/api/',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    credentials: 'same-origin'
  });

  return new ApolloClient({
    link: from([restLink]),
    cache: new InMemoryCache().restore(initialState),
    ssrMode
  });
}

export default createContext(initialState);

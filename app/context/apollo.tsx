import { createContext } from 'react';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

const isBrowser = typeof window !== 'undefined';
const initialState = isBrowser ? window.__INITIAL_STATE__ : {};

const restLink = new RestLink({
  uri: 'http://localhost:5000/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  credentials: 'same-origin',
});

export function initApollo(ssrMode = true) {
  return new ApolloClient({
    link: restLink,
    cache: new InMemoryCache().restore(initialState),
    ssrMode,
  });
}

export default createContext(initialState);

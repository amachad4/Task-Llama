import type { V2_MetaFunction } from '@remix-run/node';
import { Container } from 'semantic-ui-react';
import SplashPage from '~/route_components/SplashPage';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Welcome to Task Llama!' }];
};

export default function Index() {
  return (
    <Container className='bg-gradient-30 min-w-full min-h-screen flex flex-col items-center justify-center'>
      <SplashPage />
    </Container>
  );
}

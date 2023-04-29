import type { V2_MetaFunction } from '@remix-run/node';
import { Container, Header } from 'semantic-ui-react';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Welcome to ListLlama!' }];
};

export default function Index() {
  return (
    <Container>
      <Header as='h2' className='text-heading font-bold'>
        Welcome to ListLlama
      </Header>
      <section className='text-red-600'></section>
    </Container>
  );
}

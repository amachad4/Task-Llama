import { NavLink, useLocation } from '@remix-run/react';
import { Button, Menu, Segment } from 'semantic-ui-react';

export default function NavBar() {
  const location = useLocation();

  return (
    <div className='m-0 p-2 bg-task-llama-teal '>
      <Menu pointing secondary className='border-none'>
        <Menu.Item
          name='/todos'
          as={NavLink}
          to='todos'
          className='mr-2 text-task-llama-white active:border-task-llama-white focus:border-task-llama-white hover:border-task-llama-white'
        />
        <Menu.Item
          name='home'
          as={NavLink}
          to='/'
          className='mr-2 text-task-llama-white'
        />
        <Menu.Menu position='right'>
          <Menu.Item
            as={NavLink}
            to='/testing'
            name='logout'
            className='mr-2 text-task-llama-white active:border-task-llama-white focus:border-task-llama-white hover:border-task-llama-white'
          />
        </Menu.Menu>
      </Menu>
    </div>
  );
}

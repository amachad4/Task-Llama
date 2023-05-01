import { NavLink, useLocation } from '@remix-run/react';
import { Button, Icon, Menu, Segment } from 'semantic-ui-react';
import CreateTaskForm from './CreateTaskForm';
import TaskLlamaModal from './TaskLlamaModal';
import { useState } from 'react';

export default function NavBar() {
  const location = useLocation();
  // TODO: posibly use MobX to pass down open and close modal state
  const [open, setOpen] = useState(false);

  return (
    <div className='m-0 p-2 bg-task-llama-teal '>
      <Menu pointing secondary className='border-none'>
        <Menu.Item
          name='Task Llama'
          as={NavLink}
          to='/app'
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
            to='/app/createTaskFormRoute'
            className='mr-2'
          >
            <Icon
              name='add'
              inverted
              className='hover:opacity-50 hover:cursor-pointer text-task-llama-white'
            />
          </Menu.Item>
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

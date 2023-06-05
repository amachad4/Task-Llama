import { NavLink, useFetcher } from '@remix-run/react';
import { Icon, Menu } from 'semantic-ui-react';
import { Route } from '~/types/constants';

export default function NavBar() {
  // TODO: posibly use MobX to pass down open and close modal state

  const fetcher = useFetcher();

  return (
    <div className='m-0 p-2 bg-gradient-45'>
      <Menu pointing secondary className='border-none'>
        <Menu.Item
          name='Task Llama'
          as={NavLink}
          to={`${Route.App.toLowerCase()}`}
          className='mr-2 hover:opacity-50 text-task-llama-white active:border-task-llama-white focus:border-task-llama-white hover:border-task-llama-white'
        />
        <Menu.Item
          name='home'
          as={NavLink}
          to={`${Route.Root}`}
          className='mr-2 hover:opacity-50 text-task-llama-white'
        />
        <Menu.Menu position='right'>
          <Menu.Item
            as={NavLink}
            to={`${Route.NewTask.toLowerCase()}`}
            className='mr-2'
          >
            <Icon
              name='add'
              inverted
              className='hover:opacity-50 hover:cursor-pointer text-task-llama-white'
            />
          </Menu.Item>
          <Menu.Item className='hover:cursor-pointer'>
            <fetcher.Form
              method='post'
              action={`${Route.UserLogout.toLowerCase()}`}
            >
              <button className='text-task-llama-white hover:cursor-pointer hover:opacity-50'>
                <Icon
                  name='sign-out'
                  inverted
                  className='hover:opacity-50 text-task-llama-white'
                />
                &nbsp;Logout
              </button>
            </fetcher.Form>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
}

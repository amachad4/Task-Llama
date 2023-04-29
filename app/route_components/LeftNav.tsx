import { useState } from 'react';
import { Accordion, Icon, Menu } from 'semantic-ui-react';

export default function LeftNav() {
  const [openAccordian, setOpenAccordian] = useState(false);

  return (
    <Accordion styled className='shadow-none'>
      <Accordion.Title
        index={0}
        active={openAccordian}
        onClick={() => {
          setOpenAccordian((prevValue) => !prevValue);
        }}
        className='hover:bg-task-llama-white flex justify-center items-center'
      >
        <Icon name='dropdown' />
        <div className='basis-full'>
          <div className='flex justify-between'>
            <span>Todo Lists</span>
            <span>🗒</span>
          </div>
        </div>
      </Accordion.Title>
      <Accordion.Content active={openAccordian}>
        {/* TODO: map over a list of todo list */}
        <Menu secondary vertical className='w-[100%]'>
          <Menu.Item name='account' className='hover:bg-task-llama-white' />
          <Menu.Item name='settings' className='hover:bg-task-llama-white' />
        </Menu>
      </Accordion.Content>
    </Accordion>
  );
}

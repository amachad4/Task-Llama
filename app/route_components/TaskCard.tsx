import type { AtLeast, Task } from '~/types/types';
import { CSS } from '@dnd-kit/utilities';
import { Button, Card, Icon } from 'semantic-ui-react';
import { format } from 'date-fns';

import { useDraggable } from '@dnd-kit/core';
import { Link } from '@remix-run/react';

interface TaskCardProps {
  task: AtLeast<Task, 'id' | 'deadline' | 'title'>;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { statusLkpId: task.status_lkp_id }
  });
  const style = {
    transform: CSS.Translate.toString(transform)
  };

  const date = format(new Date(task.deadline), 'yyyy-MM-dd');

  return (
    <div
      className='mb-2 mx-auto w-fit'
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <Card>
        <Card.Content>
          <div className='flex justify-between items-center'>
            <Card.Header>
              <Icon name='clipboard check' />
              {task.title}
            </Card.Header>
            <Button.Group basic size='small'>
              <Button
                size='mini'
                icon='plus'
                as={Link}
                to={`new-sub-task/${task.id}`}
              />
              <Button
                size='mini'
                icon='edit'
                as={Link}
                to={`edit-task/${task.id}`}
              />
              <Button
                size='mini'
                icon='trash'
                as={Link}
                to={`delete-task/${task.id}`}
              />
            </Button.Group>
          </div>
          <Card.Meta>{date}</Card.Meta>
          <Card.Description>
            TODO: add description column to the database
            {task.status_lkp_id}
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
}

import type { Activity } from '~/types/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from 'semantic-ui-react';
import { format } from 'date-fns';

export default function TaskCard({ activity }: { activity: Activity }) {
  const { setNodeRef, listeners, attributes, transform } = useSortable({
    id: activity.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  const date = format(new Date(activity.deadline), 'yyyy-MM-dd');

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='mb-5'
    >
      <Card>
        <Card.Content>
          <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>{date}</Card.Meta>
          <Card.Description>
            TODO: add description column to the database
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
}

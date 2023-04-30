import { Activity } from '~/types/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function Task({ activity }: { activity: Activity }) {
  const { setNodeRef, listeners, attributes, transition, transform } =
    useSortable({
      id: activity.id
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  return (
    <div
      className='m-2 h-[340px]'
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      {activity.title}
    </div>
  );
}

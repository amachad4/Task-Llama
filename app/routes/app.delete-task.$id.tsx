import { json } from '@remix-run/node';
import type { LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import DeleteTaskForm from '~/route_components/DeleteTaskForm';
import TaskLlamaModal from '~/route_components/TaskLlamaModal';

const modalDescription = 'This action cannot be undone';
const subTitle = 'Are you sure you want to delete this task?';

export async function loader({ params }: LoaderArgs) {
  const { id } = params;
  return json({ id });
}

export default function DeleteTask() {
  const [open, setOpen] = useState(true);

  const data = useLoaderData<{ id: string }>();

  const { id } = data;

  // Todo: display selected task

  return (
    <TaskLlamaModal
      title='Delete selected Task'
      subTitle={`${subTitle}`}
      modalDescription={`${modalDescription}`}
      open={open}
      setOpen={setOpen}
    >
      <DeleteTaskForm id={id} />
    </TaskLlamaModal>
  );
}

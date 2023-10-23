import { useState } from 'react';
import TaskLlamaModal from '~/route_components/TaskLlamaModal';

const modalDescription = 'This action cannot be undone';
const subTitle = 'Are you sure you want to delete this task?';

export default function DeleteTask() {
  const [open, setOpen] = useState(true);

  // Todo: display selected task

  return (
    <TaskLlamaModal
      title='Delete selected Task'
      subTitle={`${subTitle}`}
      modalDescription={`${modalDescription}`}
      open={open}
      setOpen={setOpen}
    ></TaskLlamaModal>
  );
}

import { useState } from 'react';
import CreateTaskForm from '~/route_components/CreateTaskForm';
import TaskLlamaModal from '~/route_components/TaskLlamaModal';

const modalDescription =
  'Use this form to create a new task for your todo list. Simply fill out the fields below and click "Add task" to save it to your current todo list.';
const subTitle =
  'Stay on track: Create a new task to keep your goals in sight ✅';

export default function NewTask() {
  const [open, setOpen] = useState(true);

  return (
    <TaskLlamaModal
      title='Create a new Task!'
      subTitle={`${subTitle}`}
      modalDescription={`${modalDescription}`}
      open={open}
      setOpen={setOpen}
    >
      <CreateTaskForm />
    </TaskLlamaModal>
  );
}

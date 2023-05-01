import { Button, Form, Input, Label } from 'semantic-ui-react';
import { useFetcher } from '@remix-run/react';
import { useEffect, useState } from 'react';

const categoryOptions = [
  {
    key: 1,
    text: 'Fitness 🏃‍♂️',
    value: 1
  },
  {
    key: 2,
    text: 'Education 📚',
    value: 2
  }
];

export default function CreateTaskForm() {
  const fetcher = useFetcher();

  let errors = fetcher.data?.errors;

  const [errorsState, setErrorsState] = useState(errors);

  useEffect(() => {
    if (errors && Object.keys(errors).length) setErrorsState(errors);
  }, [errors]);

  return (
    <fetcher.Form className='ui form' method='post' action='/app/createTask'>
      <Form.Field error={errorsState?.titleError}>
        <label>Task Title:</label>
        <Input
          placeholder='Task Title'
          name='title'
          type='text'
          onChange={() => {
            if (errorsState) setErrorsState(undefined);
          }}
        />
        {errorsState?.titleError && (
          <Label basic color='red' pointing>
            Please enter a Title
          </Label>
        )}
      </Form.Field>
      <Form.Field error={errorsState?.deadlineError}>
        <label>Task Deadline:</label>
        <Input
          placeholder='Task Deadline'
          name='deadline'
          type='date'
          onChange={() => {
            if (errorsState) setErrorsState(undefined);
          }}
        />
        {errorsState?.deadlineError && (
          <Label basic color='red' pointing>
            Please select a date!
          </Label>
        )}
      </Form.Field>
      <div className='flex flex-row items-center mb-5'>
        <Form.Field
          label='Task category'
          control='select'
          name='category_lkp_id'
          error={errorsState?.categoryError}
          className='w-1/2'
          onChange={() => {
            if (errorsState) setErrorsState(undefined);
          }}
        >
          <option value='' selected aria-readonly>
            Select a Category
          </option>
          <option value='1'>Education</option>
          <option value='2'>Fitness</option>
        </Form.Field>
        {errorsState?.categoryError && (
          <Label basic color='red' pointing='left'>
            Please select a Category!
          </Label>
        )}
      </div>

      <Button
        type='submit'
        positive
        icon='add'
        content='Add Task'
        loading={fetcher.state !== 'idle'}
      />
    </fetcher.Form>
  );
}

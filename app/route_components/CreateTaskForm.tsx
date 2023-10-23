import { Button, Form, Input, Label } from 'semantic-ui-react';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import type { CreateTaskErrorsObject } from '~/types/types';
import { FetcherState, Route } from '~/types/constants';
import { format } from 'date-fns';

export default function CreateTaskForm() {
  const fetcher = useFetcher();

  const data = useLoaderData();

  const task = data?.task;

  const mode: 'edit' | 'create' = task ? 'edit' : 'create';

  let errors: CreateTaskErrorsObject | undefined = fetcher.data?.formErrors;

  const [errorsState, setErrorsState] = useState(errors);

  useEffect(() => {
    if (errors && Object.keys(errors).length) setErrorsState(errors);
  }, [errors]);

  // TODO: pass in options as a prop, see route_components/Form.tsx
  // TODO: Fix error bump
  // TODO: Add a better date picker

  return (
    <fetcher.Form
      className='ui form'
      method='post'
      action={
        mode === 'create'
          ? `${Route.CreateTask.toLowerCase()}`
          : `${Route.EditTask.toLowerCase()}/${task.id}`
      }
    >
      <Form.Field error={errorsState?.titleError}>
        <label>Task Title:</label>
        <Input
          placeholder='Task Title'
          name='title'
          type='text'
          onChange={() => {
            if (errorsState) setErrorsState(undefined);
          }}
          defaultValue={task?.title ?? ''}
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
          defaultValue={
            task ? format(new Date(task?.deadline), 'yyyy-MM-dd') : ''
          }
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
          defaultValue={task?.category_lkp_id ?? ''}
        >
          <option value=''>Select a Category</option>
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
        icon={mode === 'create' ? 'add' : 'edit'}
        content={mode === 'create' ? 'Create Task' : 'Edit Task'}
        loading={fetcher.state !== FetcherState.Idle.toLocaleLowerCase()}
      />
    </fetcher.Form>
  );
}

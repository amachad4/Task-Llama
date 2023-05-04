import { Button, Form, Input, Label, Segment } from 'semantic-ui-react';
import { useFetcher } from '@remix-run/react';
import { useEffect, useState } from 'react';
import type { CreateTaskErrorsObject } from '~/types/types';
import { FetcherState, Route } from '~/types/constants';

export default function CreateTaskForm() {
  const fetcher = useFetcher();
  let testingLinterAgainAndAgain = 105;

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
      action={`${Route.CreateTask}`}
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
          <option value='' selected>
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
        loading={fetcher.state !== FetcherState.Idle.toLocaleLowerCase()}
      />
    </fetcher.Form>
  );
}

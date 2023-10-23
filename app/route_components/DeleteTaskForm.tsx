import { useFetcher, useNavigate } from '@remix-run/react';
import { Button } from 'semantic-ui-react';
import { FetcherState, Route } from '~/types/constants';

export default function DeleteTaskForm({ id }: { id: string }) {
  const fetcher = useFetcher();
  const navigate = useNavigate();

  return (
    <fetcher.Form
      className='ui form'
      method='post'
      action={`${Route.DeleteTask}/${id}`}
    >
      <Button.Group>
        <Button
          positive
          onClick={() => {
            navigate('..');
          }}
        >
          Cancel
        </Button>
        <Button.Or />
        <Button
          type='submit'
          negative
          content='Delete'
          loading={fetcher.state !== FetcherState.Idle.toLocaleLowerCase()}
        />
      </Button.Group>
    </fetcher.Form>
  );
}

import { json, redirect } from '@remix-run/node';
import type { ActionArgs } from '@remix-run/node';
import { getSession } from '~/auth/session.server';
import editTask from '~/data/editTask.server';
import getTask from '~/data/getTask.server';
import { Route } from '~/types/constants';

type EditTaskFormData = {
  title: string;
  deadline: string;
  category_lkp_id: string;
  created_at: string;
  status_lkp_id: number;
};

export function loader() {
  throw redirect(Route.App.toLowerCase());
}

export async function action({ request, params }: ActionArgs) {
  const token = await getSession(request);
  if (!token) throw redirect(`${Route.Login.toLowerCase()}`);

  const formData = await request.formData();
  const body = Object.fromEntries(
    formData.entries()
  ) as unknown as EditTaskFormData;

  const task = await getTask(token, { id: params.id });

  const deadline = body.deadline
    ? new Date(body.deadline).toJSON()
    : new Date(task.task.data.deadline).toJSON();
  const created_at = new Date(task.task.data.created_at).toJSON();

  body.title = body.title ?? task.task.data.title;
  body.category_lkp_id = body.category_lkp_id ?? task.task.data.category_lkp_id;
  body.status_lkp_id = body.status_lkp_id
    ? Number(body.status_lkp_id)
    : task.task.data.status_lkp_id;

  const editTaskObj = {
    ...body,
    id: params.id,
    deadline,
    updated_at: new Date().toJSON(),
    created_at
  };

  try {
    await editTask(token, editTaskObj);
  } catch (e: any) {
    throw json({ error: 'Could not edit the task omg' }, { status: 422 });
  }

  return redirect(Route.App.toLowerCase());
}

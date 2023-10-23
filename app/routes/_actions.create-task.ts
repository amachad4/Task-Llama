import type { ActionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Route } from '~/types/constants';
import type { CreateTaskErrorsObject } from '~/types/types';
import createTask from '~/data/createTask.server';
import { getSession } from '~/auth/session.server';

export function loader() {
  throw redirect(Route.App.toLowerCase());
}

// TODO create and move function to validation helper directory, posibly create unit tests

function validateTaskFormData({
  title,
  deadline,
  category_lkp_id
}: CreateTaskFormData) {
  const errorsObj: CreateTaskErrorsObject = {
    titleError: false,
    deadlineError: false,
    categoryError: false
  };
  if (!title?.trim()) {
    errorsObj.titleError = true;
  }
  if (!deadline?.trim()) {
    errorsObj.deadlineError = true;
  }
  if (!category_lkp_id?.trim()) {
    errorsObj.categoryError = true;
  }
  const errorsArray: CreateTaskErrorsObject[] = Object.values(errorsObj);
  const errorsArrayContainsAnError = errorsArray.some((error) =>
    Boolean(error)
  );
  if (errorsArrayContainsAnError) return errorsObj;
}

type CreateTaskFormData = {
  title: string;
  deadline: string;
  category_lkp_id: string;
};

export async function action({ request }: ActionArgs) {
  const token = await getSession(request);
  if (!token) throw redirect(`${Route.Login.toLowerCase()}`);
  const formData = await request.formData();
  const body = Object.fromEntries(formData.entries()) as CreateTaskFormData;
  const formErrors = validateTaskFormData(body);
  if (formErrors) return json({ formErrors }, { status: 422 });
  const deadline = new Date(body.deadline).toJSON();

  const createTodoItemObj = {
    ...body,
    deadline,
    created_at: new Date().toJSON()
  };

  try {
    await createTask(token, createTodoItemObj);
  } catch (e: any) {
    throw json({ error: 'Could not create task' }, { status: 422 });
  }

  return redirect(Route.App.toLowerCase());
}

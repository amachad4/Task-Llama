import type { ActionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Route } from '~/types/constants';
import type { CreateTaskErrorsObject } from '~/types/types';

export function loader() {
  return redirect(Route.App.toLowerCase());
}

// TODO create and move function to validation helper directory, posibly create unit tests

function validateTaskFormData({
  title,
  deadline,
  category_lkp_id,
}: CreateTaskFormData) {
  const errorsObj: CreateTaskErrorsObject = {
    titleError: false,
    deadlineError: false,
    categoryError: false,
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
  const formData = await request.formData();
  const body = Object.fromEntries(formData.entries()) as CreateTaskFormData;
  const formErrors = validateTaskFormData(body);
  if (formErrors) return json({ formErrors }, { status: 422 });
  const deadline = new Date(body.deadline).toJSON();

  const createTodoItemObj = {
    ...body,
    deadline: deadline,
    created_at: new Date().toJSON(),
  };
  let rawResponse: undefined | Response;
  try {
    rawResponse = await fetch('http://localhost:5000/api/activities', {
      method: 'POST',
      body: JSON.stringify(createTodoItemObj),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  } catch (e) {
    throw json({ message: e }, { status: 503 });
  }

  if (!rawResponse.ok)
    throw json({ message: 'Could not create task' }, { status: 500 });

  const response = await rawResponse.json();

  if (response?.error)
    throw json(
      { message: response.error.statusText },
      { status: response.error.statusCode }
    );

  return redirect(Route.App.toLowerCase());
}

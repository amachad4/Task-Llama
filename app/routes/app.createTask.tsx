import { ActionArgs, json, redirect } from '@remix-run/node';

export function loader() {
  return redirect('/app');
}

// TODO create and move function to validation helper directory, posibly create unit tests
function validateTaskFormData(formData) {
  console.log('formData: ', formData);
  const errorsObj = {
    titleError: false,
    deadlineError: false,
    categoryError: false
  };
  if (!formData.title?.trim()) {
    errorsObj.titleError = true;
  }
  if (!formData.deadline?.trim()) {
    errorsObj.deadlineError = true;
  }
  if (!formData.category_lkp_id?.trim()) {
    errorsObj.categoryError = true;
  }
  const errorsArray = Object.values(errorsObj);
  const errorsArrayContainsAnError = errorsArray.some((error) =>
    Boolean(error)
  );
  if (errorsArrayContainsAnError) return json({ errors: errorsObj });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const body = Object.fromEntries(formData.entries());
  console.log('body: ', body);
  const errors = validateTaskFormData(body);
  if (errors) return errors;
  const deadline = new Date(body.deadline).toJSON();

  const createTodoItemObj = {
    ...body,
    deadline: deadline,
    created_at: new Date().toJSON()
  };
  const rawResponse = await fetch('http://localhost:5000/api/activities', {
    method: 'POST',
    body: JSON.stringify(createTodoItemObj),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const content = await rawResponse.json();
  return redirect('/app');
}

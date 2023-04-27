import { ActionArgs, redirect } from "@remix-run/node";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const body = Object.fromEntries(formData.entries());
  console.log("body: ", body);
  const createTodoItemObj = {
    ...body,
    created_at: new Date().toJSON(),
  };
  const rawResponse = await fetch("http://localhost:5000/api/activities", {
    method: "POST",
    body: JSON.stringify(createTodoItemObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const content = await rawResponse.json();
  return redirect("/todo");
}

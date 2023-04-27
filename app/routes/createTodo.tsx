import Form from "~/route_components/Form";

export default function CreateTodo() {
  return (
    <>
      <h1>Create a todo list</h1>
      <Form
        options={[
          { label: "fitness", value: 1 },
          { label: "education", value: 2 },
        ]}
      />
    </>
  );
}

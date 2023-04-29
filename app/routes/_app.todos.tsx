import { useLoaderData } from '@remix-run/react';
import { Activity } from '~/types/types';

interface loaderData {
  todoList: Activity[];
}

export async function loader(): Promise<loaderData> {
  const todoListQuery = await fetch('http://localhost:5000/api/activities', {
    method: 'GET'
  });
  if (!todoListQuery.ok) throw new Error('Could not fetch your todo list');
  const todoListArray = await todoListQuery.json();
  return { todoList: todoListArray };
}

export default function todo() {
  const loaderData = useLoaderData<loaderData>();
  const { todoList } = loaderData;
  return (
    <div>
      <h1>Todo list</h1>
      <ul>
        {todoList.map((item) => {
          return <li>{item.title}</li>;
        })}
      </ul>
    </div>
  );
}

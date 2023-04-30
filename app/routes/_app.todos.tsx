import { useLoaderData } from '@remix-run/react';
import { Activity } from '~/types/types';
import {
  DndContext,
  useSensor,
  PointerSensor,
  closestCenter,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  useSortable,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import Task from '~/route_components/Task';
import { useState } from 'react';

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
  const [items, setItems] = useState<Array<Activity>>(todoList);
  const sensor = useSensor(PointerSensor);

  const handleDrag = ({ active, over }: DragEndEvent) => {
    if (over) {
      if (active.id !== over.id) {
        setItems((array) => {
          const oldIndex = array.findIndex((item) => item.id === active.id);
          const newIndex = array.findIndex((item) => item.id === over.id);
          return arrayMove(array, oldIndex, newIndex);
        });
      }
    }
  };

  return (
    <div>
      <DndContext
        sensors={[sensor]}
        collisionDetection={closestCenter}
        onDragEnd={handleDrag}
      >
        <SortableContext
          items={todoList.map((todo) => todo.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => {
            return <Task key={item.id} activity={item} />;
          })}
        </SortableContext>
      </DndContext>
    </div>
  );
}

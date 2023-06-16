import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id
  });
  const style = {
    color: isOver ? 'green' : undefined
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='h-20 w-20 bg-task-llama-gray'
    >
      {props.children}
    </div>
  );
}

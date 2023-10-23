import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export function Droppable(props: any) {
  const { setNodeRef } = useDroppable({
    id: props.id
  });

  return (
    <div
      ref={setNodeRef}
      className='max-h-fit min-h-screen bg-transparent hover:outline hover:outline-[#393E46] hover:rounded-lg py-2'
    >
      {props.children}
    </div>
  );
}

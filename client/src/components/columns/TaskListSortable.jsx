import React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';

function SortableTask({ task, id, index, onTaskClick }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 'auto',
    background: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    marginBottom: '0.5rem',
    padding: '0.75rem',
    cursor: 'grab',
    position: 'relative',
  };

  const handleTaskClick = (e) => {
    if (!isDragging) {
      if (!e.target.closest('[role="button"]')) {
        onTaskClick?.(task);
      }
    }
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} onClick={handleTaskClick}>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <span style={{ flex: 1 }} className="text-gray-800 text-sm cursor-pointer underline decoration-gray-400 hover:decoration-gray-600 break-words">
          {task.taskName}
        </span>
        <span
          {...listeners}
          role="button"
          style={{ cursor: 'grab', marginLeft: 8, opacity: 0.5 }}
          onClick={e => e.stopPropagation()}
        >
          &#9776;
        </span>
      </div>
    </div>
  );
}

export default function TaskListSortable({ tasks, onReorder, onTaskClick }) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const taskIds = tasks.map((task) => task.taskId);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = taskIds.indexOf(active.id);
      const newIndex = taskIds.indexOf(over.id);
      const newOrder = arrayMove(tasks, oldIndex, newIndex);
      onReorder(newOrder);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        {tasks.map((task, idx) => (
          <SortableTask
            key={task.taskId}
            id={task.taskId}
            task={task}
            index={idx}
            onTaskClick={onTaskClick}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}

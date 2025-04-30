import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from "@dnd-kit/core";

export const DndContextProvider = ({ children, onDragEnd }) => {
  const [activeDragTask, setActiveDragTask] = useState(null);
  const [dropTargetStyle, setDropTargetStyle] = useState({});

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 0,
        distance: 1,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event) => {
    const { active } = event;
    if (!active) return;

    const taskId = active.id;
    const taskData = active.data?.current?.task;

    if (taskData) {
      setActiveDragTask(taskData);
    }
  };

  const handleDragOver = (event) => {
    const { over } = event;
    if (over && over.data.current?.type === "column") {
      setDropTargetStyle({
        [over.id]: "bg-blue-50 border-blue-200",
      });
    } else {
      setDropTargetStyle({});
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveDragTask(null);
    setDropTargetStyle({});

    if (!active || !over) return;

    const taskId = active.id;
    const newColumnId = over.id;
    
    const taskData = active.data?.current;
    if (!taskData || taskData.type !== "task") return;

    onDragEnd(taskId, newColumnId);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay>
        {activeDragTask ? (
          <div className="bg-white p-3 rounded shadow-md border-2 border-blue-400 w-56">
            {activeDragTask.taskName}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
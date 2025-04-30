import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripHorizontal } from "lucide-react";
import { TaskDetailsModal } from "../TaskDetailsModal.jsx";

export const DraggableTask = ({ task, columnName }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.taskId,
    data: { type: "task", task },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTaskNameClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={`bg-white p-3 rounded shadow-sm hover:shadow-md transition-all duration-200 group ${
          isDragging ? "ring-2 ring-blue-400" : ""
        } w-full`}
      >
        <div className="flex justify-between items-start w-full">
          <div className="flex-grow pr-2">
            <p
              className="text-gray-800 text-sm cursor-pointer underline decoration-gray-400 hover:decoration-gray-600 break-words"
              onClick={handleTaskNameClick}
            >
              {task.taskName}
            </p>
          </div>
          <div
            {...listeners}
            role="button"
            className="cursor-grab p-1 -mr-1 -mt-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
            style={{
              touchAction: "none",
              pointerEvents: "auto",
            }}
          >
            <GripHorizontal className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TaskDetailsModal
          taskId={task.taskId}
          columnName={columnName} 
          onClose={closeModal}
        />
      )}
    </>
  );
};
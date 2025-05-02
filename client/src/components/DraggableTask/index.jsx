import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripHorizontal, Calendar, Clock, Tag, AlertCircle } from "lucide-react";
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

  const formatDueDate = (dateString) => {
    if (!dateString) return "No due date";
    
    try {
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      
      const options = { month: 'short', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    } catch (e) {
      console.error("Error formatting date:", e);
      return "Date error";
    }
  };

  const isOverdue = () => {
    if (!task.dueDate) return false;
    
    try {
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return dueDate < today;
    } catch (e) {
      return false;
    }
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
              className="text-gray-800 font-medium cursor-pointer hover:underline break-words transition-colors"
              onClick={handleTaskNameClick}
            >
              {task.taskName}
            </p>
            
            <div className="mt-2">
              <div 
                className={`flex items-center text-xs rounded px-2 py-1 ${
                  !task.dueDate ? 'bg-gray-100 ' : 
                  isOverdue() ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                }`}
              >
                <Calendar className="w-3 h-3 mr-1" />
                <span>Due Date: {formatDueDate(task.taskDueDate)}</span>
              </div>
            </div>
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
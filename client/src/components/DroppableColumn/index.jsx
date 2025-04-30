import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Plus, MoreVertical, Edit, Trash } from "lucide-react";
import {ConfirmationModal} from "../PopUp/confirmation/index.jsx";

export const DroppableColumn = ({ 
  column, 
  onAddTask, 
  onEditColumn,
  onDeleteColumn,
  dropTargetStyle,
  activeColumnMenu,
  toggleColumnMenu,
  children 
}) => {
  const { setNodeRef } = useDroppable({
    id: column.columnId,
    data: { type: "column", column },
  });

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex-shrink-0 w-64 flex flex-col min-h-64">
      <div className="flex justify-between items-center mb-2 sticky top-0 bg-gray-50 z-10 pb-1">
        <div className="flex items-center">
          <h3
            className="font-medium text-gray-600 max-w-[150px] truncate cursor-pointer"
            title={column.columnName}
          >
            {column.columnName}
          </h3>
          <span className="ml-2 bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">
            {column.tasks?.length || 0}
          </span>
        </div>
        
        <div className="column-menu relative">
          <button
            onClick={() => toggleColumnMenu(column.columnId)}
            className="font-bold hover:bg-blue-100 p-1 rounded-full w-6 h-6 flex items-center justify-center transition-all duration-200"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {activeColumnMenu === column.columnId && (
            <div className="absolute right-0 mt-1 w-36 bg-white shadow-lg rounded-md border border-gray-200 z-20 py-1">
              <button
                onClick={() => onEditColumn(column)}
                className="flex items-center px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </button>
              <button
                onClick={() => onDeleteColumn(column.columnId)}
                className="flex items-center px-4 py-2 text-sm text-red-600 w-full text-left hover:bg-gray-100"
              >
                <Trash className="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div
        ref={setNodeRef}
        className={`flex-grow overflow-y-auto min-h-40 space-y-2 transition-colors duration-200 rounded-md p-2`}
        style={{
          maxHeight: "calc(100vh - 220px)",
          minHeight: column.tasks && column.tasks.length ? "200px" : "120px",
          position: "relative",
          pointerEvents: "auto" 
        }}
      >
        {children}
      </div>
      
      <div className="mt-auto pt-2">
        <button
          onClick={() => onAddTask(column.columnId)}
          className="w-full py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Task
        </button>
      </div>
    </div>
  );
};
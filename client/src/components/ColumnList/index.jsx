import React, { useState } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DraggableTask } from "../DraggableTask/index.jsx";
import { Plus } from "lucide-react";
import { DroppableColumn } from "../DroppableColumn/index.jsx";

export const ColumnList = ({
  columns,
  onAddTask,
  onEditColumn,
  onDeleteColumn,
  onAddColumn,
}) => {
  const [activeColumnMenu, setActiveColumnMenu] = useState(null);

  const toggleColumnMenu = (columnId) => {
    setActiveColumnMenu((prev) => (prev === columnId ? null : columnId));
  };

  const sortedColumns = [...columns].sort((a, b) =>
    a.columnId.localeCompare(b.columnId)
  );

  return (
    <div className="overflow-x-auto w-full h-full">
      <div className="flex gap-4 w-max pb-4 pr-4 pt-2">
        {sortedColumns.map((column) => (
          <DroppableColumn
            key={column.columnId}
            column={column}
            onAddTask={onAddTask}
            onEditColumn={onEditColumn}
            onDeleteColumn={onDeleteColumn}
            activeColumnMenu={activeColumnMenu}
            toggleColumnMenu={toggleColumnMenu}
            className="flex-shrink-0 min-w-[300px] max-w-[300px] bg-gray-100 rounded-md shadow-md"
          >
            <SortableContext
              items={
                column.tasks && Array.isArray(column.tasks)
                  ? column.tasks.map((task) => task.taskId)
                  : []
              }
              strategy={verticalListSortingStrategy}
            >
              {column.tasks && Array.isArray(column.tasks) && column.tasks.length === 0 ? (
                <div className="text-sm text-gray-400 p-2 text-center border border-dashed border-gray-200 rounded-md">
                  No task yet
                </div>
              ) : (
                <div className="space-y-2 w-full" style={{ pointerEvents: "auto" }}>
                  {column.tasks &&
                    Array.isArray(column.tasks) &&
                    column.tasks.map((task) => (
                      <DraggableTask key={task.taskId} task={task} />
                    ))}
                </div>
              )}
            </SortableContext>
          </DroppableColumn>
        ))}

        <div className="flex-shrink-0 min-w-[300px] max-w-[300px] h-fit bg-gray-50 border border-dashed border-gray-300 rounded-md flex items-center justify-center">
          <button
            onClick={onAddColumn}
            className="p-1 text-gray-600 hover:bg-gray-100 transition flex items-center justify-center w-full"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
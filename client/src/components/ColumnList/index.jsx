import React, { useState, useEffect } from "react";
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
  const [orderedColumns, setOrderedColumns] = useState([]);

  const toggleColumnMenu = (columnId) => {
    setActiveColumnMenu((prev) => (prev === columnId ? null : columnId));
  };

  useEffect(() => {
    if (!columns || !Array.isArray(columns)) {
      setOrderedColumns([]);
      return;
    }

    const standardSequence = ["To do", "On progress", "Completed"];
    const standardColumns = [];
    const otherColumns = [];

    columns.forEach((column) => {
      const index = standardSequence.findIndex(
        (name) => column.columnName.toLowerCase() === name.toLowerCase()
      );

      if (index !== -1) {
        standardColumns[index] = column;
      } else {
        otherColumns.push(column);
      }
    });

    const filteredStandardColumns = standardColumns.filter(Boolean);

    const sortedOtherColumns = otherColumns.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return a.columnId.localeCompare(b.columnId);
    });

    setOrderedColumns([...filteredStandardColumns, ...sortedOtherColumns]);
  }, [columns]);

  return (
    <div className="columns-wrapper">
      <div className="columns-content">
        {orderedColumns.map((column) => (
          <DroppableColumn
            key={column.columnId}
            column={column}
            onAddTask={onAddTask}
            onEditColumn={onEditColumn}
            onDeleteColumn={onDeleteColumn}
            activeColumnMenu={activeColumnMenu}
            toggleColumnMenu={toggleColumnMenu}
            className="board-column"
          >
            <SortableContext
              items={
                column.tasks && Array.isArray(column.tasks)
                  ? column.tasks.map((task) => task.taskId)
                  : []
              }
              strategy={verticalListSortingStrategy}
            >
              {column.tasks && column.tasks.length === 0 ? (
                <div className="text-sm text-gray-400 p-2 text-center border border-dashed border-gray-200 rounded-md">
                  No tasks yet
                </div>
              ) : (
                <div className="space-y-2 w-full" style={{ pointerEvents: "auto" }}>
                  {column.tasks.map((task) => (
                    <DraggableTask key={task.taskId} task={task} />
                  ))}
                </div>
              )}
            </SortableContext>
          </DroppableColumn>
        ))}
        <button
          onClick={onAddColumn}
          className="w-72 min-w-[280px] h-fit rounded-md bg-white"
          title="Add new column"
        >
          <Plus className="w-5 h-5" />

        </button>
      </div>
    </div>
  );
};

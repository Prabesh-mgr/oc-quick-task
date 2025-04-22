import React from "react";
import { useParams } from "react-router-dom"; 
import { useColumns } from "../../hooks/useColumn/getColumns/index.js";

export const BoardPage = () => {
  const { boardId } = useParams();

  const {
    columnsData,
    isLoadingColumns,
    columnsError,
    refetchColumns
  } = useColumns(boardId);

  if (isLoadingColumns)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading board...
      </div>
    );
  if (columnsError)
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to load board data
      </div>
    );
  if (!columnsData)
    return <div className="text-center mt-10"></div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{`New board`}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columnsData.map((column) => (
          <div
            key={column.columnId}
            className="bg-gray-100 rounded-lg p-4 min-h-[200px]"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-lg">{column.columnName}</h2>
            </div>
            <div className="text-gray-500 text-sm">Tasks not loaded</div>
          </div>
        ))}
      </div>
    </div>
  );
};

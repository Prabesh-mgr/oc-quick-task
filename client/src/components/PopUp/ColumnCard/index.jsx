import React, { useState, useEffect } from "react";
import { useCreateColumns } from "../../../hooks/useColumn/createColumns/index.js";
import { useEditColumn } from "../../../hooks/useColumn/editColumns/index.js";

export const ColumnForm = ({ 
  boardId, 
  existingColumns = [], 
  onClose, 
  onSuccess,
  editMode = false,
  columnToEdit = null
}) => {
  const [columnName, setColumnName] = useState("");
  const [error, setError] = useState("");
  
  const { addColumns, isColumnLoading } = useCreateColumns();
  const { editColumn, isEditColumnLoading } = useEditColumn();
  
  const isLoading = isColumnLoading || isEditColumnLoading;

  useEffect(() => {
    if (editMode && columnToEdit) {
      setColumnName(columnToEdit.columnName);
    } else {
      setColumnName(""); 
    }
  }, [editMode, columnToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (!columnName.trim()) {
      setError("Column name is required");
      return;
    }
    
    if (editMode) {
      const otherColumnsNames = existingColumns.filter(name => 
        name !== columnToEdit.columnName
      );
      
      if (otherColumnsNames.includes(columnName.trim())) {
        setError("Column name already exists");
        return;
      }
    } else {
      if (existingColumns.includes(columnName.trim())) {
        setError("Column name already exists");
        return;
      }
    }
    
    setError("");
    
    if (editMode && columnToEdit) {

      editColumn(
        {
          columnId: columnToEdit.columnId,
          columnData: { columnName: columnName.trim() }
        },
        {
          onSuccess: (data) => {
            if (onSuccess) {
              onSuccess({ columnName: columnName.trim() });
            }
          },
          onError: (err) => {
            console.error("Failed to update column:", err);
            setError("Failed to update column. Please try again.");
          }
        }
      );
    } else {
      addColumns(
        {
          boardId: boardId,
          columnName: columnName.trim()
        },
        {
          onSuccess: (data) => {
            if (onSuccess) {
              onSuccess(data);
            }
          },
          onError: (err) => {
            console.error("Failed to create column:", err);
            setError("Failed to create column. Please try again.");
          }
        }
      );
    }
  };
  
  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">
        {editMode ? "Edit Column" : "Add New Column"}
      </h2>
     
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="columnName" className="block text-sm font-medium text-gray-700 mb-1">
            Column Name
          </label>
          <input
            type="text"
            id="columnName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
            placeholder="Enter column name"
            disabled={isLoading}
          />
        </div>
       
        {error && (
          <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
            {error}
          </div>
        )}
       
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            disabled={isLoading}
          >
            Cancel
          </button>
         
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md disabled:opacity-50"
            disabled={isLoading || columnName.trim() === ""}
          >
            {isLoading 
              ? (editMode ? "Updating..." : "Creating...") 
              : (editMode ? "Update Column" : "Create Column")}
          </button>
        </div>
      </form>
    </div>
  );
};
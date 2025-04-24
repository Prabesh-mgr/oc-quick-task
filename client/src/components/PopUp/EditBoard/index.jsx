import React, { useState, useEffect } from "react";
import { useUpdateBoard } from "../../../hooks/useBoard/UpdateBoard/index";

export const EditBoardPopUp = ({ board, onClose, onSuccess }) => {
  const [boardName, setBoardName] = useState(board.boardName);
  const [error, setError] = useState(null); 
  const { addUpdate, isUpdateLoading } = useUpdateBoard();

  useEffect(() => {
    setBoardName(board.boardName);
  }, [board]);

  const handleSave = () => {
    if (boardName.trim() === "") return;

    if (boardName.trim() === board.boardName) {
      setError("Board name cannot be the same as the previous name.");
      return;
    }

    setError(null); 
    addUpdate(
      { boardId: board.boardId, data: { boardName } },
      {
        onSuccess: () => {
          if (onSuccess) {
            onSuccess();
          }
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-opacity-50 backdrop-blur flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Board</h2>
        
        <div className="mb-4">
          <label htmlFor="boardName" className="block text-sm font-medium text-gray-700 mb-1">
            Board Name
          </label>
          <input
            type="text"
            id="boardName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            placeholder="Enter board name"
            disabled={isUpdateLoading}
          />
          {error && <p className="flex items-center justify-center text-sm text-red-500 mt-2">!! {error}</p>} 
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            disabled={isUpdateLoading}
          >
            Cancel
          </button>
          
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={isUpdateLoading || boardName.trim() === ""}
          >
            {isUpdateLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

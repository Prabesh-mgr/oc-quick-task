import React, { useState } from "react";
import { createBoards } from "../../../hooks/useBoard/CreateBoard/index.js";

export function CardWithForm({ onSuccess }) {
  const [boardName, setBoardName] = useState("");
  const [error, setError] = useState("");
  const { createBoard, isLoading: isCreatingBoard } = createBoards();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!boardName.trim()) {
      setError("Board name is required");
      return;
    }
    
    try {
      const result = await createBoard({ boardName: boardName });
      document.dispatchEvent(new CustomEvent("closeboardmodal"));
      
      if (onSuccess) {
        onSuccess(result.board);
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setError("A board with this name already exists");
      } else {
        setError("Failed to create board. Please try again.");
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Create New Board</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Board Name
            </label>
            <input
              type="text"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter board name"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => document.dispatchEvent(new CustomEvent("closeboardmodal"))}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreatingBoard}
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isCreatingBoard ? "Creating..." : "Create Board"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
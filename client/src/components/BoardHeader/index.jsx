import React from "react";
import deleteIcon from "../../assets/deleteIcon.png";
import edit from "../../assets/edit.png";
import { LayoutGrid, List } from "lucide-react";

export const BoardHeader = ({ selectedBoard, onDelete, onEdit, viewMode, onToggleView }) => {
  return (
    <div className="flex items-center mb-4 justify-between w-200">
      <h2 className="text-xl font-bold">
        {selectedBoard.boardName}
      </h2>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onDelete(selectedBoard.boardId)}
            className="text-sm px-2 py-1 rounded-md"
            title="Delete Board"
          >
            <div className="hover:bg-blue-50 cursor-pointer p-2 rounded-2xl">
              <img
                src={deleteIcon}
                alt="Delete board"
                width={20}
                className="transition-transform duration-150 hover:scale-110 active:scale-95"
              />
            </div>
          </button>

          <span className="text-gray-300">|</span>

          <button
            onClick={() => onEdit(selectedBoard)}
            className="text-sm px-2 py-1 rounded-md"
            title="Edit Board"
          >
            <div className="hover:bg-blue-50 cursor-pointer p-2 rounded-2xl">
              <img
                src={edit}
                alt="Edit board"
                width={20}
                className="transition-transform duration-150 hover:scale-110 active:scale-95"
              />
            </div>
          </button>
        </div>
        
        <button
          onClick={onToggleView}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-full font-medium transition-all"
          title={viewMode === "board" ? "Switch to List View" : "Switch to Board View"}
        >
          {viewMode === "board" ? (
            <>
              <List size={16} />
              <span>List View</span>
            </>
          ) : (
            <>
              <LayoutGrid size={16} />
              <span>Board View</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
import React from "react";
import deleteIcon from "../../assets/deleteIcon.png";
import edit from "../../assets/edit.png";

export const BoardHeader = ({ selectedBoard, onDelete, onEdit }) => {
  return (
    <div className="flex items-center mb-4">
      <h2 className="text-xl font-bold">
        {selectedBoard.boardName} - Columns
      </h2>
      <div className="flex items-center ml-4">
        <button
          onClick={() => onDelete(selectedBoard.boardId)}
          className="text-sm px-3 py-1 rounded-md"
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
        <span>||</span>
        <button
          onClick={() => onEdit(selectedBoard)}
          className="text-sm px-3 py-1 text-yellow-700 rounded-md"
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
    </div>
  );
};
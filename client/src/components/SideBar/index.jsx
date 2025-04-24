import React from "react";
import { Plus, RefreshCcw } from "lucide-react";

export const SideBar = ({ onCreateClick, onRefreshClick }) => {
  const handleRefreshClick = (e) => {
    e.stopPropagation(); 
    if (onRefreshClick) onRefreshClick();
  };

  const handleCreateClick = (e) => {
    e.stopPropagation(); 
    if (onCreateClick) onCreateClick();
  };

  return (
    <div className="flex items-center justify-between w-full pr-2">
      <span>Boards</span>
      <div className="flex items-center gap-2">
        <button 
          onClick={handleCreateClick}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button 
          onClick={handleRefreshClick}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <RefreshCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
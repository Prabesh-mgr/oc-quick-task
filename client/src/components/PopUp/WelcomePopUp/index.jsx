import React from "react";
import { Plus } from "lucide-react";

export const WelcomePopUp = ({ onCreateBoard }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="max-w-md">
        <h2 className="text-2xl font-bold mb-2">Welcome to Your Task Board!</h2>
        <p className="text-gray-600 mb-6">
          Get started by creating your first board to organize tasks and boost your productivity.
          You can create multiple boards for different projects or areas of focus.
        </p>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-8 text-sm text-blue-700">
          <p>Boards help you organize columns and tasks in a visual way. Each board can represent a project or workflow.</p>
        </div>
        
        <button 
          onClick={onCreateBoard} 
          className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 flex items-center justify-center mx-auto transition-all duration-150"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Your Board
        </button>
      </div>
    </div>
  );
};
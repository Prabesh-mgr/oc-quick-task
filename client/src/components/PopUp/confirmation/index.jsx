import React from "react";

export const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-opacity-50 backdrop-blur flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full text-center space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Delete Board?</h2>
        <p className="text-sm text-gray-600">{message}</p>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onConfirm}
            className="bg-black text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Yes, Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};


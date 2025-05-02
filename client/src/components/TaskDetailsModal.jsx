import React, { useState, useEffect } from "react";
import { getTaskDetails } from "@/hooks/useTask/getAllTaskDetails";
import { getUsers } from "@/hooks/users";
import { useUpdateTask } from "@/hooks/useTask/updateTask";
import { useDeleteTask } from "@/hooks/useTask/deleteTask";
import { X, Trash2 } from "lucide-react";
import { useBoardColumns } from "@/hooks/useColumn/getColumns/index.js";
import { ConfirmationModal } from "../components/PopUp/confirmation/index.jsx";

export const TaskDetailsModal = ({ taskId, onClose }) => {
  
  const { taskDetails, isLoadingTaskDetails, isErrorTask } = getTaskDetails(taskId);
  const { users, isLoading: isLoadingUsers, isError: isErrorUsers } = getUsers();
  const { updateTask, isUpdatingTask } = useUpdateTask();
  const { deleteTask, isDeleteTaskLoading } = useDeleteTask();

  const [editedTaskName, setEditedTaskName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedDueDate, setEditedDueDate] = useState("");
  const [selectedColumnId, setSelectedColumnId] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(""); 
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const boardId = taskDetails?.boardId;
  const { columnsData, isLoading: isLoadingColumns, refetchColumns } = useBoardColumns(boardId);

  useEffect(() => {
    if (taskDetails) {
      setEditedTaskName(taskDetails.taskName || "");
      setEditedDescription(taskDetails.description || "");
      setEditedDueDate(taskDetails.dueDate ? new Date(taskDetails.dueDate).toISOString().substring(0, 10) : "");
      setSelectedColumnId(taskDetails.columnId || "");
      
      if (taskDetails.assignedTo && taskDetails.assignedTo.length > 0) {
        setSelectedUserId(taskDetails.assignedTo[0]);
      } else {
        setSelectedUserId("");
      }
    }
  }, [taskDetails]);

  const handleSaveTask = () => {
    const updatedTaskData = {
      taskName: editedTaskName,
      description: editedDescription,
      dueDate: editedDueDate || null,
      columnId: selectedColumnId,
      assignedTo: selectedUserId ? [selectedUserId] : [], 
    };
    
    updateTask(
      {
        taskId,
        updatedTaskData,
      },
      {
        onSuccess: () => {
          refetchColumns();
          onClose();
        },
        onError: (error) => {
          console.error("Failed to update task:", error);
        },
      }
    );
  };

  const handleDeleteTask = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteTask = () => {
    deleteTask(
      { taskId },
      {
        onSuccess: () => {
          refetchColumns();
          onClose();
        }
      }
    );
  };

  const isLoading = isLoadingTaskDetails || isLoadingUsers || isLoadingColumns;
  const hasError = isErrorTask || isErrorUsers || !taskDetails;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
          <p className="text-center">Loading task details...</p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
          <p className="text-center text-red-600">Failed to load task details. Please try again.</p>
          <div className="flex justify-center mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md md:max-w-lg p-6 overflow-y-auto max-h-[90vh] relative">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold text-gray-800">📝 Edit Task</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDeleteTask}
                className="text-red-500 hover:text-red-700 transition"
                title="Delete Task"
                disabled={isDeleteTaskLoading}
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="hover:text-gray-700 transition"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-4 text-gray-700">
            <div>
              <label className="font-medium">Task Name:</label>
              <input
                type="text"
                value={editedTaskName}
                onChange={(e) => setEditedTaskName(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
              />
            </div>

            <div>
              <label className="font-medium">Description:</label>
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
                rows="4"
              />
            </div>

            <div>
              <label className="font-medium">Due Date:</label>
              <input
                type="date"
                value={editedDueDate}
                onChange={(e) => setEditedDueDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
              />
            </div>

            <div>
              <label className="font-medium">Column:</label>
              <select
                value={selectedColumnId}
                onChange={(e) => setSelectedColumnId(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
              >
                <option value="">Select Column</option>
                {columnsData && columnsData.length > 0 ? (
                  columnsData.map((column) => (
                    <option key={column.columnId} value={column.columnId}>
                      {column.columnName}
                    </option>
                  ))
                ) : (
                  <option disabled>No columns available</option>
                )}
              </select>
            </div>

            <div>
              <label className="font-medium">Assigned To (Select One User):</label>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
              >
                <option value="">Select User</option>
                {users && users.length > 0 ? (
                  users.map((user) => (
                    <option key={user.userId || user.id || user.uuid} value={user.userId || user.id || user.uuid}>
                      {user.firstName} {user.lastName}
                    </option>
                  ))
                ) : (
                  <option disabled>No users available</option>
                )}
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={handleSaveTask}
              disabled={isUpdatingTask}
              className="px-5 py-2 bg-black text-white font-medium rounded-lg hover:bg-green-700 transition"
            >
              {isUpdatingTask ? "Saving..." : "Save"}
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 text-gray-800 bg-gray-200 font-medium rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={confirmDeleteTask}
        message={`Are you sure you want to delete the task "${editedTaskName}"? This action cannot be undone.`}
      />
    </>
  );
};
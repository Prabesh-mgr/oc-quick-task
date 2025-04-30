import React, { useState, useEffect } from "react";
import { getTaskDetails } from "@/hooks/useTask/getAllTaskDetails";
import { getUsers } from "@/hooks/users";
import { useDeleteTask } from "@/hooks/useTask/deleteTask";
import { useUpdateTask } from "@/hooks/useTask/updateTask";
import { ConfirmationModal } from "./PopUp/confirmation/index.jsx";
import { useBoardColumns } from "../hooks/useColumn/getColumns/index.js";
import { X, Trash, Edit } from "lucide-react";

export const TaskDetailsModal = ({ taskId, onClose }) => {
  const { taskDetails, isLoadingTaskDetails, isErrorTask } = getTaskDetails(taskId);
  const { users, isLoading: isLoadingUsers, isError: isErrorUsers } = getUsers();
  const { columnsData, isLoading: isLoadingColumns, isError: isErrorColumns } = useBoardColumns();
  const { deleteTask, isDeleteTaskLoading } = useDeleteTask();
  const { updateTask, isUpdatingTask } = useUpdateTask();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [columnName, setColumnName] = useState("");

  useEffect(() => {
    if (taskDetails?.columnId && columnsData?.length > 0) {
      const column = columnsData.find((col) => col.id === taskDetails.columnId);
      if (column) {
        setColumnName(column.name);
      } else {
        console.warn(`Column not found for ID: ${taskDetails.columnId}`);
        setColumnName(`Unknown Column (ID: ${taskDetails.columnId})`);
      }
    }
  }, [taskDetails, columnsData]);

  useEffect(() => {
    if (taskDetails) {
      setEditedTaskName(taskDetails.taskName || "");
      setEditedDescription(taskDetails.description || "");
    }
  }, [taskDetails]);

  const handleDeleteTask = () => {
    setIsConfirmationOpen(true);
  };

  const confirmDeleteTask = () => {
    deleteTask(taskId, {
      onSuccess: () => {
        console.log("Task deleted successfully");
        setIsConfirmationOpen(false);
        onClose();
      },
    });
  };

  const handleEditTask = () => {
    setIsEditing(true);
  };

  const handleSaveTask = () => {
    const updatedTaskData = {
      taskName: editedTaskName,
      description: editedDescription,
    };

    updateTask(
      {
        taskId,
        updatedTaskData,
      },
      {
        onSuccess: () => {
          console.log("Task updated successfully");
          setIsEditing(false);
        },
        onError: (error) => {
          console.error("Failed to update task:", error);
        },
      }
    );
  };

  const isLoading = isLoadingTaskDetails || isLoadingUsers || isLoadingColumns;
  const hasError = isErrorTask || isErrorUsers || isErrorColumns || !taskDetails;

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

  const { taskName, description, dueDate, assignedTo } = taskDetails;

  const assignedUsers = assignedTo?.map((userId) => {
    const user = users?.find((u) => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : `Unknown User (ID: ${userId})`;
  });

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md md:max-w-lg p-6 overflow-y-auto max-h-[90vh] relative">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold text-gray-800">📝 Task Details</h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleEditTask}
              className="text-yellow-600 hover:text-yellow-700 transition"
              title="Edit Task"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={handleDeleteTask}
              disabled={isDeleteTaskLoading}
              className="text-red-600 hover:text-red-700 transition"
              title="Delete Task"
            >
              <Trash className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-700 transition"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-3 text-gray-700">
          {isEditing ? (
            <>
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
            </>
          ) : (
            <>
              <p>
                <span className="font-medium">Task Name:</span> {taskName}
              </p>
              <div>
                <p className="font-medium mb-1">Description:</p>
                <div className="bg-gray-100 border border-gray-300 rounded-md p-3 text-sm text-gray-700">
                  {description || <span className="italic text-gray-400">No description provided</span>}
                </div>
              </div>
            </>
          )}
          <p>
            <span className="font-medium">Due Date:</span>{" "}
            {dueDate || <span className="italic text-gray-400">No due date set</span>}
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <p>
              <span className="font-medium text-blue-700">Column:</span>{" "}
              <span className="text-blue-800 font-medium">
                {columnName || (taskDetails.columnId ? "Loading column..." : "No column assigned")}
              </span>
            </p>
          </div>
          <div>
            <p className="font-medium">Assigned To:</p>
            {assignedUsers?.length > 0 ? (
              <ul className="list-disc pl-5">
                {assignedUsers.map((user, index) => (
                  <li key={index}>{user}</li>
                ))}
              </ul>
            ) : (
              <p className="italic text-gray-400">Not assigned</p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={handleSaveTask}
              disabled={isUpdatingTask}
              className="px-5 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
            >
              {isUpdatingTask ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-5 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {isConfirmationOpen && (
        <ConfirmationModal
          isOpen={isConfirmationOpen}
          message="Are you sure you want to delete this task? This action cannot be undone."
          onConfirm={confirmDeleteTask}
          onClose={() => setIsConfirmationOpen(false)}
        />
      )}
    </div>
  );
};
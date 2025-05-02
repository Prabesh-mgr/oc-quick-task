import React, { useState } from "react";
import { Edit, Loader2, Trash } from "lucide-react";
import { TaskDetailsModal } from "../TaskDetailsModal.jsx";
import { ConfirmationModal } from "../PopUp/confirmation/index.jsx";
import { useDeleteTask } from "@/hooks/useTask/deleteTask";

export const TaskListView = ({ columns, onTaskClick, isLoading, refetchColumns }) => {
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const { deleteTask, isDeleteTaskLoading } = useDeleteTask();

  const handleEditClick = (taskId, e) => {
    e.stopPropagation();
    setSelectedTaskId(taskId);
    setIsTaskModalOpen(true);
  };

  const handleDeleteClick = (taskId, e) => {
    e.stopPropagation();
    setTaskToDelete(taskId);
    setIsConfirmationOpen(true);
  };

  const confirmDeleteTask = () => {
    deleteTask(taskToDelete, {
      onSuccess: () => {
        setIsConfirmationOpen(false);
        refetchColumns();
      },
    });
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setSelectedTaskId(null);
  };
    
  if (isLoading) {
    return (
      <div className="text-center mt-8">
        <Loader2 className="w-6 h-6 animate-spin mx-auto" />
        <p className="text-muted-foreground mt-2">Loading tasks...</p>
      </div>
    );
  }

  const allTasks = columns?.flatMap((column) => 
    (column.tasks || []).map((task) => ({
      ...task,
      columnName: column.columnName
    }))
  ) || [];

  if (allTasks.length === 0) {
    return (
      <div className="text-center mt-8 p-6 bg-gray-50 rounded-lg">
        <p className="text-muted-foreground">No tasks found. Create a task to get started.</p>
      </div>
    );
  }
  
  const renderAssignedUsers = (assignedUsers) => {
    if (!assignedUsers || assignedUsers.length === 0) {
      return 'Unassigned';
    }

    if (assignedUsers.length === 1) {
      return assignedUsers[0].name || 'Unknown user';
    }
    
    return `${assignedUsers[0].name || 'Unknown user'} +${assignedUsers.length - 1} more`;
  };

  return (
    <div className="mt-4 bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-4 py-3 text-sm font-medium text-gray-600">SN</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600">Task Name</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600">Due Date</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600">Assigned To</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600">Created</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600">Updated</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allTasks.map((task, index) => (
              <tr 
                key={task.taskId} 
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
                <td className="px-4 py-3 text-sm font-medium">
                  <div className="flex items-center">
                    <span className={task.taskCompleted ? "line-through text-gray-400" : ""}>
                      {task.taskName}
                    </span>
                    {task.taskCompleted && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        Completed
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {task.taskDueDate ? new Date(task.taskDueDate).toLocaleDateString() : 'No due date'}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {task.columnName}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {renderAssignedUsers(task.taskAssignedTo)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {task.taskCreatedAt ? new Date(task.taskCreatedAt).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {task.taskUpdatedAt ? new Date(task.taskUpdatedAt).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  <button
                    title="Delete"
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={(e) => handleDeleteClick(task.taskId, e)}
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                  <button
                    className="ml-2 text-blue-500 hover:text-blue-700 cursor-pointer"
                    title="Edit"
                    onClick={(e) => handleEditClick(task.taskId, e)}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isTaskModalOpen && selectedTaskId && (
        <TaskDetailsModal 
          taskId={selectedTaskId} 
          onClose={closeTaskModal} 
        />
      )}

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
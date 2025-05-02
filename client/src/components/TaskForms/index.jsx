import { useState } from "react";
import { useCreateTask } from "../../hooks/useTask/createTask/index.js";
import { getUsers } from "../../hooks/users/index.js";
import { useBoardColumns } from "@/hooks/useColumn/getColumns/index.js";
import { TaskDetailsModal } from "../TaskDetailsModal.jsx";

export const CreateTaskForm = ({ columnId, onTaskCreated }) => {
  const { users, isLoadingUsers } = getUsers();
  const { createTask, isCreatingTask } = useCreateTask();
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");

  const boardId = TaskDetailsModal?.boardId;
  const { columnsData, isLoading: isLoadingColumns, refetchColumns } = useBoardColumns(boardId);


  const handleSubmit = async (e) => {
    refetchColumns();
    e.preventDefault();
    setError("");

    const taskData = {
      taskName,
      description,
      dueDate: dueDate || null,
      columnId,
      assignedTo: assignedTo ? [assignedTo] : [],
      completed,
    };


    try {
      await createTask(taskData);
      if (onTaskCreated) onTaskCreated();

      setTaskName("");
      setDescription("");
      setDueDate("");
      setAssignedTo("");
      setCompleted(false);
    } catch (error) {
      console.error("Error creating task:", error);
      setError(error.response?.data?.message || "Failed to create task!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block mb-1">Task Name</label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full rounded"
          required
        ></textarea>
      </div>

      <div>
        <label className="block mb-1">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Assign To</label>
        {isLoadingUsers ? (
          <p>Loading users...</p>
        ) : users && users.length > 0 ? (
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="border p-2 w-full rounded"
          >
            <option value="">Select user</option>
            {users.map((user) => (
              <option
                key={user.id || user.userId}
                value={user.id || user.userId}
              >
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
        ) : (
          <p>No users available</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-blue-600 flex m-auto"
        disabled={isCreatingTask}
      >
        {isCreatingTask ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
};
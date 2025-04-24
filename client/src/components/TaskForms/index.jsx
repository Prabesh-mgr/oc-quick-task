import { getUsers } from '@/hooks/users';
import { useCreateTask } from '@/hooks/useTask/createTask';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

export const CreateTaskForm = ({ onSuccess, initialValues = {} }) => {
  const { createTask, isCreatingTask } = useCreateTask();
  const { boards: users, isLoadingUsers } = getUsers();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      taskName: initialValues.taskName || '',
      description: initialValues.description || '',
      dueDate: initialValues.dueDate || '',
      assignedTo: initialValues.assignedTo || [],
      completed: initialValues.completed || false
    }
  });

  const onSubmit = (data) => {
    createTask(data, {
      onSuccess: () => {
        reset();
        if (onSuccess) onSuccess();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Task Name</label>
        <input
          {...register("taskName", { required: "Task name is required" })}
          className="input w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.taskName && <p className="text-red-500 text-sm mt-1">{errors.taskName.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          {...register("description")}
          className="input w-full px-3 py-2 border border-gray-300 rounded-md h-24"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Due Date</label>
        <input
          type="date"
          {...register("dueDate", { required: "Due date is required" })}
          className="input w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>}
      </div>
      <div>
        <label className="block mb-1 font-medium">Assign To</label>
        <Controller
          control={control}
          name="assignedTo"
          render={({ field }) => (
            <select
              multiple
              className="input w-full px-3 py-2 border border-gray-300 rounded-md"
              {...field}
            >
              {isLoadingUsers ? (
                <option>Loading users...</option>
              ) : (
                users?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))
              )}
            </select>
          )}
        />
        <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple users</p>
      </div>

      <div className="flex items-center">
        <input 
          type="checkbox" 
          id="completed"
          {...register("completed")} 
          className="mr-2"
        />
        <label htmlFor="completed" className="select-none">Completed</label>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button 
          type="button" 
          onClick={() => {
            reset();
            if (onSuccess) onSuccess();
          }}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={isCreatingTask} 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isCreatingTask ? "Creating..." : "Create Task"}
        </button>
      </div>
    </form>
  );
};
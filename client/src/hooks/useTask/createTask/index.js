import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestCreateTask } from './request.js';

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const { mutate: createTask, isLoading: isCreatingTask } = useMutation({
    mutationFn: (taskData) => requestCreateTask(taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Task"] });
    },
  });

  return {
    createTask,
    isCreatingTask,
  };
};

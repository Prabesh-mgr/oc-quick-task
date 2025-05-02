import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestCreateTask } from './request.js';

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { mutate: createTask, isLoading: isCreatingTask } = useMutation({
    mutationFn: (taskData) => requestCreateTask(taskData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["Task"] });
      queryClient.invalidateQueries({ queryKey: ["Tasks"] });
      queryClient.invalidateQueries({ queryKey: ["columns"] });
      queryClient.invalidateQueries({ queryKey: ["Board"] });
      
      if (variables.columnId) {
        queryClient.invalidateQueries({ queryKey: ["Column", variables.columnId] });
      }
    },
  });
  
  return {
    createTask,
    isCreatingTask,
  };
};
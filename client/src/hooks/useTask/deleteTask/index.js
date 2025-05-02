import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestDeleteTask } from "./request";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  
  const { mutate: deleteTask, isLoading: isDeleteTaskLoading } = useMutation({
    mutationFn: requestDeleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["columns"] });
    },
    onError: (error) => {
      console.error("Error deleting task:", error);
    },
  });
  
  return {
    deleteTask,
    isDeleteTaskLoading,
  };
};
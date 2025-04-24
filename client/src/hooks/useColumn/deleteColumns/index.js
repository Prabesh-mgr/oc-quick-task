import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestDeleteColumn } from "./request.js";

export const useDeleteColumn = () => {
  const queryClient = useQueryClient();
  
  const { mutate: deleteColumn, isLoading: isDeleteColumnLoading } = useMutation({
    mutationFn: requestDeleteColumn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["columns"] });
    },
    onError: (error) => {
      console.error("Error deleting column:", error);
    }
  });
  
  return {
    deleteColumn,
    isDeleteColumnLoading,
  };
};

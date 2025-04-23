import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestCreateColumn } from "./request.js";

export const useCreateColumns = () => {
  const queryClient = useQueryClient();
  
  const { mutate: addColumns, isLoading: isColumnLoading, isError: isColumnError } = useMutation({
    mutationFn: (columnData) => requestCreateColumn(columnData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["columns"] });
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
    onError: (error) => {
      console.error("Error creating column:", error);
    }
  });
  
  return {
    addColumns,
    isColumnLoading,
    isColumnError
  };
};
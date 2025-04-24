import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestUpdateColumn } from "./request.js";

export const useEditColumn = () => {
  const queryClient = useQueryClient();
  
  const { mutate: editColumn, isLoading: isEditColumnLoading } = useMutation({
    mutationFn: ({ columnId, columnData }) => requestUpdateColumn(columnId, columnData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["columns"] });
    },
    onError: (error) => {
      console.error("Error updating column:", error);
    }
  });
  
  return {
    editColumn,
    isEditColumnLoading,
  };
};

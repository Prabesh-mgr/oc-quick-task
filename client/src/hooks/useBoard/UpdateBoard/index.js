import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestUpdateBoard } from "./request.js";

export const useUpdateBoard = () => {
  const queryClient = useQueryClient();
  
  const { mutate: addUpdate, isLoading: isUpdateLoading, isError: isUpdateError } = useMutation({
    mutationFn: ({ boardId, data }) => requestUpdateBoard(boardId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    }
  });
  
  return {
    addUpdate,
    isUpdateLoading,
    isUpdateError
  };
};
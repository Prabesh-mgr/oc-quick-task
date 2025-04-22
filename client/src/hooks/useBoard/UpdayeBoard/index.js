import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBoard } from "./request.js";


export const useBoard = () => {
  const queryClient = useQueryClient();
  
  const { mutateAsync: addUpadte, isLoading } = useMutation({
    mutationFn: ({ boardId, data }) => updateBoard(boardId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    }
  });
  
  return {
    addUpadte,
    isLoading,
  };
};
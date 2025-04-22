import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBoardRequest } from "./request.js";

export const useBoard = () => {
  const queryClient = useQueryClient();
  
  const { mutateAsync: createBoard, isLoading: isCreatingBoard } = useMutation({
    mutationFn: (boardData) => createBoardRequest(boardData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] }); 
    },
  });
  
  return {
    createBoard,
    isCreatingBoard,
  };
};
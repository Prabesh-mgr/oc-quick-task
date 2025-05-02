
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"; 
import { createBoardRequest } from "./request.js";

export const createBoards = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createBoard, isLoading: isCreatingBoard } = useMutation({
    mutationFn: (boardData) => createBoardRequest(boardData),
    onSuccess: (newBoard) => {
      console.log("New board created:", newBoard); 
      queryClient.invalidateQueries({ queryKey: ["boards"] });

      if (newBoard?.boardId) {
        navigate(`/home/${newBoard.boardId}`);
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error.response?.data || error.message); // Debugging
    },
  });

  return {
    createBoard,
    isCreatingBoard,
  };
};
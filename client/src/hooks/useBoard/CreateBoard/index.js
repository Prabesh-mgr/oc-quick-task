import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"; 
import { createBoardRequest } from "./request.js";

export const createBoards = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createBoard, isLoading: isCreatingBoard } = useMutation({
    mutationFn: (boardData) => createBoardRequest(boardData),
    onSuccess: (newBoard) => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });

      if (newBoard?.boardId) {
        navigate(`/home/${newBoard.boardId}`);
      }
    },
  });

  return {
    createBoard,
    isCreatingBoard,
  };
};
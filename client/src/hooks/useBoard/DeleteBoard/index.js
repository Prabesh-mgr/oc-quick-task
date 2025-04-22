import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBoard } from "./request.js";

export const useBoard = () => {
  const queryClient = useQueryClient();
  
  const { mutateAsync: deleteBoard, isLoading } = useMutation({
    mutationFn: deleteBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    }
  });
  
  return {
    deleteBoard,
    isLoading,
  };
};
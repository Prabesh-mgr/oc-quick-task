import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestdeleteBoard } from "./request.js";

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  
  const { mutate: deleteBoard, isLoading: isDeleteBookLoading } = useMutation({
    mutationFn: requestdeleteBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    }
  });
  
  return {
    deleteBoard,
    isDeleteBookLoading,
  };
};
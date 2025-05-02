import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBoardsByUserId } from "./request.js";

export const getUserBoards = () => {
    const queryClient = useQueryClient();

    const { data: boards=[], isLoading: isLoadingBoards, error: boardsError, refetch: refetchBoards} = useQuery({
      queryKey: ["boards"],
      queryFn: getBoardsByUserId,
      staleTime: 5 * 60 * 1000,
      onSuccess: (data) => {
        console.log("Boards refetched:", data); 
      },
      
    });

    const refreshBoards = () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    };

    return{
        boards,
        isLoadingBoards,
        boardsError,
        refetchBoards,
        refreshBoards
    }
}
    
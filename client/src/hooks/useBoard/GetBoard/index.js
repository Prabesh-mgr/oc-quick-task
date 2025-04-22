import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBoardsByUserId } from "./request.js";

export const useBoards = () => {
    const queryClient = useQueryClient();

    const { data: boards, isLoading: isLoadingBoards, error: boardsError, refetch: refetchBoards} = useQuery({
      queryKey: ["boards"],
      queryFn: getBoardsByUserId,
    });
    return{
        boards,
        isLoadingBoards,
        boardsError,
        refetchBoards,
    }
}
    
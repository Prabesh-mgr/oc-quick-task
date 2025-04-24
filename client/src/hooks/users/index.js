import { useQuery, useQueryClient } from "@tanstack/react-query";
import { requestUsers } from "./request.js";

export const getUsers = () => {
    const queryClient = useQueryClient();

    const {data:users, isLoading: isLoadingUsers, error: errorsError, refetch: refetchUsers} = useQuery({
      queryKey: ["boards"],
      queryFn: requestUsers,
      staleTime: 5 * 60 * 1000,
    });

    const refereshUserd = () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    };

    return{
        users,
        isLoadingUsers,
        errorsError,
        refetchUsers,
        refereshUserd
    }
}
    
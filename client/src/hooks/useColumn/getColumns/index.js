import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getBoardColumns } from "./request";

export const useBoardColumns  = (boardId) => {
    const queryClient = useQueryClient();

    const { data: columnsData, isLoading: isLoadingColumns,  error: columnsError,  refetch: refetchColumns} = useQuery({
        queryKey: ["columns", boardId],
        queryFn: () => getBoardColumns(boardId),
        enabled: !!boardId,
        onSuccess: (data) => {
            console.log("Columns data fetched successfully:", data);
        },
        onError: (error) => {
            console.error("Error fetching columns data:", error);
        },
    });

    return {
        columnsData,
        isLoadingColumns,
        columnsError,
        refetchColumns,
    };
};

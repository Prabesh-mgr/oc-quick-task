import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getColumnsAndTasks } from "./request";

export const useColumns = (boardId) => {
    const queryClient = useQueryClient();

    const {
        data: columnsData,
        isLoading: isLoadingColumns,
        error: columnsError,
        refetch: refetchColumns
    } = useQuery({
        queryKey: ["columns", boardId],
        queryFn: () => getColumnsAndTasks(boardId),
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

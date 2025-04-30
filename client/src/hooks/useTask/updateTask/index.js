import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestUpdateTask } from "./request";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  const { mutate: updateTask, isLoading: isUpdatingTask } = useMutation({
    mutationFn: ({ taskId, updatedTaskData }) => requestUpdateTask({ taskId, updatedTaskData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Task"] });
    },
  });

  return { updateTask, isUpdatingTask };
};

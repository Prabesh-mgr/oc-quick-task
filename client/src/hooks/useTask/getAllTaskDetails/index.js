import { useQuery } from "@tanstack/react-query";
import { requestTaskDetails } from "./request.js";

export const getTaskDetails = (taskId) => {
  const { data: taskDetails, isLoading, isError: isErrorTask } = useQuery({
    queryKey: ["Task", taskId],
    queryFn: () => requestTaskDetails(taskId),
  });

  return {
    taskDetails,
    isLoadingTaskDetails: isLoading,
    isErrorTask
  };
};

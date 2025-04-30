import { axiosConfig } from "@/config/axiosConfig";

export const requestUpdateTask = async ({ taskId, updatedTaskData }) => {
  try {
    const response = await axiosConfig.patch(`/board/column/task/${taskId}`, updatedTaskData);
    return response.data;
  } catch (error) {
    console.error("Failed to update task:", error);
    throw error;
  }
};

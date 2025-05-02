import { axiosConfig } from "@/config/axiosConfig";

export const requestDeleteTask = async ({ taskId }) => {
  try {
    const response = await axiosConfig.delete(`/board/column/task/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete task:", error);
    throw error;
  }
};

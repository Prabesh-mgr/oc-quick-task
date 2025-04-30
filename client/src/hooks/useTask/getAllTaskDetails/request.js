import { axiosConfig } from "@/config/axiosConfig";

export const requestTaskDetails = async (taskId) => {
  try {
    const response = await axiosConfig.get(`/board/column/task/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching task details:", error);
    throw error;
  }
};

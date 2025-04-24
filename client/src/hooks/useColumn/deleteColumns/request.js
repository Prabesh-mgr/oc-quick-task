import { axiosConfig } from "@/config/axiosConfig";

export const requestDeleteColumn = async (columnId) => {
  try {
    const response = await axiosConfig.delete(`/board/column/${columnId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete column:", error);
    throw error;
  }
};

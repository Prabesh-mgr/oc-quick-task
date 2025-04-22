import { axiosConfig } from "@/config/axiosConfig.js";

export const deleteBoard = async (boardId) => {
    try {
      const response = await axiosConfig.delete(`/board/${boardId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting board:", error);
      throw error;
    }
  };
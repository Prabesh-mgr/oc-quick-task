import { axiosConfig } from "@/config/axiosConfig.js";

export const getBoardColumns = async (boardId) => {
    try {
      const response = await axiosConfig.get(`/board/column/${boardId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching columns and tasks:", error);
      throw error;
    }
  };
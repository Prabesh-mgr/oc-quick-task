import { axiosConfig } from "@/config/axiosConfig.js";

export const requestUpdateBoard = async (boardId, boardData) => {
    try {
      const response = await axiosConfig.patch(`/board/${boardId}`, boardData);
      return response.data;
    } catch (error) {
      console.error("Error updating board:", error);
      throw error;
    }
  };
import { axiosConfig } from "@/config/axiosConfig.js";

export const getBoardsByUserId = async () => {
    try {
      const response = await axiosConfig.get("/user/boards");
      return response.data;
    } catch (error) {
      console.error("Error fetching boards:", error);
      throw error;
    }
  };
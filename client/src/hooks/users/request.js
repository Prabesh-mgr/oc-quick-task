import { axiosConfig } from "@/config/axiosConfig.js";

export const requestUsers = async () => {
    try {
      const response = await axiosConfig.get("/users");
      return response.data
    } catch (error) {
      console.error("Error fetching boards:", error);
      throw error;
    }
  };
import { axiosConfig } from "../../config/axiosConfig.js";

export const requestUserData = async (userId) => {
  try {
    const response = await axiosConfig.get(`/userData/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}
import { axiosConfig } from "../../config/axiosConfig.js";

export const requestUserData = async (user_id) => {
  try {
    const response = await axiosConfig.get(`/userData/${user_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}
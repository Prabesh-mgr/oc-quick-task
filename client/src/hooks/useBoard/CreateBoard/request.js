import { axiosConfig } from "../../../config/axiosConfig.js";

export const createBoardRequest = async (boardData) => {
  try {
    console.log("Sending board data:", boardData); 
    const response = await axiosConfig.post("/board", boardData);
    console.log("Board created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating board:", error.response?.data || error.message);
    throw error;
  }
};

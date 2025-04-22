import { axiosConfig } from "../../../config/axiosConfig.js";

export const createBoardRequest = async (boardData) => {
  try {
    console.log("board data is ", boardData)
    const response = await axiosConfig.post("/board", boardData);
    return response.data;
  } catch (error) {
    console.error("Error creating board:", error);
    throw error;
  }
};

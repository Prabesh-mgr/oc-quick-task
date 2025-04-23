import { axiosConfig } from "@/config/axiosConfig";

export const requestCreateColumn = async (columnData) => {
  try {
    if (!columnData.boardId) {
      throw new Error("Board ID is required");
    }

    const response = await axiosConfig.post("/board/column", columnData);
    return response.data;
  } catch (error) {
    console.error("Failed to create column:", error);
 
    const message =
      error.response?.data?.message || "Failed to create column";
    throw new Error(message);
  }
};

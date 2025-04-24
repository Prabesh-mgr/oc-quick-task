import { axiosConfig } from "@/config/axiosConfig";

export const requestUpdateColumn = async (columnId, columnData) => {
  try {
    const response = await axiosConfig.patch(`/board/column/${columnId}`, columnData);
    return response.data;
  } catch (error) {
    console.error("Failed to update column:", error);
    throw error;
  }
};

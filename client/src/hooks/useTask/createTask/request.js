import { axiosConfig } from "@/config/axiosConfig";

export const requestCreateTask = async (taskData) => {
  const response = await axiosConfig.post('/board/column/task', taskData);
  return response.data;
};

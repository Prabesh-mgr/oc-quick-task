import { axiosConfig } from '../../../config/axiosConfig.js';

export const requestUpdateTaskColumn = async ({ taskId, columnId, boardId }) => {
  const response = await axiosConfig.patch(`/board/task/${taskId}/column`, { 
    columnId, 
    boardId 
  });
  return response.data;
};
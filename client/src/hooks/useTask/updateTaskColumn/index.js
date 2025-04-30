import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestUpdateTaskColumn } from './request';

export const useUpdateTaskColumn = () => {
  const queryClient = useQueryClient();

  const { mutate: updateTaskColumn, isLoading: isUpdatingTaskColumn } = useMutation({
    mutationFn: (data) => requestUpdateTaskColumn(data),
    onSuccess: () => {
   
      queryClient.invalidateQueries({ queryKey: ['columns'] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return { updateTaskColumn, isUpdatingTaskColumn };
};
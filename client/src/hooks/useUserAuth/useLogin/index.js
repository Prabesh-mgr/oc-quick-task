import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { requestLogin } from './response';
import Cookies from 'js-cookie';

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  const { mutate: loginUser, isLoading: isUserLoginLoading } = useMutation({
    mutationFn: requestLogin,
    onSuccess: (response) => {
      Cookies.set('token', response.token, { path: '/' });
      Cookies.set('user', JSON.stringify(response.user), { path: '/' });

      console.log("User data from API:", response.user);

      queryClient.invalidateQueries(['Users']);
      toast.success('Login Successful!');
    },
    onError: (error) => {
      console.error('Failed to login:', error);
      if (error.response?.status === 401) {
        toast.error('Invalid email or password');
      } else if (error.response?.status === 404) {
        toast.error('Login endpoint not found. Please check your API URL.');
      } else {
        toast.error(error.message || 'Login failed');
      }
    }
  });

  return {
    loginUser,
    isUserLoginLoading
  };
};

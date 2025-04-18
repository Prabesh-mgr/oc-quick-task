import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { requestLogin } from './response';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; 

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate(); 

  const { mutate: loginUser, isLoading: isUserLoginLoading } = useMutation({
    mutationFn: requestLogin,
    onSuccess: (response) => {
      Cookies.set('token', response.token, { path: '/' });
      Cookies.set('user', JSON.stringify(response.user), { path: '/' });
      queryClient.invalidateQueries(['Users']);
      
      navigate('/home'); 
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
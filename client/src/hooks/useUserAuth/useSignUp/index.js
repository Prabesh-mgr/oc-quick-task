import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { requestSignUp } from './request';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const userSignUpUser = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
   
    const { mutate: addUsers, isLoading: isUserLoading } = useMutation({
        mutationFn: requestSignUp,
        onSuccess: (response) => {
            queryClient.invalidateQueries(['Users']);
        
            const { token, user } = response;
        
            if (token) {
                Cookies.set('token', token, { path: '/' });
        
                if (user) {
                    Cookies.set('user', JSON.stringify(user), { path: '/' });
                }
                toast.success('User signup successful!');
                navigate('/login')
            } else {
                console.error('No token in response:', response);
                toast.warning('Account created but login failed. Please log in manually.');
                navigate('/login');
            }
        },        
        onError: (error) => {
            console.error('Error adding User:', error);
            console.error('Error details:', error.response?.data || error.message);
           
            if (error.response?.status === 409) {
                toast.error('Email already exists. Please use a different email.');
            } else if (error.response?.status === 400) {
                toast.error('Invalid information provided. Please check your details.');
            } else {
                toast.error('Something went wrong. Please try again later.');
            }
        }
    });
   
    return {
        addUsers,
        isUserLoading
    };
};
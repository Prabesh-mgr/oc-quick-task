import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { requestSignUp } from './request';

export const userSignUpUser = () => {
    const queryClient = useQueryClient();
    const { mutate: addUsers, isLoading: isUserLoading } = useMutation({
        mutationFn: requestSignUp,
        onSuccess: () => {
            queryClient.invalidateQueries(['Users'])
            toast.success('User signup Sucessfully!')
        },
        onError: (error) => {
            console.error('Error adding User:', error)
            toast.error('Somthing went wrong, Please enter all fields')
        }
    })
    return {
        addUsers,
        isUserLoading
    }
};

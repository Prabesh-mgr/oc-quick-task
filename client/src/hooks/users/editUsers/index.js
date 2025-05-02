import {requestEditUsers} from "./request.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditUser = () => {
    const queryClient = useQueryClient();
    const { mutate: editUser, isLoading: isEditingUser } = useMutation({
        mutationFn: (userData) => requestEditUsers(userData),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error) => {
        console.error("Error editing user:", error);
        },
    });
    
    return {
        editUser,
        isEditingUser,
    };
}
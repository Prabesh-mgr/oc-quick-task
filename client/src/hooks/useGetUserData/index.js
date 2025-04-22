import {requestUserData} from "./request.js";
import {useQuery} from "@tanstack/react-query";

export const getUserData = (userId) => {
    const {data: userData, isLoading: isUserLoading} = useQuery({
        queryKey: ['userData', userId],
        queryFn: () => requestUserData(userId),
        enabled: !!userId,
    })
    return {
        userData,
        isUserLoading
    }
}
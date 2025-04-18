import {requestUserData} from "./response.js";
import {useQuery} from "@tanstack/react-query";

export const getUserData = (user_id) => {
    const {data: userData, isLoading: isUserLoading} = useQuery({
        queryKey: ['userData', user_id],
        queryFn: () => requestUserData(user_id),
        enabled: !!user_id,
    })
    return {
        userData,
        isUserLoading
    }
}
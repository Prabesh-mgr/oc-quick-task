import { axiosConfig } from "@/config/axiosConfig";

export const requestEditUsers = async ({ userId, data }) => {
    try {
        const response = await axiosConfig.patch(`/users/${userId}`, data);
        return response.data;
    } catch (error) {
        console.error("Error editing user:", error);
        throw error;
    }
}
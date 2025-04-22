import { axiosConfig } from "../../../config/axiosConfig.js";

export const requestSignUp = async (userData) => {
  try {
    const res = await axiosConfig.post('/signup', userData, {
      withCredentials: true,  
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Signup request failed" };
  }
};

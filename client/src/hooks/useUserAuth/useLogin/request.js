import { axiosConfig } from "../../../config/axiosConfig.js";
import Cookies from 'js-cookie';

export const requestLogin = async (userData) => {
        const res = await axiosConfig.post('/login', userData);

        if (!res.data.token) {
            return { error: 'Token missing in response' };
        }

        Cookies.set('token', res.data.token, { expires: 1 });
        return res.data;
 
};


import axios from 'axios';
import Cookies from 'js-cookie'; 

export const axiosConfig = axios.create({
    baseURL: "http://localhost:3000/",
});

axiosConfig.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token'); 
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axiosConfig.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Session expired. Logging out...");
            Cookies.remove('token');
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

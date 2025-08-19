import axiosInstance from './axiosInstance';
import { triggerToast } from '../screens/toasters/ToastService';
import store from '../redux/store';
import { clearAuthData } from '../redux/slices/authSlice';

export const apiCalling = async ({
    url,
    method = 'GET',
    headers = {},
    body = null,
    queryParams = {},
}) => {
    try {

        const config = { method, url, headers, params: queryParams };

        if (body) {
            if (headers['Content-Type'] === 'application/json') {
                config.data = JSON.stringify(body);
            } else if (headers['Content-Type'] === 'multipart/form-data') {
                const formData = new FormData();
                for (const key in body) {
                    formData.append(key, body[key]);
                }
                config.data = formData;
                delete headers['Content-Type'];
            } else {
                config.data = body;
            }
        }

        const response = await axiosInstance(config);
        return response.data;


    } catch (error) {
        if (error.response?.status === 401) {
            triggerToast('Session expired. Please log in again.');
            store.dispatch(clearAuthData()); // remove token & user
            setTimeout(() => {
                window.location.href = '/'; // redirect to login
            }, 1500);
        }
        throw error.response?.data || error;
    }
};

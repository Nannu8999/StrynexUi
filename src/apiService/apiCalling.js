import axiosInstance from './axiosInstance';

export const apiCalling = async ({
    url,
    method = 'GET',
    headers = {},
    body = null,
    queryParams = {},
}) => {
    try {
        const config = {
            method,
            url,
            headers,
            params: queryParams
        };

        // Handle different content types
        if (body) {
            if (headers['Content-Type'] === 'application/json') {
                config.data = JSON.stringify(body);
            } else if (headers['Content-Type'] === 'multipart/form-data') {
                const formData = new FormData();
                for (const key in body) {
                    formData.append(key, body[key]);
                }
                config.data = formData;
                delete headers['Content-Type']; // browser will set it with boundary
            } else {
                config.data = body;
            }
        }

        const response = await axiosInstance(config);
        return response.data;

    } catch (error) {
        // Optional: you can add toast or logging here
        throw error.response?.data || error;
    }
};

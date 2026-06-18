import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
});

api.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem("token");
        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default api;

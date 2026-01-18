import axios from 'axios';

const API_URL = import.meta.env.MODE === 'development' 
    ? 'http://localhost:5000/api' 
    : 'https://devraghunandan.onrender.com/api';

// Create Axios instance
// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Interceptor to add JWT token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
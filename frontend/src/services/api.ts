import axios, { InternalAxiosRequestConfig } from 'axios';
import { useAppStore } from '@/store/app';

const api = axios.create({
    baseURL: 'http://127.0.0.1:3000/',
    timeout: 10000,
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const authStore = useAppStore();
        config.headers['Authorization'] = `Bearer ${authStore.accessToken}`;
        return config;
    }
);

export default api;

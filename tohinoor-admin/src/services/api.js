import axios from 'axios';

const api = axios.create({
    baseURL:
        import.meta.env.VITE_API_BASE_URL ||
        'https://api.tohinoor.ir/api', // تغییر آدرس پیش‌فرض به هاست آنلاین

    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('tohinoor_token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // برای ارسال فایل، اجازه می‌دهیم مرورگر Content-Type و boundary را خودش تنظیم کند.
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }

        return config;
    },
    (error) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
);

export default api;
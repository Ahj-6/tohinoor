// import axios from 'axios';

// const api = axios.create({
//     baseURL:
//         import.meta.env.VITE_API_BASE_URL ||
//         'http://localhost:8000/api',

//     headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//     },
// });

/*
|--------------------------------------------------------------------------
| Attach Sanctum Token
|--------------------------------------------------------------------------
*/
// api.interceptors.request.use(
//     (config) => {
//         const token = sessionStorage.getItem('tohinoor_token');

//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }

//         return config;
//     },
//     (error) => Promise.reject(error),
// );

/*
|--------------------------------------------------------------------------
| Response
|--------------------------------------------------------------------------
*/

// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
        /*
         * عمداً اینجا session را پاک نمی‌کنیم.
         *
         * تصمیم درباره Logout / 401 باید در AuthContext
         * یا خود صفحه‌ای که Request را انجام داده گرفته شود.
         */

//         return Promise.reject(error);
//     },
// );

// export default api;




import axios from 'axios';

const api = axios.create({
    baseURL:
        import.meta.env.VITE_API_BASE_URL ||
        'http://localhost:8000/api',

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

        // برای ارسال فایل، اجازه می‌دهیم مرورگر
        // Content-Type و boundary را خودش تنظیم کند.
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
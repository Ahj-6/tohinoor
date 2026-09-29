import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/tohinoor/tohinoor-api/public/api",
  // baseURL:
  //   import.meta.env.VITE_API_BASE_URL ||
  //   "https://api.tohinoor.ir/api", // تغییر از localhost به آدرس آنلاین
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;

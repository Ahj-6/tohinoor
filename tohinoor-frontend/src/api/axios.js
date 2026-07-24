import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost/tohinoor/tohinoor-api/public/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default api;
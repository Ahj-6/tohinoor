import api from "../api/axios";

export const getElements = async () => {
    const response = await api.get("/elements");
    return response.data;
};
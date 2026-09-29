import api from "./api.js";

export async function getUsers() {
    const response = await api.get("/users");
    return response.data.data;
}

export async function getUser(id) {
    const response = await api.get(`/users/${id}`);
    return response.data.data;
}

export async function createUser(payload) {
    const response = await api.post("/users", payload);
    return response.data.data;
}

export async function updateUser(id, payload) {
    const response = await api.put(`/users/${id}`, payload);
    return response.data.data;
}

export async function deleteUser(id) {
    const response = await api.delete(`/users/${id}`);
    return response.data;
}
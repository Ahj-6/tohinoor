import api from './api.js';

export async function getCities() {
    const response = await api.get('/cities');
    return response.data.data;
}

export async function createCity(payload) {
    const response = await api.post('/cities', payload);
    return response.data.data;
}

export async function updateCity(id, payload) {
    const response = await api.put(`/cities/${id}`, payload);
    return response.data.data;
}

export async function deleteCity(id) {
    const response = await api.delete(`/cities/${id}`);
    return response.data;
}
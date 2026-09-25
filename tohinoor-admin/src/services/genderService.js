import api from './api.js';

export async function getGenders() {
    const response = await api.get('/genders');
    return response.data.data;
}

export async function createGender(payload) {
    const response = await api.post('/genders', payload);
    return response.data.data;
}

export async function updateGender(id, payload) {
    const response = await api.put(`/genders/${id}`, payload);
    return response.data.data;
}

export async function deleteGender(id) {
    const response = await api.delete(`/genders/${id}`);
    return response.data;
}
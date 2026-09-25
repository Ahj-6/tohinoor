import api from './api.js';

export async function getNatures() {
    const response = await api.get('/natures');
    return response.data.data;
}

export async function createNature(payload) {
    const response = await api.post('/natures', payload);
    return response.data.data;
}

export async function updateNature(id, payload) {
    const response = await api.put(`/natures/${id}`, payload);
    return response.data.data;
}

export async function deleteNature(id) {
    const response = await api.delete(`/natures/${id}`);
    return response.data;
}
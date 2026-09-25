import api from './api.js';

export async function getGunas() {
    const response = await api.get('/gunas');
    return response.data.data;
}

export async function createGuna(payload) {
    const response = await api.post('/gunas', payload);
    return response.data.data;
}

export async function updateGuna(id, payload) {
    const response = await api.put(`/gunas/${id}`, payload);
    return response.data.data;
}

export async function deleteGuna(id) {
    const response = await api.delete(`/gunas/${id}`);
    return response.data;
}
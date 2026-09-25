import api from './api.js';

export async function getQualities() {
    const response = await api.get('/qualities');
    return response.data.data;
}

export async function createQuality(payload) {
    const response = await api.post('/qualities', payload);
    return response.data.data;
}

export async function updateQuality(id, payload) {
    const response = await api.put(`/qualities/${id}`, payload);
    return response.data.data;
}

export async function deleteQuality(id) {
    const response = await api.delete(`/qualities/${id}`);
    return response.data;
}
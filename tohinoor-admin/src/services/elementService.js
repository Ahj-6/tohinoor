import api from './api.js';

export async function getElements() {
    const response = await api.get('/elements');
    return response.data.data;
}

export async function createElement(payload) {
    const response = await api.post('/elements', payload);
    return response.data.data;
}

export async function updateElement(id, payload) {
    const response = await api.put(`/elements/${id}`, payload);
    return response.data.data;
}

export async function deleteElement(id) {
    const response = await api.delete(`/elements/${id}`);
    return response.data;
}
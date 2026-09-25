import api from './api.js';

export async function getBirthAccuracies() {
    const response = await api.get('/birth-accuracies');
    return response.data.data;
}

export async function createBirthAccuracy(payload) {
    const response = await api.post('/birth-accuracies', payload);
    return response.data.data;
}

export async function updateBirthAccuracy(id, payload) {
    const response = await api.put(`/birth-accuracies/${id}`, payload);
    return response.data.data;
}

export async function deleteBirthAccuracy(id) {
    const response = await api.delete(`/birth-accuracies/${id}`);
    return response.data;
}
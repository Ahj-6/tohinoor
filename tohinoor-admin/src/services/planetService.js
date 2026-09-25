import api from './api.js';

export async function getPlanets() {
    const response = await api.get('/planets');
    return response.data.data;
}

export async function createPlanet(payload) {
    const response = await api.post('/planets', payload);
    return response.data.data;
}

export async function updatePlanet(id, payload) {
    const response = await api.put(`/planets/${id}`, payload);
    return response.data.data;
}

export async function deletePlanet(id) {
    const response = await api.delete(`/planets/${id}`);
    return response.data;
}
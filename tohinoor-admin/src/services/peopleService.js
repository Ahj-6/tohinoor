import api from './api.js';

export async function getPeople() {
    const response = await api.get('/people');
    return response.data.data;
}

export async function createPerson(payload) {
    const response = await api.post('/people', payload);
    return response.data.data;
}

export async function updatePerson(id, payload) {
    const response = await api.put(`/people/${id}`, payload);
    return response.data.data;
}

export async function deletePerson(id) {
    const response = await api.delete(`/people/${id}`);
    return response.data;
}
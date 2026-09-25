import api from './api.js';

export async function getCountries() {
    const response = await api.get('/countries');
    return response.data.data;
}

export async function createCountry(payload) {
    const response = await api.post('/countries', payload);
    return response.data.data;
}

export async function updateCountry(id, payload) {
    const response = await api.put(`/countries/${id}`, payload);
    return response.data.data;
}

export async function deleteCountry(id) {
    const response = await api.delete(`/countries/${id}`);
    return response.data;
}
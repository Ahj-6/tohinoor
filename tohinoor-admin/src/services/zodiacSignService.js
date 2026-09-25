import api from './api.js';

export async function getZodiacSigns() {
    const response = await api.get('/zodiac-signs');
    return response.data.data;
}

export async function createZodiacSign(payload) {
    const response = await api.post('/zodiac-signs', payload);
    return response.data.data;
}

export async function updateZodiacSign(id, payload) {
    const response = await api.put(`/zodiac-signs/${id}`, payload);
    return response.data.data;
}

export async function deleteZodiacSign(id) {
    const response = await api.delete(`/zodiac-signs/${id}`);
    return response.data;
}
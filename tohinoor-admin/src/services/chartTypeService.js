import api from './api.js';

export async function getChartTypes() {
    const response = await api.get('/chart-types');
    return response.data.data;
}

export async function createChartType(payload) {
    const response = await api.post('/chart-types', payload);
    return response.data.data;
}

export async function updateChartType(id, payload) {
    const response = await api.put(`/chart-types/${id}`, payload);
    return response.data.data;
}

export async function deleteChartType(id) {
    const response = await api.delete(`/chart-types/${id}`);
    return response.data;
}
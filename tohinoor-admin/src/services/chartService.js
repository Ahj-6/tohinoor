import api from './api.js';

export async function getCharts() {
    const response = await api.get('/charts');

    return response.data.data;
}

export async function getChart(id) {
    const response = await api.get(`/charts/${id}`);

    return response.data.data;
}

export async function getPersonCharts(personId) {
    const response = await api.get('/charts');

    return response.data.data.filter(
        (chart) => Number(chart.person_id) === Number(personId),
    );
}

export async function createChart({ personId, chartTypeId, image }) {
    const formData = new FormData();

    formData.append('person_id', personId);
    formData.append('chart_type_id', chartTypeId);
    formData.append('image', image);

    const response = await api.post('/charts', formData);

    return response.data.data;
}

export async function updateChart({
    id,
    personId,
    chartTypeId,
    image,
}) {
    const formData = new FormData();

    formData.append('person_id', personId);
    formData.append('chart_type_id', chartTypeId);

    if (image) {
        formData.append('image', image);
    }

    // Laravel + multipart/form-data برای PUT
    formData.append('_method', 'PUT');

    const response = await api.post(`/charts/${id}`, formData);

    return response.data.data;
}

export async function deleteChart(id) {
    const response = await api.delete(`/charts/${id}`);

    return response.data;
}
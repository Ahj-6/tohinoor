import api from "./api.js";

export async function getAdminPeople() {
  const response = await api.get("/admin/people");
  return response.data.data;
}

export async function getAdminPerson(id) {
  const response = await api.get(`/admin/people/${id}`);
  return response.data.data;
}

export async function getAdminPersonBySlug(slug) {
  const response = await api.get(
    `/admin/people/${encodeURIComponent(slug)}`
  );
  return response.data.data;
}

export async function createAdminPerson(payload) {
  const response = await api.post("/admin/people", payload);
  return response.data.data;
}

export async function updateAdminPerson(id, payload) {
  const response = await api.post(`/admin/people/${id}`, payload);
  return response.data.data;
}

export async function deleteAdminPerson(id) {
  const response = await api.delete(`/admin/people/${id}`);
  return response.data;
}
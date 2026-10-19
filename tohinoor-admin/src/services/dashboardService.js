import api from "./api.js";

export async function getDashboardStats() {
  const response = await api.get("/dashboard/stats");

  return response.data.data;
}


export async function getSitePageViewStats() {
  const response = await api.get("/admin/site-page-views/stats");

  return response.data.data;
}

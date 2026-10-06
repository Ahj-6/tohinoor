import api from "./api.js";

export async function getDashboardStats() {
  const response = await api.get("/dashboard/stats");

  return response.data.data;
}
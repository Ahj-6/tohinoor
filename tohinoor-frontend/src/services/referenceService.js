import api from "../api/axios";

export const getCountries = async () => {
  const response = await api.get("/countries");
  return response.data;
};

export const getCities = async () => {
  const response = await api.get("/cities");
  return response.data;
};

export const getBirthAccuracies = async () => {
  const response = await api.get("/birth-accuracies");
  return response.data;
};
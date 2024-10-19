import axios from "axios";
import { BASE_URL } from "./constants";

export const setAuthCredentials = (username, password) => {
  const credentials = btoa(`${username}:${password}`);
  localStorage.setItem("authHeader", credentials);
};

const getStoredAuthHeader = () => localStorage.getItem("authHeader") || "";

const api = axios.create({
  baseURL: `${BASE_URL}/api/users`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const storedAuthHeader = getStoredAuthHeader();
  if (storedAuthHeader) {
    config.headers.Authorization = `Basic ${storedAuthHeader}`;
  }
  return config;
});

export const clearAuthCredentials = () => {
  localStorage.removeItem("authHeader");
};

export default api;

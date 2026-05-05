import axios from "axios";

const API = axios.create({
  baseURL: "progetto-saas-8iflhzuzj-rob587s-projects.vercel.app",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

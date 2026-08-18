import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env?.VITE_BACKEND_API_BASE_URL || "http://localhost:3000/api",
  timeout: 90000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default API;

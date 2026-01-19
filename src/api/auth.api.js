import api from "./axios";

export const registerUser = (data) => api.post("/auth/register", data); // NOW maps to /api/v1/auth/register

export const loginUser = (data) => api.post("/auth/login", data); // NOW maps to /api/v1/auth/login

export const refreshToken = (refreshToken) =>
  api.post("/auth/refresh", { refreshToken });

export const logoutUser = (refreshToken) =>
  api.post("/auth/logout", { refreshToken });

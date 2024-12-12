import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export const fetchCVs = async (token) => {
  const response = await axios.get(`${API_URL}/cv`, {
    headers: { "x-auth-token": token },
  });
  return response.data;
};

export const fetchCV = async (id, token) => {
  const response = await axios.get(`${API_URL}/cv/${id}`, {
    headers: { "x-auth-token": token },
  });
  return response.data;
};

export const createCV = async (data, token) => {
  const response = await axios.post(`${API_URL}/cv`, data, {
    headers: { "x-auth-token": token },
  });
  return response.data;
};

export const updateCV = async (id, data, token) => {
  const response = await axios.put(`${API_URL}/cv/${id}`, data, {
    headers: { "x-auth-token": token },
  });
  return response.data;
};

export const deleteCV = async (id, token) => {
  const response = await axios.delete(`${API_URL}/cv/${id}`, {
    headers: { "x-auth-token": token },
  });
  return response.data;
};

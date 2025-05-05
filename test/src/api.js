// src/api.js
import axios from 'axios';

const API_URL = 'http://192.168.160.169:3000'; // Upewnij się że masz poprawne IP!

export const api = axios.create({
  baseURL: API_URL,
});

export const registerUser = async (email, password) => {
  try {
    console.log('Rejestracja - wysyłam dane:', email, password);
    const response = await api.post('/register', { email, password });
    console.log('Rejestracja - odpowiedź serwera:', response.data);
    return response.data;
  } catch (error) {
    console.log('Błąd rejestracji:', error?.response?.data || error.message);
    throw error?.response?.data || "Błąd rejestracji";
  }
};

export const loginUser = async (email, password) => {
  try {
    console.log('Logowanie - wysyłam dane:', email, password);
    const response = await api.post('/login', { email, password });
    console.log('Logowanie - odpowiedź serwera:', response.data);
    return response.data;
  } catch (error) {
    console.log('Błąd logowania:', error?.response?.data || error.message);
    throw error?.response?.data || "Błąd logowania";
  }
};


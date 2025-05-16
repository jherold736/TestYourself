// src/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.160.169:3000'; // Upewnij się że masz poprawne IP!

export const api = axios.create({
  baseURL: API_URL,
});

// PRZECHWYTUJEMY ŻĄDANIA I DODAJEMY TOKEN
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // ⬅️ Dodajemy token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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

export const saveFlashcards = async (flashcards) => {
  try {
    const response = await api.post('/flashcards', { flashcards });
    return response.data;
  } catch (error) {
    console.error('Błąd zapisu fiszek:', error?.response?.data || error.message);
    throw error?.response?.data || "Błąd zapisu fiszek";
  }
};

export const saveFolder = async (name) => {
  try {
    const response = await api.post('/folders', { name });
    return response.data;
  } catch (error) {
    console.error('Błąd zapisu folderu:', error?.response?.data || error.message);
    throw error?.response?.data || "Błąd zapisu folderu";
  }
};

//funkcja do pobrania folderow
export const getFolders = async () => {
  try {
    const response = await api.get('/folders');
    console.log('Pobrano foldery:', response.data);
    return response.data;
  } catch (error) {
    console.error('Błąd pobierania folderów:', error?.response?.data || error.message);
    throw error?.response?.data || "Błąd pobierania folderów";
  }
};

//Korzystamy tu z axiosa, token doda się sam (bo mamy interceptor)
export const getFlashcards = async (folderName) => {
  try {
    const response = await api.get(`/flashcards/${folderName}`);
    return response.data;
  } catch (error) {
    console.error('Błąd pobierania fiszek:', error?.response?.data || error.message);
    throw error?.response?.data || "Błąd pobierania fiszek";
  }
};




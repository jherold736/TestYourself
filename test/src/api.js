// src/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.12.169:3000'; // Upewnij się że masz poprawne IP!

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

export const deleteFlashcard = async (id) => {
  try {
    const response = await api.delete(`/flashcards/${id}`);
    return response.data;
  } catch (error) {
    console.error('Błąd usuwania fiszki:', error?.response?.data || error.message);
    throw error?.response?.data || "Błąd usuwania fiszki";
  }
};

export const deleteFolder = async (folderId) => {
  try {
    const response = await api.delete(`/folders/${folderId}`);
    return response.data;
  } catch (error) {
    console.error('Błąd usuwania folderu:', error?.response?.data || error.message);
    throw error;
  }
};

export const updateFlashcard = async (id, front, back) => {
  try {
    const response = await api.put(`/flashcards/${id}`, { front, back });
    return response.data;
  } catch (error) {
    console.error('Błąd aktualizacji fiszki:', error?.response?.data || error.message);
    throw error?.response?.data || 'Błąd aktualizacji fiszki';
  }
};

//funkcja change password
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await api.put('/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Błąd zmiany hasła:', error?.response?.data || error.message);
    throw error?.response?.data?.message || "Błąd zmiany hasła";
  }
};


export const updateStats = async (date, count, isCorrect) => {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(`${API_URL}/stats/update`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ date, count, isCorrect })
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};


export const getStats = async () => {
  const token = await AsyncStorage.getItem('token');
  const res = await fetch(`${API_URL}/stats/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  const today = new Date().toISOString().split('T')[0];
  const todayReps = data.repetitionsByDate?.[today] || 0;

  return {
    total: data.totalRepetitions || 0,
    today: todayReps,
    correct: data.correctAnswers || 0
  };
};


//API tlumaczeniowe

export const translateText = async (text, direction = 'pl|en') => {
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${direction}`
    );
    const data = await response.json();
    console.log('Odpowiedź z API:', data); // LOG 3: Cała odpowiedź z serwera
    return data.responseData.translatedText || '';
  } catch (err) {
    console.error('Błąd tłumaczenia:', err);
    return '';
  }
};

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UserAccountScreen = ({ navigation }) => {
  const email = 'uzytkownik@mail.com'; // 🔁 Zmień na dynamiczne dane, jeśli chcesz

  const handleLogout = () => {
    // Tu dodasz wylogowywanie (np. usunięcie tokena)
    console.log('Wyloguj użytkownika');
  };

  const handleChangePassword = () => {
    // Tu możesz dodać logikę zmiany hasła
    console.log('Przekieruj do zmiany hasła');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil użytkownika</Text>

      <View style={styles.avatarContainer}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person-circle" size={120} color="#000" />
        </View>


        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Wyloguj się</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>{email}</Text>
        <TouchableOpacity style={styles.passwordButton} onPress={handleChangePassword}>
          <Text style={styles.passwordButtonText}>Zmień hasło</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDBF4C', //  Kolor z aplikacji
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000',
    marginBottom: 30,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  avatarText: {
    color: '#000',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#000',
  },
  passwordButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#000',
    borderRadius: 20,
  },
  passwordButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default UserAccountScreen;



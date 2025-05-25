import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Modal, TextInput, Alert } from 'react-native';
import { changePassword } from '../api';

const UserAccountScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');


  useEffect(() => {
    const fetchEmail = async () => {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      if (storedEmail) {
        setEmail(storedEmail);
      }
    };

    fetchEmail();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      console.log('Użytkownik wylogowany');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    } catch (err) {
      console.error('Błąd wylogowania:', err);
    }
  };

  //wczesniej, moze zle miejsce
  //const [modalVisible, setModalVisible] = useState(false);
  //const [currentPassword, setCurrentPassword] = useState('');
  //const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = async () => {
    try {
      await changePassword(currentPassword, newPassword);
      Alert.alert('Sukces', 'Hasło zostało zmienione');
      setModalVisible(false);
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      Alert.alert('Błąd', err.message || 'Cos poszlo nie tak');
    }
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
        <TouchableOpacity style={styles.passwordButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.passwordButtonText}>Zmień hasło</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
              position: 'absolute',
              top: 10,
              right: 10,
              padding: 5,
              zIndex: 1,
            }}
          >
            <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          <Text style={styles.modalTitle}>Zmień hasło</Text>

            <TextInput
              placeholder="Obecne hasło"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
              style={styles.input}
            />
            <TextInput
              placeholder="Nowe hasło"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              style={styles.input}
            />

            <TouchableOpacity
              onPress={handleChangePassword}
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>Zapisz</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDBF4C', 
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
  modalBackground: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default UserAccountScreen;



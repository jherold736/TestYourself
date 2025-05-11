import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Alert
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const FoldersZoneScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const [folders, setFolders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  // 📥 ODBIÓR FISZEK Z Creation Zone
  const incomingFlashcards = route.params?.flashcards || [];

  // 📦 Pokazujemy modal tylko jeśli mamy fiszki do zapisania
  useEffect(() => {
    if (incomingFlashcards.length > 0) {
      setModalVisible(true);
    }
  }, [incomingFlashcards]);

  // ➕ DODAJEMY FOLDER Z FISZKAMI (jeśli istnieją)
  const addFolder = () => {
    if (newFolderName.trim() !== '') {
      const newFolder = {
        id: Date.now(),
        name: newFolderName,
        flashcards: incomingFlashcards, // 📎 zapisujemy fiszki!
      };
      setFolders([...folders, newFolder]);
      setNewFolderName('');
      setModalVisible(false);
      Alert.alert('Dodano folder', `Fiszki zostały przypisane do folderu "${newFolderName}".`);
    }
  };

  // ❌ USUŃ FOLDER
  const deleteFolder = (id) => {
    setFolders(folders.filter((folder) => folder.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.grid, { paddingTop: insets.top + 10 }]}>
        {/* 📁 Renderowanie folderów */}
        {folders.map((folder) => (
          <View key={folder.id} style={styles.folderContainer}>
            <TouchableOpacity
              style={styles.folder}
              onPress={() =>
                navigation.navigate('Folder Details', {
                  folderName: folder.name,        // 👉 Przekazujemy nazwę
                  flashcards: folder.flashcards || [], // 👉 Przekazujemy fiszki
                })
              }
            >
              <Ionicons name="folder" size={40} color="#000" />
              <Text style={styles.folderName}>{folder.name}</Text>
            </TouchableOpacity>

            {/* 🗑 Przycisk usuwania */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteFolder(folder.id)}
            >
              <Ionicons name="trash" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ))}

        {/* ➕ Przycisk dodania folderu manualnie */}
        <TouchableOpacity style={styles.addFolder} onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle" size={50} color="#000" />
          <Text style={styles.addText}>Dodaj folder</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 📋 MODAL do dodania nowego folderu */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Nazwa folderu:</Text>
            <TextInput
              style={styles.input}
              placeholder="Wpisz nazwę..."
              value={newFolderName}
              onChangeText={setNewFolderName}
            />
            <TouchableOpacity style={styles.saveButton} onPress={addFolder}>
              <Text style={styles.saveButtonText}>Dodaj</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDBF4C' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 100,
  },
  folderContainer: {
    width: '40%',
    margin: 10,
    position: 'relative',
  },
  folder: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  folderName: {
    marginTop: 10,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 2,
  },
  addFolder: {
    width: '40%',
    backgroundColor: '#fff',
    margin: 10,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  addText: {
    marginTop: 10,
    fontWeight: '600',
    color: '#000',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
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

export default FoldersZoneScreen;


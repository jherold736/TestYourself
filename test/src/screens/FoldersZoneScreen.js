import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FoldersZoneScreen = () => {
  const [folders, setFolders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  // ➡️ Funkcja dodająca nowy folder
  const addFolder = () => {
    if (newFolderName.trim() !== '') {
      setFolders([...folders, { id: Date.now(), name: newFolderName }]);
      setNewFolderName('');
      setModalVisible(false);
    }
  };

  // ➡️ Funkcja usuwająca folder
  const deleteFolder = (id) => {
    setFolders(folders.filter((folder) => folder.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.grid}>
        {/* ➡️ Renderowanie folderów */}
        {folders.map((folder) => (
          <View key={folder.id} style={styles.folderContainer}>
            <TouchableOpacity style={styles.folder}>
              <Ionicons name="folder" size={40} color="#000" />
              <Text style={styles.folderName}>{folder.name}</Text>
            </TouchableOpacity>

            {/* ➡️ Przycisk kosza do usuwania folderu */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteFolder(folder.id)}
            >
              <Ionicons name="trash" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ))}

        {/* ➡️ Przycisk dodania nowego folderu */}
        <TouchableOpacity style={styles.addFolder} onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle" size={50} color="#000" />
          <Text style={styles.addText}>Dodaj folder</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ➡️ Modal do wpisania nowej nazwy folderu */}
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
  container: {
    flex: 1,
    backgroundColor: '#FDBF4C',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 20,    //  dodane nowe!
    paddingBottom: 100,
  },
  folderContainer: {
    width: '40%',
    margin: 10,
    position: 'relative', //  Dzięki temu kosz jest absolutnie ustawiony!
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
    zIndex: 10,
  },
  addFolder: {
    width: '40%',
    backgroundColor: '#fff',
    margin: 10,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    marginTop: 10,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
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



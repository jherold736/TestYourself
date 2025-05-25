import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet
} from 'react-native';
import { getFolders } from '../api'; // chyba mam

const ProgressZoneScreen = ({ navigation }) => {
  const [folders, setFolders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const fetched = await getFolders();
        setFolders(fetched);
      } catch (err) {
        console.error('Błąd pobierania folderów:', err);
      }
    };

    fetchFolders();
  }, []);

  const handleSelectFolder = (folderName) => {
    setModalVisible(false);
    navigation.navigate('LearningScreen', { folderName }); // przejście do trybu nauki
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.studyButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.studyText}>Strefa nauki</Text>
      </TouchableOpacity>

      {/* Modal z listą folderów */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Wybierz folder</Text>
            <ScrollView>
              {folders.map((folder) => (
                <TouchableOpacity
                  key={folder._id}
                  style={styles.folderItem}
                  onPress={() => handleSelectFolder(folder.name)}
                >
                  <Text style={styles.folderText}>{folder.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Zamknij</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDBF4C', justifyContent: 'center', alignItems: 'center' },

  studyButton: {
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 30,
  },
  studyText: { fontSize: 24, fontWeight: '700', color: '#000' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  folderItem: {
    backgroundColor: '#FDBF4C',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  folderText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ProgressZoneScreen;


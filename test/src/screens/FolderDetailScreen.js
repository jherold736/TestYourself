import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import FlipCard from 'react-native-flip-card';
import { Ionicons } from '@expo/vector-icons';
import { saveFlashcards } from '../api';
import { getFlashcards } from '../api';
import { deleteFlashcard } from '../api';

const FolderDetailsScreen = ({ route }) => {
  const { folderName } = route.params;
  const [flashcards, setFlashcards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');

  useEffect(() => {
  const fetchFlashcards = async () => {
    try {
      const fetchedFlashcards = await getFlashcards(folderName); // name to folderName z route.params
      setFlashcards(fetchedFlashcards);
      console.log('Pobrano fiszki:', fetchedFlashcards);
    } catch (err) {
      console.error('Błąd przy pobieraniu fiszek:', err);
    }
  };

  fetchFlashcards();
}, [folderName]);

  const openEditModal = (card = null) => {
    if (card) {
      setCurrentCard(card);
      setFrontText(card.front);
      setBackText(card.back);
    } else {
      setCurrentCard(null);
      setFrontText('');
      setBackText('');
    }
    setModalVisible(true);
  };

  const saveCard = async () => {
    if (currentCard) {
      setFlashcards(prev =>
        prev.map(c => (c.id === currentCard.id ? { ...c, front: frontText, back: backText } : c))
      );
    } else {
      const newCard = {
        id: Date.now(),
        front: frontText,
        back: backText,
        folderName, //  dodaj folderName
      };

      console.log(' Dodaję fiszkę do folderu:', folderName);

      setFlashcards(prev => [...prev, newCard]);

      try {
        await saveFlashcards([newCard]); //  ZAPISZ DO BAZY
        console.log('Nowa fiszka zapisana do bazy.');
      } catch (err) {
        console.error('Błąd zapisu fiszki:', err);
      }
    }
    setModalVisible(false);
  };

  const deleteCard = async (id) => {
    try {
      await deleteFlashcard(id); // 🗑 usuwa z MongoDB
      setFlashcards(prev => prev.filter(c => c._id !== id)); // 🔁 odświeżenie widoku
      console.log('Fiszka usunięta z bazy');
    } catch (err) {
      console.error('Błąd przy usuwaniu fiszki:', err);
    }
  };


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {flashcards.map((card, index) => (
          <View key={index} style={styles.cardWrapper}>
            <FlipCard
              style={styles.card}
              friction={10}
              clickable={true}
              flipHorizontal={true}
              flipVertical={false}
            >
              <View style={styles.face}>
                <Text style={styles.label}>Słowo / Zwrot</Text>
                <Text style={styles.cardText}>{card.front || 'Brak tekstu'}</Text>
              </View>
              <View style={styles.back}>
                <Text style={styles.label}>Tłumaczenie</Text>
                <Text style={styles.cardText}>{card.back || 'Brak tłumaczenia'}</Text>
              </View>
            </FlipCard>

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => openEditModal(card)}>
                <Ionicons name="create-outline" size={26} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteCard(card._id)}>
                <Ionicons name="trash" size={26} color="black" style={{ marginLeft: 10 }} />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={() => openEditModal(null)}>
          <Ionicons name="add-circle" size={50} color="#000" />
        </TouchableOpacity>
      </ScrollView>

      {/* Modal edycji */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edytuj fiszkę</Text>
            <TextInput
              style={styles.input}
              placeholder="Słowo / Zwrot"
              value={frontText}
              onChangeText={setFrontText}
            />
            <TextInput
              style={styles.input}
              placeholder="Tłumaczenie"
              value={backText}
              onChangeText={setBackText}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveCard}>
              <Text style={styles.saveButtonText}>Zapisz</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDBF4C', paddingTop: 40, paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center', marginBottom: 20 },

  cardWrapper: {
  alignItems: 'center',
  marginBottom: 20,
  width: '100%',
  },

  card: {
    width: 300,
    height: 200,
  },

  cardsContainer: {
  paddingBottom: 60,
  alignItems: 'center',
  paddingHorizontal: 20,
  },


  face: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  back: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: { fontSize: 14, color: '#888', marginBottom: 6 },
  cardText: { fontSize: 18, color: '#000', textAlign: 'center' },
  actions: { flexDirection: 'row', marginTop: 10 },
  addButton: { marginTop: 10 },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
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
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 40,
  },
  saveButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  saveButtonText: { color: '#fff', fontWeight: '600' },
});

export default FolderDetailsScreen;






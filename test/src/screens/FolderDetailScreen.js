import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FlipCard from 'react-native-flip-card';
import { Ionicons } from '@expo/vector-icons';

const FolderDetailsScreen = ({ route }) => {
  const { name, flashcards: initialFlashcards } = route.params;
  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const [editingCard, setEditingCard] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editedFront, setEditedFront] = useState('');
  const [editedBack, setEditedBack] = useState('');

  const openEditModal = (card, index) => {
    setEditingCard(index);
    setEditedFront(card.front);
    setEditedBack(card.back);
    setModalVisible(true);
  };

  const saveEdits = () => {
    const updated = [...flashcards];
    updated[editingCard] = {
      ...updated[editingCard],
      front: editedFront,
      back: editedBack,
    };
    setFlashcards(updated);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {flashcards.map((card, index) => (
          <View key={index} style={styles.cardWrapper}>
            <FlipCard
              friction={10}
              clickable={true}
              flipHorizontal={true}
              flipVertical={false}
              style={styles.card}
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
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => openEditModal(card, index)}
            >
              <Ionicons name="pencil" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edytuj fiszkę</Text>
            <TextInput
              style={styles.input}
              placeholder="Słowo / Zwrot"
              value={editedFront}
              onChangeText={setEditedFront}
            />
            <TextInput
              style={styles.input}
              placeholder="Tłumaczenie"
              value={editedBack}
              onChangeText={setEditedBack}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveEdits}>
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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  cardsContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  cardWrapper: {
    position: 'relative',
    marginBottom: 20,
  },
  card: {
    width: 300,
    height: 200,
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
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
  editIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
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
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
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

export default FolderDetailsScreen;





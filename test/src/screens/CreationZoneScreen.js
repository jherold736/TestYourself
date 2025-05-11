import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Flashcard from '../components/Flashcards';

const CreationZoneScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [flashcards, setFlashcards] = useState([{ id: Date.now(), front: '', back: '' }]);

  const addFlashcard = () => {
    setFlashcards([...flashcards, { id: Date.now() + Math.random(), front: '', back: '' }]);
  };

  const saveFlashcards = () => {
    console.log('Zapisano fiszki:', flashcards);
    navigation.navigate('Folders Zone', { flashcards });
    setFlashcards([{ id: Date.now(), front: '', back: '' }]);
  };

  const deleteFlashcard = (id) => {
    setFlashcards(flashcards.filter((card) => card.id !== id));
  };

  const updateFlashcard = (id, front, back) => {
    setFlashcards(prev =>
      prev.map(card => (card.id === id ? { ...card, front, back } : card))
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 10 }]}
        showsVerticalScrollIndicator={false}
      >
        {flashcards.map((card) => (
          <View key={card.id} style={styles.flashcardRow}>
            <View style={styles.cardWrapper}>
              <Flashcard
                front={card.front}
                back={card.back}
                onUpdate={(front, back) => updateFlashcard(card.id, front, back)}
              />
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteFlashcard(card.id)}
            >
              <Ionicons name="trash" size={30} color="black" />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={addFlashcard}>
          <Ionicons name="add-circle" size={50} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={saveFlashcards}>
          <Text style={styles.saveButtonText}>Zapisz fiszki</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDBF4C' },
  scroll: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexGrow: 1,
    paddingBottom: 100,
  },
  flashcardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: 10,
  },
  addButton: {
    marginVertical: 20,
  },
  saveButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginBottom: 40,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreationZoneScreen;







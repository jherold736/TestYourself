import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Flashcard from '../components/Flashcards'; // Nasz komponent fiszki

const CreationZoneScreen = ({ navigation }) => {
  const [flashcards, setFlashcards] = useState([{ id: Date.now() }]);

  const addFlashcard = () => {
    setFlashcards([...flashcards, { id: Date.now() + Math.random() }]);
  };

  const saveFlashcards = () => {
    console.log('Zapisano fiszki:', flashcards);
    setFlashcards([{ id: Date.now() }]);
    navigation.navigate('Folders Zone'); // ➡️ Przekierowanie do ekranu folderów
  };

  const deleteFlashcard = (id) => {
    setFlashcards(flashcards.filter((card) => card.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ➡️ Renderowanie fiszek */}
        {flashcards.map((card) => (
          <View key={card.id} style={styles.flashcardRow}>
            <View style={styles.cardWrapper}>
              <Flashcard />
            </View>
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => deleteFlashcard(card.id)}
            >
              <Ionicons name="trash" size={30} color="black" />
            </TouchableOpacity>
          </View>
        ))}

        {/* ➡️ Przycisk dodawania nowej fiszki */}
        <TouchableOpacity style={styles.addButton} onPress={addFlashcard}>
          <Ionicons name="add-circle" size={50} color="#000" />
        </TouchableOpacity>

        {/* ➡️ Przycisk zapisywania fiszek */}
        <TouchableOpacity style={styles.saveButton} onPress={saveFlashcards}>
          <Text style={styles.saveButtonText}>Zapisz fiszki</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDBF4C',
  },
  scroll: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexGrow: 1,
    paddingTop: 20,    //  dodane nowe!
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






import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FlipCard from 'react-native-flip-card';
import { Ionicons } from '@expo/vector-icons';
import { getFlashcards } from '../api';
import { updateStats } from '../api';


const LearningScreen = ({ route, navigation }) => {
  const { folderName } = route.params;
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const fetched = await getFlashcards(folderName);
        setFlashcards(fetched);
      } catch (err) {
        console.error('Błąd pobierania fiszek:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [folderName]);

  const currentCard = flashcards[currentIndex];

 const handleAnswer = async (isCorrect) => {
  if (isCorrect) {
    setCorrectCount((prev) => prev + 1);

    const today = new Date().toISOString().split('T')[0];

    try {
      await updateStats(today, 1); // ⬅️ wysyłamy do bazy info o powtórzeniu fiszki
    } catch (err) {
      console.error('Błąd zapisu statystyk:', err);
    }
  }

  if (currentIndex + 1 < flashcards.length) {
    setCurrentIndex((prev) => prev + 1);
  } else {
    setFinished(true);
  }
};


  const handleRestart = () => {
    setCurrentIndex(0);
    setCorrectCount(0);
    setFinished(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Ładowanie fiszek...</Text>
      </View>
    );
  }

  if (flashcards.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Brak fiszek do nauki.</Text>
      </View>
    );
  }

  if (finished) {
    const percentage = ((correctCount / flashcards.length) * 100).toFixed(0);
    return (
      <View style={styles.container}>
        <Text style={styles.resultText}>Twój wynik:</Text>
        <Text style={styles.percentage}>{percentage}% poprawnych</Text>
        <TouchableOpacity style={styles.button} onPress={handleRestart}>
          <Text style={styles.buttonText}>Spróbuj ponownie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>↩️ Wróć</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        <FlipCard
          style={styles.card}
          friction={10}
          flipHorizontal
          flipVertical={false}
        >
          <View style={styles.face}>
            <Text style={styles.label}>Słowo / Zwrot</Text>
            <Text style={styles.cardText}>{currentCard.front}</Text>
          </View>
          <View style={styles.back}>
            <Text style={styles.label}>Tłumaczenie</Text>
            <Text style={styles.cardText}>{currentCard.back}</Text>
          </View>
        </FlipCard>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleAnswer(false)}>
          <Ionicons name="close-circle-outline" size={50} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAnswer(true)} style={{ marginLeft: 30 }}>
          <Ionicons name="checkmark-circle-outline" size={50} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDBF4C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrapper: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  card: {
    width: 300,
    height: 200,
  },
  face: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  back: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
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
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 30,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  resultText: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    color: '#000',
  },
  percentage: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 20,
    color: '#000',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  backButton: {
    marginTop: 20,
  },
  backText: {
    fontSize: 16,
    color: '#000',
  },
});

export default LearningScreen;



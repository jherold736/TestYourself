import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import FlipCard from 'react-native-flip-card';

const Flashcard = () => {
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');
  const [flipped, setFlipped] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => setFlipped(!flipped)}>
      <FlipCard
        flip={flipped}
        clickable={false}
        style={styles.cardContainer}
        friction={10}
        perspective={1200}
        flipHorizontal={true}
        flipVertical={false}
      >
        {/* FRONT */}
        <View style={styles.card}>
          <Text style={styles.label}>Słowo / Zwrot</Text>
          <TextInput
            style={[styles.input, { minHeight: 60 }]}
            value={frontText}
            onChangeText={setFrontText}
            placeholder="Wpisz słowo..."
            placeholderTextColor="#999"
            multiline={true}
            textAlignVertical="top"
          />
        </View>

        {/* BACK */}
        <View style={styles.card}>
          <Text style={styles.label}>Tłumaczenie</Text>
          <TextInput
            style={[styles.input, { minHeight: 60 }]}
            value={backText}
            onChangeText={setBackText}
            placeholder="Wpisz tłumaczenie..."
            placeholderTextColor="#999"
            multiline={true}
            textAlignVertical="top"
          />
        </View>
      </FlipCard>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
  },
  card: {
    width: 300,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 6,
  },
  input: {
    fontSize: 18,
    color: '#333',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 4,
  },
});

export default Flashcard;


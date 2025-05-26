import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FlipCard from 'react-native-flip-card';

const FlashcardDisplay = ({ front, back }) => {
  return (
    <FlipCard
      flipHorizontal
      flipVertical={false}
      friction={10}
      style={styles.cardContainer}
    >
      <View style={styles.card}>
        <Text style={styles.label}>Słowo / Zwrot</Text>
        <Text style={styles.cardText}>{front || 'Brak słowa'}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Tłumaczenie</Text>
        <Text style={styles.cardText}>{back || 'Brak tłumaczenia'}</Text>
      </View>
    </FlipCard>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 300,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  cardText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
});

export default FlashcardDisplay;

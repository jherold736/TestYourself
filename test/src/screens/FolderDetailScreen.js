import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FlipCard from 'react-native-flip-card';

const FolderDetailsScreen = ({ route }) => {
  const { name, flashcards } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>

      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {flashcards.map((card, index) => (
          <FlipCard
            key={index}
            style={styles.card}
            friction={8}
            clickable={false} // tylko podgląd
          >
            {/* Front */}
            <View style={styles.face}>
              <Text style={styles.cardText}>{card.front || 'Brak tekstu'}</Text>
            </View>

            {/* Back */}
            <View style={styles.back}>
              <Text style={styles.cardText}>{card.back || 'Brak tłumaczenia'}</Text>
            </View>
          </FlipCard>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDBF4C',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  cardsContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  card: {
    width: 300,
    height: 180,
    marginBottom: 20,
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
    backgroundColor: '#000',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
});

export default FolderDetailsScreen;


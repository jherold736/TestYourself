import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FlipCard from 'react-native-flip-card';

const FolderDetailsScreen = ({ route }) => {
  const { name, flashcards } = route.params;

  return (
    <View style={styles.container}>
      

      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {flashcards.map((card, index) => (
          <FlipCard
            key={index}
            style={styles.card}
            friction={10}
            clickable={true} // ⬅️ aby się obracała!
            flipHorizontal={true}
            flipVertical={false}
          >
            {/* FRONT - Słowo / Zwrot */}
            <View style={styles.face}>
              <Text style={styles.label}>Słowo / Zwrot</Text>
              <Text style={styles.cardText}>{card.front || 'Brak tekstu'}</Text>
            </View>

            {/* BACK - Tłumaczenie */}
            <View style={styles.back}>
              <Text style={styles.label}>Tłumaczenie</Text>
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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 50,
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
    height: 200,
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
    backgroundColor: '#fff', // zmienione z czarnego na biały
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
});

export default FolderDetailsScreen;




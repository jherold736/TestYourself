// src/screens/WelcomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logoYellow1.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.tagline}>Ucz się języków z fiszkami!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Auth')}
      >
        <Text style={styles.buttonText}>Dołącz do nas</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FDBF4C',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      paddingBottom: 80, // 👈 opcjonalnie
    },
    logo: {
      width: 240,
      height: 240,
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#000',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 30,
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    tagline: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff', // jak w przycisku
        marginBottom: 20,
        textAlign: 'center',
        maxWidth: 260,
      },
      
      
  });
  

export default WelcomeScreen;

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import WelcomeScreen from '../screens/WelcomeScreen';
import AuthScreen from '../screens/AuthScreen';

// ❗ Importujemy teraz nasz dolny pasek (Main Tabs)
import MainTabsNavigator from '../navigation/MainTabsNavigator';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        
        {/* ➡️ 1. Ekran powitalny */}
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />

        {/* ➡️ 2. Ekran logowania/rejestracji */}
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />

        {/* ➡️ 3. Główna nawigacja po zalogowaniu = Bottom Tabs */}
        <Stack.Screen
          name="Main"
          component={MainTabsNavigator} // 🚀 zamiast pojedynczych ekranów wstawiamy cały pasek nawigacyjny
          options={{ headerShown: false }}
        />

        {/*  TE EKRANY USUWAMY bo są teraz wewnątrz MainTabsNavigator:
        <Stack.Screen name="Creation Zone" component={CreationZoneScreen} />
        <Stack.Screen name="Folders Zone" component={FoldersZoneScreen} />
        <Stack.Screen name="Progress Zone" component={ProgressZoneScreen} />
        <Stack.Screen name="User Account" component={UserAccountScreen} />
        */}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;




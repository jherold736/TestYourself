import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import CreationZoneScreen from '../screens/CreationZoneScreen';
import FoldersZoneScreen from '../screens/FoldersZoneScreen';
import ProgressZoneScreen from '../screens/ProgressZoneScreen';
import UserAccountScreen from '../screens/UserAccountScreen';

const Tab = createBottomTabNavigator();

const MainTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#555',
        tabBarStyle: {
          backgroundColor: '#FDBF4C', // Żółte tło
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopWidth: 1, // ➡️ Linia
          borderTopColor: '#000000', // ➡️ 100% czarny kolor linii!
          elevation: 0, // ➡️ (android) usuwa dodatkowe cienie
          shadowOpacity: 0, // ➡️ (ios) usuwa dodatkowe cienie
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Creation Zone') {
            iconName = 'create-outline';
          } else if (route.name === 'Folders Zone') {
            iconName = 'folder-outline';
          } else if (route.name === 'Progress Zone') {
            iconName = 'bar-chart-outline';
          } else if (route.name === 'User Account') {
            iconName = 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Creation Zone" component={CreationZoneScreen} />
      <Tab.Screen name="Folders Zone" component={FoldersZoneScreen} />
      <Tab.Screen name="Progress Zone" component={ProgressZoneScreen} />
      <Tab.Screen name="User Account" component={UserAccountScreen} />
    </Tab.Navigator>
  );
};

export default MainTabsNavigator;


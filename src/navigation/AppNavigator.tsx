import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DreamInterpreter from '../DreamInterpreter';
import { View, Text } from 'react-native';

const Drawer = createDrawerNavigator();

// Placeholder screens
const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Profile Screen</Text>
  </View>
);

const MyDreamsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>My Dreams Screen</Text>
  </View>
);

const SettingsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Settings Screen</Text>
  </View>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Dream Interpreter">
        <Drawer.Screen name="Dream Interpreter" component={DreamInterpreter} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="My Dreams" component={MyDreamsScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 
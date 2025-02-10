import React from 'react';
import { StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import 'react-native-gesture-handler';

export default function App() {
  return <AppNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

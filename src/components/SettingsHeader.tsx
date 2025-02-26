import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

interface SettingsHeaderProps {
  destination?: string;
}

type RootStackParamList = {
  Settings: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  NotificationsSettings: undefined;
  ChangePassword: undefined;
  PrivacySettings: undefined;
  TermsOfService: undefined;
  PrivacyPolicy: undefined;
};

type NavigationProp = DrawerNavigationProp<RootStackParamList>;

const SettingsHeader = ({ destination = 'Settings' }: SettingsHeaderProps) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const navigation = useNavigation<NavigationProp>();

  const handleBack = () => {
    navigation.navigate(destination);
  };

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      top: 20,
      left: 10,
      zIndex: 1,
    },
    backButton: {
      padding: 10,
    },
  });

  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={handleBack}
      >
        <Ionicons 
          name="arrow-back" 
          size={24} 
          color={isDarkMode ? '#FFFFFF' : '#333333'} 
        />
      </TouchableOpacity>
    </View>
  );
};

export default SettingsHeader; 
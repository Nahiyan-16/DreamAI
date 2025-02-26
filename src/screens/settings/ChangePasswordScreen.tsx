import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import SettingsHeader from '../../components/SettingsHeader';

const ChangePasswordScreen = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1a1a1a' : '#F8F8F8',
      paddingTop: 20,
    },
    section: {
      marginBottom: 20,
      padding: 15,
      backgroundColor: isDarkMode ? '#2d2d2d' : '#FFFFFF',
      borderRadius: 10,
      marginHorizontal: 15,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
      color: isDarkMode ? '#FFFFFF' : '#333333',
      fontWeight: '500',
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: isDarkMode ? '#404040' : '#ddd',
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#1a1a1a' : '#FFFFFF',
    },
    input: {
      flex: 1,
      padding: 12,
      fontSize: 16,
      color: isDarkMode ? '#FFFFFF' : '#333333',
    },
    toggleButton: {
      padding: 12,
    },
    button: {
      backgroundColor: '#6A5ACD',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    requirements: {
      marginTop: 20,
      padding: 15,
      backgroundColor: isDarkMode ? '#2d2d2d' : '#FFFFFF',
      borderRadius: 10,
      marginHorizontal: 15,
    },
    requirementTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
      color: isDarkMode ? '#FFFFFF' : '#333333',
    },
    requirementText: {
      fontSize: 14,
      color: isDarkMode ? '#B0B0B0' : '#666666',
      marginBottom: 5,
    },
  });

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (!validatePassword(newPassword)) {
      Alert.alert('Error', 'New password does not meet requirements');
      return;
    }

    // Here you would typically make an API call to change the password
    Alert.alert('Success', 'Password changed successfully');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <View style={styles.container}>
      <SettingsHeader destination="Settings" />
      <ScrollView style={{ ...styles.container, paddingTop: 60 }}>
        <View style={styles.section}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Current Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                secureTextEntry={!showCurrentPassword}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Enter current password"
                placeholderTextColor={isDarkMode ? '#808080' : '#999999'}
              />
              <TouchableOpacity 
                style={styles.toggleButton}
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                <Ionicons 
                  name={showCurrentPassword ? 'eye-off' : 'eye'} 
                  size={24} 
                  color={isDarkMode ? '#FFFFFF' : '#333333'} 
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>New Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                secureTextEntry={!showNewPassword}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                placeholderTextColor={isDarkMode ? '#808080' : '#999999'}
              />
              <TouchableOpacity 
                style={styles.toggleButton}
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                <Ionicons 
                  name={showNewPassword ? 'eye-off' : 'eye'} 
                  size={24} 
                  color={isDarkMode ? '#FFFFFF' : '#333333'} 
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm New Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
                placeholderTextColor={isDarkMode ? '#808080' : '#999999'}
              />
              <TouchableOpacity 
                style={styles.toggleButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons 
                  name={showConfirmPassword ? 'eye-off' : 'eye'} 
                  size={24} 
                  color={isDarkMode ? '#FFFFFF' : '#333333'} 
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={handleChangePassword}
          >
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.requirements}>
          <Text style={styles.requirementTitle}>Password Requirements</Text>
          <Text style={styles.requirementText}>• Minimum 8 characters long</Text>
          <Text style={styles.requirementText}>• At least one uppercase letter</Text>
          <Text style={styles.requirementText}>• At least one lowercase letter</Text>
          <Text style={styles.requirementText}>• At least one number</Text>
          <Text style={styles.requirementText}>• At least one special character</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ChangePasswordScreen; 
import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const navigation = useNavigation();

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
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      color: isDarkMode ? '#FFFFFF' : '#333333',
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#404040' : '#f0f0f0',
    },
    optionText: {
      fontSize: 16,
      color: isDarkMode ? '#FFFFFF' : '#333333',
    },
    optionDescription: {
      fontSize: 14,
      color: isDarkMode ? '#B0B0B0' : '#666666',
      marginTop: 4,
    },
    version: {
      textAlign: 'center',
      color: isDarkMode ? '#808080' : '#999999',
      marginTop: 20,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.option}>
          <View>
            <Text style={styles.optionText}>Dark Mode</Text>
            <Text style={styles.optionDescription}>Toggle dark/light theme</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <TouchableOpacity 
          style={styles.option}
          onPress={() => navigation.navigate('NotificationsSettings')}
        >
          <View>
            <Text style={styles.optionText}>Push Notifications</Text>
            <Text style={styles.optionDescription}>Manage notification preferences</Text>
          </View>
          <Ionicons 
            name="chevron-forward" 
            size={24} 
            color={isDarkMode ? '#FFFFFF' : '#333333'} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity 
          style={styles.option}
          onPress={() => navigation.navigate('ChangePassword')}
        >
          <View>
            <Text style={styles.optionText}>Change Password</Text>
            <Text style={styles.optionDescription}>Update your account password</Text>
          </View>
          <Ionicons 
            name="chevron-forward" 
            size={24} 
            color={isDarkMode ? '#FFFFFF' : '#333333'} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.option}
          onPress={() => navigation.navigate('PrivacySettings')}
        >
          <View>
            <Text style={styles.optionText}>Privacy Settings</Text>
            <Text style={styles.optionDescription}>Manage your data and privacy</Text>
          </View>
          <Ionicons 
            name="chevron-forward" 
            size={24} 
            color={isDarkMode ? '#FFFFFF' : '#333333'} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <TouchableOpacity 
          style={styles.option}
          onPress={() => navigation.navigate('TermsOfService')}
        >
          <View>
            <Text style={styles.optionText}>Terms of Service</Text>
          </View>
          <Ionicons 
            name="chevron-forward" 
            size={24} 
            color={isDarkMode ? '#FFFFFF' : '#333333'} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.option}
          onPress={() => navigation.navigate('PrivacyPolicy')}
        >
          <View>
            <Text style={styles.optionText}>Privacy Policy</Text>
          </View>
          <Ionicons 
            name="chevron-forward" 
            size={24} 
            color={isDarkMode ? '#FFFFFF' : '#333333'} 
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
};

export default SettingsScreen; 
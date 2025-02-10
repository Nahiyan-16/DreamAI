import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const PrivacySettingsScreen = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  const [privacySettings, setPrivacySettings] = useState({
    shareData: false,
    anonymousAnalytics: true,
    personalization: true,
    locationTracking: false,
    thirdPartySharing: false,
  });

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
      paddingVertical: 12,
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
      flex: 1,
      paddingRight: 10,
    },
    lastOption: {
      borderBottomWidth: 0,
    },
    dangerButton: {
      backgroundColor: '#FF4444',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    dangerButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    infoText: {
      fontSize: 14,
      color: isDarkMode ? '#B0B0B0' : '#666666',
      marginTop: 15,
      textAlign: 'center',
    },
  });

  const toggleSetting = (key: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            // Here you would typically make an API call to delete the account
            Alert.alert('Account Deletion', 'Your account deletion request has been submitted.');
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Sharing</Text>
        <View style={styles.option}>
          <View style={{ flex: 1 }}>
            <Text style={styles.optionText}>Share Dream Data</Text>
            <Text style={styles.optionDescription}>
              Allow your dream data to be used for research (anonymously)
            </Text>
          </View>
          <Switch
            value={privacySettings.shareData}
            onValueChange={() => toggleSetting('shareData')}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={privacySettings.shareData ? '#6A5ACD' : '#f4f3f4'}
          />
        </View>
        <View style={[styles.option, styles.lastOption]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.optionText}>Anonymous Analytics</Text>
            <Text style={styles.optionDescription}>
              Help improve the app by sharing anonymous usage data
            </Text>
          </View>
          <Switch
            value={privacySettings.anonymousAnalytics}
            onValueChange={() => toggleSetting('anonymousAnalytics')}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={privacySettings.anonymousAnalytics ? '#6A5ACD' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personalization</Text>
        <View style={styles.option}>
          <View style={{ flex: 1 }}>
            <Text style={styles.optionText}>Personalized Experience</Text>
            <Text style={styles.optionDescription}>
              Allow app to personalize your dream interpretations
            </Text>
          </View>
          <Switch
            value={privacySettings.personalization}
            onValueChange={() => toggleSetting('personalization')}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={privacySettings.personalization ? '#6A5ACD' : '#f4f3f4'}
          />
        </View>
        <View style={[styles.option, styles.lastOption]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.optionText}>Location Services</Text>
            <Text style={styles.optionDescription}>
              Use location data to enhance dream analysis
            </Text>
          </View>
          <Switch
            value={privacySettings.locationTracking}
            onValueChange={() => toggleSetting('locationTracking')}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={privacySettings.locationTracking ? '#6A5ACD' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Third-Party Integration</Text>
        <View style={[styles.option, styles.lastOption]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.optionText}>Third-Party Data Sharing</Text>
            <Text style={styles.optionDescription}>
              Allow sharing of data with trusted third-party services
            </Text>
          </View>
          <Switch
            value={privacySettings.thirdPartySharing}
            onValueChange={() => toggleSetting('thirdPartySharing')}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={privacySettings.thirdPartySharing ? '#6A5ACD' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Management</Text>
        <TouchableOpacity 
          style={styles.dangerButton}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.dangerButtonText}>Delete Account</Text>
        </TouchableOpacity>
        <Text style={styles.infoText}>
          Deleting your account will permanently remove all your data and cannot be undone.
        </Text>
      </View>
    </ScrollView>
  );
};

export default PrivacySettingsScreen; 
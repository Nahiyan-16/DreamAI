import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const NotificationsScreen = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  const [notifications, setNotifications] = useState({
    dreamReminders: true,
    patternAlerts: false,
    weeklyInsights: true,
    soundEnabled: true,
    vibrationEnabled: true,
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
  });

  const toggleSwitch = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dream Tracking</Text>
        <View style={styles.option}>
          <View style={{ flex: 1 }}>
            <Text style={styles.optionText}>Dream Reminders</Text>
            <Text style={styles.optionDescription}>
              Daily reminders to record your dreams
            </Text>
          </View>
          <Switch
            value={notifications.dreamReminders}
            onValueChange={() => toggleSwitch('dreamReminders')}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notifications.dreamReminders ? '#6A5ACD' : '#f4f3f4'}
          />
        </View>
        <View style={styles.option}>
          <View style={{ flex: 1 }}>
            <Text style={styles.optionText}>Pattern Alerts</Text>
            <Text style={styles.optionDescription}>
              Get notified when recurring dream patterns are detected
            </Text>
          </View>
          <Switch
            value={notifications.patternAlerts}
            onValueChange={() => toggleSwitch('patternAlerts')}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notifications.patternAlerts ? '#6A5ACD' : '#f4f3f4'}
          />
        </View>
        <View style={[styles.option, styles.lastOption]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.optionText}>Weekly Insights</Text>
            <Text style={styles.optionDescription}>
              Receive weekly summaries of your dream patterns and interpretations
            </Text>
          </View>
          <Switch
            value={notifications.weeklyInsights}
            onValueChange={() => toggleSwitch('weeklyInsights')}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notifications.weeklyInsights ? '#6A5ACD' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Settings</Text>
        <View style={styles.option}>
          <View style={{ flex: 1 }}>
            <Text style={styles.optionText}>Sound</Text>
            <Text style={styles.optionDescription}>
              Play sound for notifications
            </Text>
          </View>
          <Switch
            value={notifications.soundEnabled}
            onValueChange={() => toggleSwitch('soundEnabled')}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notifications.soundEnabled ? '#6A5ACD' : '#f4f3f4'}
          />
        </View>
        <View style={[styles.option, styles.lastOption]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.optionText}>Vibration</Text>
            <Text style={styles.optionDescription}>
              Vibrate when receiving notifications
            </Text>
          </View>
          <Switch
            value={notifications.vibrationEnabled}
            onValueChange={() => toggleSwitch('vibrationEnabled')}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notifications.vibrationEnabled ? '#6A5ACD' : '#f4f3f4'}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default NotificationsScreen; 
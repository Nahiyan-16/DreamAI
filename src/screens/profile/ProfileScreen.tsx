import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useDreams } from '../../context/DreamsContext';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const { dreams } = useDreams();

  // Calculate statistics
  const totalDreams = dreams.length;
  const thisMonth = dreams.filter(dream => {
    const dreamDate = new Date(dream.date);
    const now = new Date();
    return dreamDate.getMonth() === now.getMonth() && 
           dreamDate.getFullYear() === now.getFullYear();
  }).length;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1a1a1a' : '#F8F8F8',
    },
    header: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#FFFFFF',
      padding: 20,
      alignItems: 'center',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      marginBottom: 20,
    },
    profileImageContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: isDarkMode ? '#404040' : '#E0E0E0',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
      overflow: 'visible',
      position: 'relative',
    },
    profileImage: {
      width: '100%',
      height: '100%',
    },
    editButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: '#6A5ACD',
      padding: 8,
      borderRadius: 15,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#333333',
      marginBottom: 5,
    },
    email: {
      fontSize: 16,
      color: isDarkMode ? '#B0B0B0' : '#666666',
      marginBottom: 15,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      paddingHorizontal: 20,
    },
    statBox: {
      backgroundColor: isDarkMode ? '#404040' : '#F0F0F0',
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      flex: 1,
      marginHorizontal: 5,
    },
    statNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#6A5ACD',
      marginBottom: 5,
    },
    statLabel: {
      fontSize: 14,
      color: isDarkMode ? '#B0B0B0' : '#666666',
    },
    section: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#FFFFFF',
      marginHorizontal: 15,
      marginBottom: 15,
      borderRadius: 10,
      padding: 15,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#333333',
      marginBottom: 10,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#404040' : '#f0f0f0',
    },
    infoLabel: {
      flex: 1,
      fontSize: 16,
      color: isDarkMode ? '#B0B0B0' : '#666666',
    },
    infoValue: {
      flex: 2,
      fontSize: 16,
      color: isDarkMode ? '#FFFFFF' : '#333333',
    },
    lastRow: {
      borderBottomWidth: 0,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="camera" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{totalDreams}</Text>
            <Text style={styles.statLabel}>Total Dreams</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{thisMonth}</Text>
            <Text style={styles.statLabel}>This Month</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>70%</Text>
            <Text style={styles.statLabel}>Completion</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Username</Text>
          <Text style={styles.infoValue}>@johndoe</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Location</Text>
          <Text style={styles.infoValue}>New York, USA</Text>
        </View>
        <View style={[styles.infoRow, styles.lastRow]}>
          <Text style={styles.infoLabel}>Member Since</Text>
          <Text style={styles.infoValue}>January 2024</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dream Statistics</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Most Common Theme</Text>
          <Text style={styles.infoValue}>Flying</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Average Dreams/Week</Text>
          <Text style={styles.infoValue}>3.5</Text>
        </View>
        <View style={[styles.infoRow, styles.lastRow]}>
          <Text style={styles.infoLabel}>Longest Streak</Text>
          <Text style={styles.infoValue}>7 days</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen; 
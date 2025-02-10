import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const PrivacyPolicyScreen = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1a1a1a' : '#F8F8F8',
      paddingTop: 20,
    },
    content: {
      padding: 15,
      backgroundColor: isDarkMode ? '#2d2d2d' : '#FFFFFF',
      borderRadius: 10,
      marginHorizontal: 15,
      marginBottom: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#333333',
      marginBottom: 15,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#333333',
      marginBottom: 10,
    },
    text: {
      fontSize: 16,
      color: isDarkMode ? '#B0B0B0' : '#666666',
      lineHeight: 24,
      marginBottom: 10,
    },
    bullet: {
      flexDirection: 'row',
      marginBottom: 5,
      paddingLeft: 15,
    },
    bulletPoint: {
      fontSize: 16,
      color: isDarkMode ? '#B0B0B0' : '#666666',
      marginRight: 5,
    },
    bulletText: {
      fontSize: 16,
      color: isDarkMode ? '#B0B0B0' : '#666666',
      flex: 1,
    },
    lastUpdated: {
      fontSize: 14,
      color: isDarkMode ? '#808080' : '#999999',
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 30,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Privacy Policy</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          <Text style={styles.text}>
            We collect information that you provide directly to us, including:
          </Text>
          <View style={styles.bullet}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>
              Account information (email, password)
            </Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>
              Dream content and interpretations
            </Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>
              Usage data and analytics
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
          <Text style={styles.text}>
            We use the collected information to:
          </Text>
          <View style={styles.bullet}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>
              Provide and improve our dream interpretation services
            </Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>
              Personalize your experience
            </Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>
              Send notifications and updates
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Data Security</Text>
          <Text style={styles.text}>
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Your Rights</Text>
          <Text style={styles.text}>
            You have the right to:
          </Text>
          <View style={styles.bullet}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>
              Access your personal data
            </Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>
              Request data deletion
            </Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>
              Opt-out of data collection
            </Text>
          </View>
        </View>

        <Text style={styles.lastUpdated}>Last Updated: February 2025</Text>
      </View>
    </ScrollView>

  );
};

export default PrivacyPolicyScreen; 
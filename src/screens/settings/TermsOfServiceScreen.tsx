import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const TermsOfServiceScreen = () => {
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
        <Text style={styles.title}>Terms of Service</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.text}>
            By accessing and using Dream AI, you agree to be bound by these Terms of Service and all applicable laws and regulations.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Use of Service</Text>
          <Text style={styles.text}>
            Dream AI provides dream interpretation services using artificial intelligence. The service is provided "as is" and we make no warranties about the accuracy of interpretations.
          </Text>
          <View style={styles.bullet}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>
              You must be at least 13 years old to use this service
            </Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>
              You are responsible for maintaining the confidentiality of your account
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. User Content</Text>
          <Text style={styles.text}>
            You retain all rights to your dream content. By submitting dreams, you grant us a license to use the content for providing and improving our services.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Privacy</Text>
          <Text style={styles.text}>
            Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your information.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Limitations</Text>
          <Text style={styles.text}>
            Dream AI's interpretations are for entertainment purposes only. Do not rely on them for medical, legal, or professional advice.
          </Text>
        </View>

        <Text style={styles.lastUpdated}>Last Updated: February 2025</Text>
      </View>
    </ScrollView>
  );
};

export default TermsOfServiceScreen; 
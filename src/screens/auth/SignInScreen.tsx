import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { signIn } from '../../services/AuthService';

const SignInScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const userResponse = await signIn({ email: email.trim(), password });
      Alert.alert('Success', 'Signed in successfully!');
      // Store the token or user data as needed
      // For example, you can use AsyncStorage to store the token
      // await AsyncStorage.setItem('userToken', userResponse.token);
      navigation.navigate('Profile'); // Navigate to the Profile screen or wherever you want
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1a1a1a' : '#F8F8F8',
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 20,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 40,
    },
    logo: {
      width: 100,
      height: 100,
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#333333',
      marginBottom: 10,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: isDarkMode ? '#B0B0B0' : '#666666',
      textAlign: 'center',
      marginBottom: 30,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      color: isDarkMode ? '#FFFFFF' : '#333333',
      marginBottom: 8,
    },
    input: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#FFFFFF',
      borderRadius: 10,
      padding: 15,
      color: isDarkMode ? '#FFFFFF' : '#333333',
      borderWidth: 1,
      borderColor: isDarkMode ? '#404040' : '#E0E0E0',
    },
    passwordContainer: {
      position: 'relative',
    },
    passwordToggle: {
      position: 'absolute',
      right: 15,
      top: 15,
    },
    signInButton: {
      backgroundColor: '#6A5ACD',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
    },
    signInText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    forgotPassword: {
      alignItems: 'center',
      marginTop: 15,
    },
    forgotPasswordText: {
      color: '#6A5ACD',
      fontSize: 16,
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 30,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: isDarkMode ? '#404040' : '#E0E0E0',
    },
    dividerText: {
      color: isDarkMode ? '#B0B0B0' : '#666666',
      paddingHorizontal: 10,
    },
    signUpContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    signUpText: {
      color: isDarkMode ? '#B0B0B0' : '#666666',
    },
    signUpButton: {
      marginLeft: 5,
    },
    signUpButtonText: {
      color: '#6A5ACD',
      fontWeight: 'bold',
    },
  });

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={isDarkMode ? '#808080' : '#999999'}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={isDarkMode ? '#808080' : '#999999'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity 
              style={styles.passwordToggle}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons 
                name={showPassword ? 'eye-off' : 'eye'} 
                size={24} 
                color={isDarkMode ? '#FFFFFF' : '#333333'} 
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.forgotPassword}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account?</Text>
          <TouchableOpacity 
            style={styles.signUpButton}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen; 
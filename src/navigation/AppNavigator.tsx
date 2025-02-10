import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import DreamInterpreter from '../DreamInterpreter';
import ProfileScreen from '../screens/profile/ProfileScreen';
import MyDreamsScreen from '../screens/dreams/MyDreamsScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import NotificationsScreen from '../screens/settings/NotificationsScreen';
import ChangePasswordScreen from '../screens/settings/ChangePasswordScreen';
import PrivacySettingsScreen from '../screens/settings/PrivacySettingsScreen';
import TermsOfServiceScreen from '../screens/settings/TermsOfServiceScreen';
import PrivacyPolicyScreen from '../screens/settings/PrivacyPolicyScreen';
import { Ionicons } from '@expo/vector-icons';
import { DreamsProvider } from '../context/DreamsContext';

const Drawer = createDrawerNavigator();

// Separate component for drawer navigation
const DrawerNavigator = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <Drawer.Navigator 
      initialRouteName="Dream Interpreter"
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? '#5246A1' : '#6A5ACD',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
        },
        drawerActiveTintColor: '#6A5ACD',
        drawerInactiveTintColor: isDarkMode ? '#fff' : '#333',
      }}
    >
      <Drawer.Screen 
        name="Dream Interpreter" 
        component={DreamInterpreter}
        options={{
          drawerIcon: ({color, size}) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="My Dreams" 
        component={MyDreamsScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Ionicons name="moon" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="NotificationsSettings"
        component={NotificationsScreen}
        options={{
          drawerItemStyle: { height: 0 }, // Hide from drawer menu
          title: 'Notifications',
        }}
      />
      <Drawer.Screen 
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          drawerItemStyle: { height: 0 }, // Hide from drawer menu
          title: 'Change Password',
        }}
      />
      <Drawer.Screen 
        name="PrivacySettings"
        component={PrivacySettingsScreen}
        options={{
          drawerItemStyle: { height: 0 }, // Hide from drawer menu
          title: 'Privacy Settings',
        }}
      />
      <Drawer.Screen 
        name="TermsOfService"
        component={TermsOfServiceScreen}
        options={{
          drawerItemStyle: { height: 0 }, // Hide from drawer menu
          title: 'Terms of Service',
        }}
      />
      <Drawer.Screen 
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{
          drawerItemStyle: { height: 0 }, // Hide from drawer menu
          title: 'Privacy Policy',
        }}
      />
    </Drawer.Navigator>
  );
};

// Main AppNavigator component
const AppNavigator = () => {
  return (
    <ThemeProvider>
      <DreamsProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </DreamsProvider>
    </ThemeProvider>
  );
};

export default AppNavigator; 
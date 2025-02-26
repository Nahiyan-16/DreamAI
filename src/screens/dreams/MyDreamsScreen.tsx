import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator, TextInput, Platform } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Mocking the useDreams hook
const useDreams = () => {
  return {
    dreams: [
      {
        id: '1',
        date: '2023-10-01',
        description: 'I was flying over the mountains.',
        interpretation: 'Flying often represents freedom and escape.',
      },
      {
        id: '2',
        date: '2023-10-02',
        description: 'I lost my wallet in a crowded market.',
        interpretation: 'Losing something can indicate feelings of insecurity.',
      },
      {
        id: '3',
        date: '2023-10-03',
        description: 'I was chased by a giant spider.',
        interpretation: 'Being chased can symbolize avoidance of a situation.',
      },
    ],
    deleteDream: (id: string) => {
      console.log(`Dream with id ${id} deleted.`);
    },
    loading: false,
  };
};

type SortOption = 'newest' | 'oldest';

// Define your navigation parameters
type RootStackParamList = {
  SignIn: undefined; // Define the parameters for SignIn
  SignUp: undefined; // Define the parameters for SignUp
  // Add other routes here if necessary
};

const MyDreamsScreen = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const { dreams, deleteDream, loading } = useDreams(); // Use the mocked hook
  const [expandedDream, setExpandedDream] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOption>('newest');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const isLoggedIn = true; // Set to true for testing

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1a1a1a' : '#F8F8F8',
      paddingTop: 20,
    },
    dreamCard: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#FFFFFF',
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      marginHorizontal: 15,
    },
    date: {
      fontSize: 14,
      color: isDarkMode ? '#B0B0B0' : '#666666',
      marginBottom: 8,
    },
    description: {
      fontSize: 16,
      color: isDarkMode ? '#FFFFFF' : '#333333',
      marginBottom: 10,
    },
    interpretationTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#6A5ACD',
      marginTop: 10,
      marginBottom: 5,
    },
    interpretation: {
      fontSize: 16,
      color: isDarkMode ? '#FFFFFF' : '#333333',
    },
    expandButton: {
      alignItems: 'center',
      paddingTop: 10,
    },
    deleteButton: {
      position: 'absolute',
      top: 15,
      right: 15,
      padding: 0,
      zIndex: 1,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 30,
      backgroundColor: isDarkMode ? '#1a1a1a' : '#F8F8F8',
    },
    emptyText: {
      fontSize: 16,
      color: isDarkMode ? '#B0B0B0' : '#666666',
      textAlign: 'center',
      marginTop: 10,
    },
    searchContainer: {
      padding: 15,
      backgroundColor: isDarkMode ? '#2d2d2d' : '#FFFFFF',
      marginBottom: 10,
      marginHorizontal: 15,
      borderRadius: 10,
    },
    searchInput: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
      borderRadius: 8,
      padding: Platform.OS === 'ios' ? 12 : 8,
      color: isDarkMode ? '#FFFFFF' : '#333333',
      marginBottom: 10,
    },
    sortContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginTop: 5,
    },
    sortButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
    },
    sortText: {
      color: isDarkMode ? '#B0B0B0' : '#666666',
      marginRight: 5,
    },
    activeSort: {
      color: '#6A5ACD',
    },
    signInButton: {
      backgroundColor: '#6A5ACD',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 25,
      marginTop: 20,
      marginBottom: 10,
    },
    signInButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    signUpButton: {
      paddingVertical: 12,
      paddingHorizontal: 30,
    },
    signUpButtonText: {
      color: '#6A5ACD',
      fontSize: 16,
    },
  });

  const filteredAndSortedDreams = useCallback(() => {
    let filtered = dreams;

    // Apply search filter
    if (searchQuery) {
      filtered = dreams.filter(dream => 
        dream.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dream.interpretation.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sort
    return filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [dreams, searchQuery, sortOrder]);

  const toggleSort = () => {
    setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest');
  };

  const handleDelete = (dream: Dream) => {
    Alert.alert(
      'Delete Dream',
      'Are you sure you want to delete this dream?',
      [
        { 
          text: 'Cancel', 
          style: 'cancel'
        },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDream(dream.id);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete dream');
            }
          }
        }
      ],
      { cancelable: true }
    );
  };

  const renderDream = ({ item }: { item: Dream }) => {
    const isExpanded = expandedDream === item.id;

    return (
      <View style={styles.dreamCard}>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDelete(item)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons 
            name="trash-outline" 
            size={24} 
            color={isDarkMode ? '#FF6B6B' : '#FF4444'} 
          />
        </TouchableOpacity>

        <Text style={styles.date}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
        <Text style={styles.description} numberOfLines={isExpanded ? undefined : 2}>
          {item.description}
        </Text>
        
        <Text style={styles.interpretationTitle}>Interpretation</Text>
        <Text style={styles.interpretation} numberOfLines={isExpanded ? undefined : 3}>
          {item.interpretation}
        </Text>

        <TouchableOpacity 
          style={styles.expandButton}
          onPress={() => setExpandedDream(isExpanded ? null : item.id)}
        >
          <Ionicons 
            name={isExpanded ? 'chevron-up' : 'chevron-down'} 
            size={24} 
            color={isDarkMode ? '#FFFFFF' : '#333333'} 
          />
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#6A5ACD" />
      </View>
    );
  }

  if (!isLoggedIn) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons 
          name="moon-outline" 
          size={64} 
          color={isDarkMode ? '#B0B0B0' : '#666666'} 
        />
        <Text style={styles.emptyText}>
          Sign in to save and view your dream interpretations
        </Text>
        <TouchableOpacity 
          style={styles.signInButton}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.signUpButton}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.signUpButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search dreams..."
          placeholderTextColor={isDarkMode ? '#808080' : '#999999'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.sortContainer}>
          <TouchableOpacity 
            style={styles.sortButton}
            onPress={toggleSort}
          >
            <Text style={[
              styles.sortText,
              sortOrder === 'newest' && styles.activeSort
            ]}>
              {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
            </Text>
            <Ionicons 
              name={sortOrder === 'newest' ? 'arrow-down' : 'arrow-up'} 
              size={16} 
              color={sortOrder === 'newest' ? '#6A5ACD' : (isDarkMode ? '#B0B0B0' : '#666666')} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {filteredAndSortedDreams().length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons 
            name="moon-outline" 
            size={64} 
            color={isDarkMode ? '#B0B0B0' : '#666666'} 
          />
          <Text style={styles.emptyText}>
            {searchQuery 
              ? 'No dreams match your search.'
              : 'No dreams saved yet. Your saved dreams and interpretations will appear here.'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredAndSortedDreams()}
          renderItem={renderDream}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default MyDreamsScreen; 
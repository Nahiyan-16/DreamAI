import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, Modal, Alert } from "react-native";
import { OpenAI } from "openai";
import { useFonts } from 'expo-font';
import { ActivityIndicator } from "react-native";
import LottieView from 'lottie-react-native';
import { OPENAI_API_KEY } from '@env';
import { useTheme } from './context/ThemeContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useDreams } from './context/DreamsContext';

interface Dream {
  id: string;
  date: Date;
  description: string;
  interpretation: string;
}

const DreamInterpreter = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [dreamText, setDreamText] = useState("");
  const [interpretation, setInterpretation] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { addDream } = useDreams();
  const [isSaved, setIsSaved] = useState(false);

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#6A5ACD" />;
  }

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: isDarkMode ? '#1a1a1a' : '#F8F8F8',
    },
    input: {
      borderWidth: 1,
      borderColor: isDarkMode ? '#404040' : '#ddd',
      padding: 12,
      marginBottom: 10,
      borderRadius: 8,
      fontSize: 16,
      backgroundColor: isDarkMode ? '#2d2d2d' : '#FFFFFF',
      color: isDarkMode ? '#FFFFFF' : '#333333',
      fontFamily: "Poppins-Regular",
    },
    button: {
      backgroundColor: '#6A5ACD',
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: 'center',
      opacity: loading ? 0.7 : 1,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: "Poppins-Regular",
    },
    interpretationContainer: {
      marginTop: 20,
      padding: 15,
      backgroundColor: isDarkMode ? '#2d2d2d' : '#FFFFFF',
      borderRadius: 10,
    },
    interpretationTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: "Poppins-Regular",
      color: '#6A5ACD',
    },
    interpretationText: {
      fontSize: 16,
      fontFamily: "Poppins-Regular",
      color: isDarkMode ? '#FFFFFF' : '#333333',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#FFFFFF',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#333333',
      marginBottom: 15,
    },
    dateButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f0f0f0',
      padding: 10,
      borderRadius: 8,
      marginBottom: 20,
    },
    dateText: {
      color: isDarkMode ? '#FFFFFF' : '#333333',
      marginLeft: 10,
      fontSize: 16,
    },
    modalButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    modalButton: {
      flex: 1,
      padding: 12,
      borderRadius: 8,
      marginHorizontal: 5,
    },
    saveButton: {
      backgroundColor: '#6A5ACD',
    },
    cancelButton: {
      backgroundColor: isDarkMode ? '#404040' : '#e0e0e0',
    },
    modalButtonText: {
      color: '#FFFFFF',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
    cancelButtonText: {
      color: isDarkMode ? '#FFFFFF' : '#333333',
    },
    saveInterpretationButton: {
      backgroundColor: '#6A5ACD',
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
    },
    savedButton: {
      backgroundColor: '#808080',
      opacity: 0.7,
    },
  });

  const analyzeDream = async () => {
    if (!dreamText.trim()) {
      Alert.alert('Error', 'Please enter your dream first');
      return;
    }

    setLoading(true);
    setIsSaved(false);

    // try {
    //   const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
    //   const response = await openai.chat.completions.create({
    //     model: "gpt-4",
    //     messages: [{ role: "system", content: "Analyze the following dream and provide an interpretation." }, { role: "user", content: dreamText }],
    //   });
      
    //   setInterpretation(response.choices[0]?.message?.content || "No interpretation available.");
    // } catch (error) {
    //   console.error("Error analyzing dream:", error);
    //   setInterpretation("Failed to interpret the dream. Try again later.");
    // }

    setInterpretation("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");

    setLoading(false);
  };

  const handleSaveDream = async () => {
    if (isSaved) {
      Alert.alert(
        'Already Saved',
        'This dream interpretation has already been saved.'
      );
      return;
    }

    const dreamId = Date.now().toString();
    
    const dreamData: Dream = {
      id: dreamId,
      date: selectedDate,
      description: dreamText,
      interpretation: interpretation,
    };

    try {
      await addDream(dreamData);
      setIsSaved(true);
      Alert.alert(
        'Success',
        'Dream saved successfully!',
        [{ text: 'OK', onPress: () => setShowSaveModal(false) }]
      );
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'Failed to save dream. Please try again.');
      }
    }
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleShowSaveModal = () => {
    if (isSaved) {
      Alert.alert(
        'Already Saved',
        'This dream interpretation has already been saved.'
      );
      return;
    }
    setShowSaveModal(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="Describe your dream..."
        placeholderTextColor={isDarkMode ? '#808080' : '#666666'}
        value={dreamText}
        onChangeText={setDreamText}
        multiline
        style={styles.input}
      />
      
      <TouchableOpacity
        onPress={analyzeDream}
        disabled={loading}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {loading ? "Analyzing..." : "Interpret Dream"}
        </Text>
      </TouchableOpacity>
      
      {loading && (
        <LottieView
          source={require('../assets/animation.json')}
          autoPlay
          loop
          style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 20 }}
        />
      )}
      
      {interpretation && (
        <View style={styles.interpretationContainer}>
          <Text style={styles.interpretationTitle}>Interpretation:</Text>
          <Text style={styles.interpretationText}>{interpretation}</Text>
          
          <TouchableOpacity 
            style={[
              styles.saveInterpretationButton,
              isSaved && styles.savedButton
            ]}
            onPress={handleShowSaveModal}
          >
            <Text style={styles.buttonText}>
              {isSaved ? 'Saved' : 'Save Interpretation'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        visible={showSaveModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSaveModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Save Dream Interpretation</Text>
            
            <TouchableOpacity 
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons 
                name="calendar" 
                size={24} 
                color={isDarkMode ? '#FFFFFF' : '#333333'} 
              />
              <Text style={styles.dateText}>
                {selectedDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )}

            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowSaveModal(false)}
              >
                <Text style={[styles.modalButtonText, styles.cancelButtonText]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveDream}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default DreamInterpreter;

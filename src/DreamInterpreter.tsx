import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet } from "react-native";
import { OpenAI } from "openai";
import { useFonts } from 'expo-font';
import { ActivityIndicator } from "react-native";
import LottieView from 'lottie-react-native';
import { OPENAI_API_KEY } from '@env';

const DreamInterpreter = () => {
  const [dreamText, setDreamText] = useState("");
  const [interpretation, setInterpretation] = useState("");
  const [loading, setLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#6A5ACD" />;
  }

  const analyzeDream = async () => {
    if (!dreamText.trim()) return;
    setLoading(true);

    try {
      const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "system", content: "Analyze the following dream and provide an interpretation." }, { role: "user", content: dreamText }],
      });
      
      setInterpretation(response.choices[0]?.message?.content || "No interpretation available.");
    } catch (error) {
      console.error("Error analyzing dream:", error);
      setInterpretation("Failed to interpret the dream. Try again later.");
    }

    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, backgroundColor: "#F8F8F8" }}>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Image source={require("../assets/logo.png")} style={{ width: 80, height: 80, marginBottom: 10 }} />
        <Text style={{ fontSize: 26, fontWeight: "bold", fontFamily: "Poppins-Regular", color: "#6A5ACD" }}>
          AI Dream Interpreter
        </Text>
      </View>
      
      <TextInput
        placeholder="Describe your dream..."
        value={dreamText}
        onChangeText={setDreamText}
        multiline
        style={{ borderWidth: 1, padding: 12, marginBottom: 10, borderRadius: 8, fontSize: 16, backgroundColor: "#FFFFFF", fontFamily: "Poppins-Regular" }}
      />
      
      <TouchableOpacity
        onPress={analyzeDream}
        disabled={loading}
        style={{
          backgroundColor: "#6A5ACD",
          paddingVertical: 12,
          borderRadius: 10,
          alignItems: "center",
          opacity: loading ? 0.7 : 1,
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", fontFamily: "Poppins-Regular" }}>
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
        <View style={{ marginTop: 20, padding: 15, backgroundColor: "#FFFFFF", borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", fontFamily: "Poppins-Regular", color: "#6A5ACD" }}>Interpretation:</Text>
          <Text style={{ fontSize: 16, fontFamily: "Poppins-Regular", color: "#333" }}>{interpretation}</Text>
          {/* <Text style={{ fontSize: 16, fontFamily: "Poppins-Regular", color: "#333" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim minus excepturi laudantium consequuntur quasi, ab itaque praesentium expedita reprehenderit harum commodi beatae eos laboriosam, dolore sed aliquam, voluptates perspiciatis atque?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim minus excepturi laudantium consequuntur quasi, ab itaque praesentium expedita reprehenderit harum commodi beatae eos laboriosam, dolore sed aliquam, voluptates perspiciatis atque?  
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim minus excepturi laudantium consequuntur quasi, ab itaque praesentium expedita reprehenderit harum commodi beatae eos laboriosam, dolore sed aliquam, voluptates perspiciatis atque?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim minus excepturi laudantium consequuntur quasi, ab itaque praesentium expedita reprehenderit harum commodi beatae eos laboriosam, dolore sed aliquam, voluptates perspiciatis atque?
          </Text> */}
        </View>

      )}
    </ScrollView>
  );
};

export default DreamInterpreter;
